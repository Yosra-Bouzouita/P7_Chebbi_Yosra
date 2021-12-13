const { Post } = require("../sequelize");

const fs = require("fs");

/*exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};*/

exports.getAllPosts = (req, res, next) => {
  try {
    let posts = Post.findAll();
    console.log("All posts:", JSON.stringify(posts, null, 2));
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur est survenu lors de la récupération des posts ",
    });
  }
};


exports.createPost = (req, res, next) => {
  //console.log(" filename is :"+req.file.filename)
Post.create(req.body/*, {imageUrl:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`}*/)
      .then(() => res.status(201).json({ message: "Post créé !" }))
      .catch((error) => res.status(400).json({ error }));
  };


/*exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

findOne({where: {id: id}})
 .then((client) => done(null, client))
 .catch((err) => done(new Error('Internal Server Error')))*/

exports.getOnePost = (req, res, next) => {
let id = req.params.id
let post = Post.findOne({ where: {id: id} })
res.status(200).send(post)

    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

/*exports.modifyPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Post.updateOne(
    { _id: req.params.id },
    { ...postObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};*/

exports.modifyPost = (req, res, next) => {
  let id = req.params.id
  let post = Post.update(req.body,{ where: {id: id} })
res.status(200).send(post)

    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

/*exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};*/
exports.deletePost = (req, res, next) => {
  let id = req.params.id
  let post = Post.destroy({ where: {id: id} })
res.status(200).send(post)

    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.likePost = (req, res, next) => {
  if (req.body.like == 1) {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        Post.updateOne(
          { _id: req.params.id },
          {
            likes: post.likes + 1,
            $push: { usersLiked: req.body.userId },
          }
        )

          .then(() => res.status(200).json({ message: "Post liked!" }))
          .catch((error) => res.status(400).json({ error }));
      })

      .catch((error) => {
        res.status(500).json({ error });
      });
  } else if (req.body.like == -1) {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        Post.updateOne(
          { _id: req.params.id },
          {
            dislikes: post.dislikes + 1,
            $push: { usersDisliked: req.body.userId },
          }
        )

          .then(() => res.status(200).json({ message: "Post disliked!" }))
          .catch((error) => res.status(400).json({ error }));
      })

      .catch((error) => {
        res.status(500).json({ error });
      });
  } else if (req.body.like == 0) {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        if (post.usersLiked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            {
              likes: post.likes - 1,
              $pull: { usersLiked: req.body.userId },
            }
          )

            .then(() => res.status(200).json({ message: "Post neutre!" }))
            .catch((error) => res.status(400).json({ error }));
        } else if (post.usersDisliked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            {
              dislikes: post.dislikes - 1,
              $pull: { usersDisliked: req.body.userId },
            }
          )

            .then(() => res.status(200).json({ message: "Post neutre!" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })

      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};
