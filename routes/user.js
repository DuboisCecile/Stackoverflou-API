const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const userCtrl = require("../controllers/user");

router.get("/", userCtrl.getAllUsers);
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// routes with authentication
router.get("/currentUser", auth, userCtrl.getCurrentUser);
router.delete("/currentUser", auth, userCtrl.deleteUser);
router.get("/logout", auth, userCtrl.logout);
router.put("/", auth, userCtrl.modifyUser);

module.exports = router;
