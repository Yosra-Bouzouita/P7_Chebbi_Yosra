const { Post } = require("../sequelize");

exports.getAllPosts = async (req, res, next) => {
  let posts = await Post.findAll();
  res.status(200).send(posts);
};

exports.createPost = async (req, res, next) => {
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

  Post.update(req.body, { where: { id: req.params.id }})
  .then(function() {
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

const { Like } = require("../sequelize");

exports.likePost = async (req, res, next) => {
  if (req.body.like == 1) {
    let like = {
      userId: req.body.userId,
      postId: req.body.postId,
    };
    Like.create(like);
    let post = await Post.findOne({ where: { id: req.body.postId } });
    console.log("Found post "+JSON.stringify(post))
    if (post === null) {
      res
        .status(404)
        .json({ message: `post with id ${req.body.postId} not found` });
    } else {
      post.likes = post.likes +1;
      console.log("Found post1 "+JSON.stringify(post))
      Post.update(post, { where: { id: req.body.postId } });
      res.status(200).json(post);
    }
  } else if (req.body.like == 0) {
    Like.destroy({ userId: req.body.userId, postId: req.body.postId });
    res.status(200).json({ message: "test" });
  }
};
