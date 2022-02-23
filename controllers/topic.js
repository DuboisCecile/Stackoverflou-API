const fs = require("fs");
const Topic = require("../models/topic");

exports.createTopic = (req, res, next) => {
  const topicObject = JSON.parse(req.body.topic);
  delete topicObject._id;
  const topic = new Topic({
    ...topicObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  topic
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneTopic = (req, res, next) => {
  Topic.findOne({
    _id: req.params.id,
  })
    .then((topic) => {
      res.status(200).json(topic);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyTopic = (req, res, next) => {
  const topicObject = req.file
    ? {
        ...JSON.parse(req.body.topic),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Topic.updateOne(
    { _id: req.params.id },
    { ...topicObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteTopic = (req, res, next) => {
  Topic.findOne({ _id: req.params.id })
    .then((topic) => {
      const filename = topic.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Topic.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllTopics = (req, res, next) => {
  Topic.find()
    .then((topics) => {
      res.status(200).json(topics);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
