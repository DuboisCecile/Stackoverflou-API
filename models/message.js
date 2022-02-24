const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user_id: { type: String, required: true },
  topic_id: { type: String, required: true },
  creationDate: { type: Date, required: true },
});

// id, content, user_id, topic_id, creationDate
module.exports = mongoose.model("Message", messageSchema);
