const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.get("/token", authController.getToken);
router.get("/callback", authController.callback);

module.exports = router;
