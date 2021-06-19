const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

router.post("/Add", UserController.addUser);

module.exports = router;