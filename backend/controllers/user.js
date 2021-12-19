const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../sequelize");
const { Post } = require("../sequelize");
const { Like } = require("../sequelize");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    req.body.password = hash;
    User.create(req.body)
      .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
      .catch((error) => res.status(400).json({ error }));
  });
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user)
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      bcrypt
      .compare(req.body.password, user.password).then((valid) => {
        if (valid)
          res.status(200).json({
            token: jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        else return res.status(401).json({ error: "Mot de passe incorrect !" });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.getAllUsers = async (req, res, next) => {
  let users = await User.findAll();
  res.status(200).send(users);
};
exports.getOneUser = async (req, res, next) => {
  let id = req.params.id;
  let user = await User.findOne({ where: { id: id } });
  if (user === null) {
    res.status(404).json({ message: "record not found" });
  } else {
    res.status(200).send(user);
  }
};

exports.modifyUser = (req, res, next) => {

  User.update(req.body, { where: { id: req.params.id }})
  .then(function() {
      res.status(200).json({ message: "Updated successfully" });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });

};

 exports.deleteUser = async (req, res, next) => {
  // Delete All likes of this user
   await Like.destroy({ where: { userId:req.params.id  } });
   // Delete All posts of this user
   await Post.destroy({ where: { userId:req.params.id  } });

  User.destroy({
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
