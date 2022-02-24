const mongoose = require("mongoose");

const topicSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user_id: { type: String, required: true },
});

// id, title, description, user_id, creationDate
module.exports = mongoose.model("Topic", topicSchema);
