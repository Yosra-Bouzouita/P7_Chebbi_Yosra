const { Post } = require("../models/sequelize");
const { Like } = require("../models/sequelize");
const { User } = require("../models/sequelize");
const { Comment } = require("../models/sequelize");
const jwt = require("jsonwebtoken");
const fs = require("fs");
//CRUD post

function getUserIdFromToken(req) {
  const token = req.headers.authorization.split(" ")[1]; // on récupère le token de la requête entrante
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // on le vérifie
  return decodedToken.userId; // on récupère l'userId du token
}

//Récuperer toutes les publications de la bases des données dans l'ordre décroissant de création
exports.getAllPosts = async (req, res, next) => {
  let posts = await Post.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      { model: User, attributes: ["firstname", "lastname"] }, // l'utilisateur qui a crée la publication
      { model: Like, attributes: ["userId"] }, // l'utilisateur qui a aimé la publication
      {
        model: Comment,
        include: [{ model: User, attributes: ["id", "firstname", "lastname"] }],
      }, //l'utilisateur qui a commenté la publication
    ],
  });

  res.status(200).send(posts);
};

//Ajouter une publication dans la base de donnée
exports.createPost = async (req, res, next) => {
  req.body.userId = getUserIdFromToken(req);
  //Construire l'URL complète du l'image enregistré.
  if (req.file) {
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  const post = await Post.create(req.body);
  res.status(200).send(post);
};

//Modifier une publication dans la bases des données
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

//Supprimer une publication de la bases des données
exports.deletePost = async (req, res, next) => {

    Post.findOne({ id: req.params.id })
    .then((post) => {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({where:{ id: req.params.id }})
          .then(() => res.status(200).json({ message: "Post deleted successfully" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//Aimer/Ne pas Aimer : une publication dans la bases des données
exports.likePost = async (req, res, next) => {
  const userId = getUserIdFromToken(req);

  const postId = req.body.postId;

  let like = await Like.findOne({
    where: { userId: userId, postId: postId },
  });

  if (req.body.like == 1) {
    //like
    if (like === null) {
      await Like.create({ userId: userId, postId: postId });

      let likes = await Like.findAll({
        where: { postId: postId },
        attributes: ["userId"],
      });

      res.status(200).json(likes);
    } else {
      res.status(403).json({ message: "Post already liked by the same user!" });
    }
  } else if (req.body.like == 0) {
    //dislike
    if (like !== null) {
      await like.destroy();

      let likes = await Like.findAll({
        where: { postId: req.body.postId },
        attributes: ["userId"],
      });
      res.status(200).json(likes);
    } else {
      res
        .status(403)
        .json({ message: "Post already disliked by the same user!" });
    }
  }
};

//Ajouter un commentaire dans labase de données
exports.commentPost = async (req, res, next) => {
  req.body.userId = getUserIdFromToken(req);

  Comment.create(req.body);

  res.status(200).json({ message: "Post added successfully" });
};

//Recupérer tous les commentaires existant pour une publication donnée
exports.getAllCommentsForPost = async (req, res, next) => {
  let comment = await Comment.findAll(req.body);

  res.status(200).json(comment);
};

//L'utilisateur qui a publié des commentaires peut les supprimer de la bases des données
exports.deleteComment = async (req, res, next) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function (deletedRecord) {
      if (deletedRecord === 1) {
        res.status(200).json({ message: "Comment deleted successfully" });
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
};
