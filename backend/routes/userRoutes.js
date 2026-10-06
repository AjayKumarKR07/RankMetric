const express = require("express");
const router = express.Router();
const { updatePassword } = require("../controllers/userController");

router.put("/password", updatePassword);

module.exports = router;