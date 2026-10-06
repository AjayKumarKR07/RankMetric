const express = require("express");

const router = express.Router();

const {
  saveAnalysis,
  getHistory,
  getDashboard,
} = require("../controllers/analysisController");

const auth = require("../middleware/auth");

router.post("/", auth, saveAnalysis);

router.get("/history", auth, getHistory);

router.get("/dashboard", auth, getDashboard);

module.exports = router;