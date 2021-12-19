const { Post } = require("../models/sequelize");
const { Like } = require("../models/sequelize");
const { User } = require("../models/sequelize");
const { Comment } = require("../models/sequelize");
const jwt = require("jsonwebtoken");

function getUserIdFromToken(req) {
  const token = req.headers.authorization.split(" ")[1]; // on récupère le token de la requête entrante
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // on le vérifie
  return decodedToken.userId; // on récupère l'id du token
}

exports.getAllPosts = async (req, res, next) => {
 let posts = await Post.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: User,    attributes: ["firstname", "lastname"] },  // User who created the post
              { model: Comment, attributes: ["message"], include: [{ model: User, attributes: ["id","firstname", "lastname"] }] }] //users who commented the post
  });

  res.status(200).send(posts);
};

exports.createPost = async (req, res, next) => {
  req.body.userId = getUserIdFromToken(req);

  if (req.file) {
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  const post = await Post.create(req.body);
  res.status(200).send(post);
};

exports.getOnePost = async (req, res, next) => {
  let id = req.params.id;
  let post = await Post.findOne({ where: { id: id } });
  if (post === null) {
    res.status(404).json({ message: "record not found" });
  } else {
    res.status(200).send(post);
  }
};

exports.modifyPost = (req, res, next) => {
  if (req.file) {
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  Post.update(req.body, { where: { id: req.params.id } })
    .then(function () {
      res.status(200).json({ message: "Updated successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deletePost = (req, res, next) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function (deletedRecord) {
      if (deletedRecord === 1) {
        res.status(200).json({ message: "Deleted successfully" });
      } else {
        res.status(404).json({ message: "record not found" });
      }
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
};

exports.likePost = async (req, res, next) => {
  const userId = getUserIdFromToken(req);

  let post = await Post.findOne({ where: { id: req.body.postId } });

  if (post === null) {
    res
      .status(404)
      .json({ message: `post with id ${req.body.postId} not found` });
  }

  let like = await Like.findOne({
    where: { userId: userId, postId: req.body.postId },
  });

  if (req.body.like == 1) {
    //like
    if (like === null) {
      Like.create({ userId: userId, postId: req.body.postId });
      post.nb_like = post.nb_like + 1;
      post.save();
      res.status(200).json(post);
    } else {
      res.status(403).json({ message: "post already liked by the same user!" });
    }
  } else if (req.body.like == 0) {
    //dislike
    if (like !== null) {
      like.destroy();
      post.nb_like = post.nb_like - 1;
      post.save();
      res.status(200).json(post);
    } else {
      res
        .status(403)
        .json({ message: "post already disliked by the same user!" });
    }
  }
};

exports.commentPost = async (req, res, next) => {
  req.body.userId = getUserIdFromToken(req);

  Comment.create(req.body);

  res.status(200).json({ message: "Added successfully" });
};

exports.getAllCommentsForPost = async (req, res, next) => {

  console.log("TEST : "+ JSON.stringify(req.body));
  let comment = await Comment.findAll(req.body);

  res.status(200).json(comment);
};
