const express = require("express");
const router = express.Router();
const exampleController = require("../controller/exampleController");
const { checkJwt } = require("../config/auth0");

router.get("/public", exampleController.publicRoute);
router.get("/private", checkJwt, exampleController.privateRoute);

module.exports = router;
