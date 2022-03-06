const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { JWT_TOKEN_SECRET } = require("../env");

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        nickname: req.body.nickname,
        email: req.body.email,
        password: hash,
        creationDate: new Date(),
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  const errorMsg = "Utilisateur non trouvé ou mot de passe incorrect !";
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ errorMsg });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ errorMsg });
          }
          const currentToken = jwt.sign(
            { user_id: user._id },
            JWT_TOKEN_SECRET,
            {
              expiresIn: "1h",
            }
          );
          res.cookie("token", currentToken, { httpOnly: true });
          res.status(200).json({
            user_id: user._id,
            token: currentToken,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

const getSafeAttributes = (user) => {
  if (user) {
    return {
      ...user.toObject(),
      password: undefined,
    };
  }
  return {};
};

exports.getCurrentUser = async (req, res, next) => {
  User.findOne({ _id: req.currentUser })
    .then((user) => {
      const safeUser = getSafeAttributes(user);
      return res.status(201).send(safeUser);
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.modifyUser = async (req, res, next) => {
  let password;
  if (req.body.password) {
    password = await bcrypt.hash(req.body.password, 10);
  }
  const updatedUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    nickname: req.body.nickname,
    email: req.body.email,
    password,
  };

  User.updateOne({ _id: req.currentUser }, updatedUser)
    .then(() => res.status(200).json({ message: "Utilisateur modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.currentUser })
    .then(() =>
      res
        .status(200)
        .json({ _id: req.currentUser, message: "Utilisateur supprimé !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.logout = (req, res, next) => {
  req.currentUser = null;
  res.status(200).json({ message: "Utilisateur déconnecté !" });
};
