const Topic = require("../models/topic");

exports.getAllTopics = (req, res, next) => {
  Topic.find()
    .then((topics) => {
      res.status(200).json(topics);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getAllTopicsFromCurrentUser = (req, res, next) => {
  Topic.find({ user_id: req.currentUser })
    .then((topics) => {
      res.status(200).json(topics);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneTopic = (req, res, next) => {
  Topic.findOne({
    _id: req.params.id,
  })
    .then((topic) => {
      res.status(200).json(topic);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.createTopic = (req, res, next) => {
  const topic = new Topic({
    title: req.body.title,
    description: req.body.description,
    creationDate: req.body.creationDate,
    user_id: req.currentUser,
  });
  topic
    .save()
    .then(() => res.status(201).json({ message: "Topic enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyTopic = (req, res, next) => {
  Topic.updateOne(
    { _id: req.params.id, user_id: req.currentUser },
    { ...req.body }
  )
    .then(() => res.status(200).json({ message: "Topic modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteTopic = (req, res, next) => {
  Topic.deleteOne({ _id: req.params.id, user_id: req.currentUser })
    .then(() => res.status(200).json({ message: "Topic supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
