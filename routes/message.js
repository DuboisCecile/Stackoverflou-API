const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const messageCtrl = require("../controllers/message");

router.get("/", auth, messageCtrl.getAllMessages);
router.get("/currentUser", auth, messageCtrl.getAllMessagesFromCurrentUser);
router.post("/", auth, messageCtrl.createMessage);
router.get("/:id", auth, messageCtrl.getOneMessage);
router.put("/:id", auth, messageCtrl.modifyMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);

module.exports = router;
