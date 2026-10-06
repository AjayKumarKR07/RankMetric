const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    categories: {
      seo: Number,
      performance: Number,
      accessibility: Number,
      bestPractices: Number,
    },

    metrics: {
      fcp: String,
      lcp: String,
      cls: String,
      tbt: String,
      speedIndex: String,
    },

    metaData: {
      title: String,
      description: String,
      canonical: String,
      ogTitle: String,
      ogDescription: String,
      twitterCard: String,
    },

    wordCount: Number,
    readingTime: Number,
    pageSize: String,
    loadTime: String,

    links: {
      total: Number,
    },

    images: {
      total: Number,
      missingAlt: Number,
    },

    issues: [
      {
        message: String,
        severity: String,
        category: String,
        recommendation: String,
      },
    ],

    keywords: [
      {
        word: String,
        count: Number,
      },
    ],

    aiAdvice: String,

    pdf: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Analysis", analysisSchema);