const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../sequelize");

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
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
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

