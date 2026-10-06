const Analysis = require("../models/Analysis");

exports.saveAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.create(req.body);

    res.status(201).json({
      success: true,
      analysis,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(analyses);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const analyses = await Analysis.find({
      user: req.user.id,
    });

    const totalScans = analyses.length;

    const avgScore =
      totalScans === 0
        ? 0
        : Math.round(
            analyses.reduce(
              (sum, item) => sum + item.overallScore,
              0
            ) / totalScans
          );

    res.json({
      totalScans,
      avgScore,
      analyses,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};