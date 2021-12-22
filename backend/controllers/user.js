const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/sequelize");
const { Post } = require("../models/sequelize");
const { Like } = require("../models/sequelize");
//CRUD user
//Ajouter un formulaire de signup à la base de donnée
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    req.body.password = hash;
    User.create(req.body)
      .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
      .catch((error) => res.status(400).json({ error }));
  });
};
//Ajouter un formulaire de login dans la base de donnée
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user)
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (valid)
          res.status(200).json({
            token: jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              "RANDOM_TOKEN_SECRET",
              {
                expiresIn: "24h",
              }
            ),
          });
        else return res.status(401).json({ error: "Mot de passe incorrect !" });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
//Récuperer tous les utilisateurs de la base des données.
exports.getAllUsers = async (req, res, next) => {
  let users = await User.findAll();
  res.status(200).send(users);
};
//Récuperer l'utilisateur correspond au id passé en paramètre de la base des données.
exports.getOneUser = async (req, res, next) => {
  let id = req.params.id;
  let user = await User.findOne({ where: { id: id } });
  if (user === null) {
    res.status(404).json({ message: "record not found" });
  } else {
    res.status(200).send(user);
  }
};
//Modifier le mot de passe dans la base des données
exports.editPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    req.body.password = hash;
    User.update(req.body, { where: { id: req.params.id } })
      .then(function () {
        res.status(200).json({ message: "Password updated successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });
};
//Modifier les données de l'utilisateur dans la base des données
exports.modifyUser = (req, res, next) => {
  User.update(req.body, { where: { id: req.params.id } })
    .then(function () {
      res.status(200).json({ message: "User Updated successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
//supprimer l'utilisateur de la base des données
exports.deleteUser = async (req, res, next) => {
  // supprimer tous les likes de cet utilisateur
  await Like.destroy({ where: { userId: req.params.id } });
  // supprimer tous les publications de cet utilisateur
  await Post.destroy({ where: { userId: req.params.id } });

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
