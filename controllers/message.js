const Message = require("../models/message");

exports.getAllMessages = (req, res, next) => {
  Message.find()
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getAllMessagesFromCurrentUser = (req, res, next) => {
  Message.find({ user_id: req.currentUser })
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneMessage = (req, res, next) => {
  Message.findOne({
    _id: req.params.id,
  })
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.createMessage = (req, res, next) => {
  const message = new Message({
    title: req.body.title,
    content: req.body.content,
    user_id: req.currentUser,
    topic_id: req.body.topic_id,
    creationDate: new Date(),
  });
  message
    .save()
    .then(() => res.status(201).json({ message: "Message enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyMessage = (req, res, next) => {
  Message.updateOne(
    { _id: req.params.id, user_id: req.currentUser },
    { ...req.body }
  )
    .then(() => res.status(200).json({ message: "Message modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {
  Message.deleteOne({ _id: req.params.id, user_id: req.currentUser })
    .then(() => res.status(200).json({ message: "Message supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
