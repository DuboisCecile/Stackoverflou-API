const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const userCtrl = require("../controllers/user");

router.get("/", userCtrl.getAllUsers);
router.get("/logout", auth, userCtrl.logout);
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/", auth, userCtrl.modifyUser);
router.delete("/currentUser", auth, userCtrl.deleteUser);

module.exports = router;
