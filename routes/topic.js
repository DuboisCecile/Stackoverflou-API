const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const topicCtrl = require("../controllers/topic");

router.get("/", auth, topicCtrl.getAllTopics);
router.get("/currentUser", auth, topicCtrl.getAllTopicsFromCurrentUser);
router.post("/", auth, topicCtrl.createTopic);
router.get("/:id", auth, topicCtrl.getOneTopic);
router.put("/:id", auth, topicCtrl.modifyTopic);
router.delete("/:id", auth, topicCtrl.deleteTopic);

module.exports = router;
