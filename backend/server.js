const crypto = require("crypto");
const Razorpay = require("razorpay");
const {
  getSEOAdvice,
  askGroq,
} = require("./ai/seoAdvisor");
const cron = require("node-cron");
const checkAllKeywords = require("./scheduler/rankChecker");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const runLighthouse = require("./lighthouse/lighthouseAudit");
const express = require("express");
const path = require("path");
const fs = require("fs");
const generateReport = require("./pdf/generateReport");

require("dotenv").config({
  path: __dirname + "/.env",
});

const app = express();

// ===========================
// Email OTP Configuration
// ===========================

const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log("EMAIL_USER loaded:", !!process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", !!process.env.EMAIL_PASS);

// ===========================
// Razorpay Configuration
// ===========================

console.log(
  "RAZORPAY_KEY_ID loaded:",
  !!process.env.RAZORPAY_KEY_ID
);

console.log(
  "RAZORPAY_KEY_SECRET loaded:",
  !!process.env.RAZORPAY_KEY_SECRET
);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===========================
// JWT Authentication Middleware
// ===========================

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
  });

  // ===========================
// Razorpay - Create Order
// ===========================

app.post("/api/payment/create-order", async (req, res) => {
  try {
    const options = {
      amount: 100 * 100, // ₹100 = 10,000 paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("Creating Razorpay order...");

    const order = await razorpay.orders.create(options);

    console.log("✅ Razorpay order created:", order.id);

    return res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error("========== RAZORPAY ERROR ==========");
    console.error("Status:", error?.statusCode);
    console.error("Message:", error?.message);
    console.error("Error:", error?.error);
    console.error(
      "Full Error:",
      JSON.stringify(error, null, 2)
    );
    console.error("====================================");

    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
});


// ===========================
// Razorpay - Verify Payment
// ===========================

app.post("/api/payment/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email, // ✅ Get user's email
    } = req.body;

    // Validate required fields
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification details",
      });
    }

    // Create expected signature
    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

    // Verify Razorpay signature
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }


    // ===========================
    // ✅ Activate Pro in MongoDB
    // ===========================

    // Pro activation date
const proActivatedAt = new Date();

// Find the current user
const existingUser = await User.findOne({ email });

if (!existingUser) {
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
}

// Decide where the new 30 days should start
let expiryBaseDate;

// If user already has an active Pro plan,
// extend from their existing expiry date
if (
  existingUser.plan === "pro" &&
  existingUser.proExpiresAt &&
  new Date(existingUser.proExpiresAt) > new Date()
) {
  expiryBaseDate = new Date(existingUser.proExpiresAt);
} else {
  // New Pro or expired Pro
  expiryBaseDate = new Date();
}

// Add 30 days
const proExpiresAt = new Date(expiryBaseDate);

proExpiresAt.setDate(
  proExpiresAt.getDate() + 30
);

const updatedUser = await User.findOneAndUpdate(
  { email },
  {
    plan: "pro",
    razorpayPaymentId: razorpay_payment_id,
    proActivatedAt: proActivatedAt,
    proExpiresAt: proExpiresAt,
  },
  {
    new: true,
  }
);

    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    console.log(
      "✅ Razorpay Payment Verified:",
      razorpay_payment_id
    );

    console.log(
      "⭐ User upgraded to Pro:",
      email
    );


    // Send updated user to frontend
    return res.status(200).json({
      success: true,
      message: "Payment verified and Pro activated successfully",
      paymentId: razorpay_payment_id,

      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        plan: updatedUser.plan,
        scanCount: updatedUser.scanCount,
        proActivatedAt: updatedUser.proActivatedAt,
        proExpiresAt: updatedUser.proExpiresAt,
      },
    });

  } catch (error) {
    console.error(
      "Razorpay verification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});
// User Schema
const userSchema = new mongoose.Schema(
{
  name: String,

  email: {
    type: String,
    unique: true,
  },

  scanCount: {
    type: Number,
    default: 0,
  },

  plan: {
  type: String,
  enum: ["free", "pro"],
  default: "free",
},

razorpayPaymentId: {
  type: String,
  default: null,
},

proActivatedAt: {
  type: Date,
  default: null,
},
proExpiresAt: {
  type: Date,
  default: null,
},

},
{ timestamps: true }
);

const User = mongoose.model(
  "User",
  userSchema
);
const keywordSchema = new mongoose.Schema(
{
  keyword: String,
  url: String,
  domain: String,

  currentPosition: Number,
  currentPage: Number,

  bestPosition: Number,
  positionChange: Number,

  active: {
    type: Boolean,
    default: true,
  },

  status: {
    type: String,
    default: "completed",
  },

  lastChecked: {
    type: Date,
    default: Date.now,
  },

  competitors: {
    type: Array,
    default: [],
  },
},
{ timestamps: true }
);

const Keyword = mongoose.model(
  "Keyword",
  keywordSchema
);

// Rank History Schema
const rankHistorySchema =
  new mongoose.Schema({
    keyword: String,
    domain: String,
    position: Number,
    checkedAt: {
      type: Date,
      default: Date.now,
    },
  });
  const RankHistory = mongoose.model(
  "RankHistory",
  rankHistorySchema
);

// Analysis Schema
const analysisSchema = new mongoose.Schema(
  {
    url: String,

    overallScore: Number,
    readingTime: Number,

    aiAdvice: String,

    metaData: Object,

    categories: {
      seo: Number,
      performance: Number,
      accessibility: Number,
      bestPractices: Number,
    },
    opportunities: [
  {
    id: String,
    title: String,
    description: String,
    score: Number,
    displayValue: String,
  },
],

diagnostics: [
  {
    id: String,
    title: String,
    description: String,
    score: Number,
    displayValue: String,
  },
],

    metrics: {
      fcp: String,
      lcp: String,
      cls: String,
      tbt: String,
      speedIndex: String,
    },
headings: {
  h1: Number,
  h2: Number,
  h3: Number,
  h4: Number,
  h5: Number,
  h6: Number,
  h1Texts: [String],
},

links: {
  internal: Number,
  external: Number,
  total: Number,
},

images: {
  total: Number,
  withAlt: Number,
  missingAlt: Number,
},

keywords: [
  {
    word: String,
    count: Number,
    density: Number,
  },
],

issues: [
  {
    severity: String,
    category: String,
    message: String,
    recommendation: String,
  },
],

wordCount: Number,

pageSize: String,

loadTime: String,
    status: {
      type: String,
      default: "completed",
    },
  },
  { timestamps: true }
);

const Analysis = mongoose.model(
  "Analysis",
  analysisSchema
);

// ===========================
// Send Login OTP
// ===========================

app.post("/api/auth/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // OTP expires in 5 minutes
    const expiresAt =
      Date.now() + 5 * 60 * 1000;

    // Store OTP temporarily
    otpStore.set(email.toLowerCase(), {
      otp,
      expiresAt,
    });

    // Send OTP email
    await transporter.sendMail({
      from: `"RankFlow" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your RankFlow Login OTP",
      text: `Your RankFlow login OTP is ${otp}. It expires in 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>RankFlow Login</h2>

          <p>Your verification code is:</p>

          <h1 style="letter-spacing: 6px;">
            ${otp}
          </h1>

          <p>
            This OTP will expire in 5 minutes.
          </p>

          <p>
            If you did not request this code,
            you can ignore this email.
          </p>
        </div>
      `,
    });

    console.log(
      "📧 Login OTP sent to:",
      email
    );

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error(
      "SEND OTP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
});

// ===========================
// Verify Login OTP
// ===========================

app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    // Get stored OTP
    const storedOtp =
      otpStore.get(normalizedEmail);

    if (!storedOtp) {
      return res.status(400).json({
        success: false,
        message:
          "OTP not found. Please request a new OTP.",
      });
    }

    // Check OTP expiry
    if (Date.now() > storedOtp.expiresAt) {
      otpStore.delete(normalizedEmail);

      return res.status(400).json({
        success: false,
        message:
          "OTP has expired. Please request a new OTP.",
      });
    }

    // Verify OTP
    if (storedOtp.otp !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP successfully used
    otpStore.delete(normalizedEmail);

    // ===========================
    // Find Existing User
    // ===========================

    let user = await User.findOne({
      email: normalizedEmail,
    });

    // ===========================
    // Create New User Automatically
    // ===========================

    if (!user) {
      user = await User.create({
        email: normalizedEmail,
        name: normalizedEmail.split("@")[0],
        plan: "free",
        scanCount: 0,
      });

      console.log(
        "👤 New OTP user created:",
        normalizedEmail
      );
    }

    // ===========================
    // Check Pro Expiry
    // ===========================

    if (
      user.plan === "pro" &&
      user.proExpiresAt &&
      new Date() > new Date(user.proExpiresAt)
    ) {
      user.plan = "free";
      user.proActivatedAt = null;
      user.proExpiresAt = null;

      await user.save();
    }

    // ===========================
    // Generate JWT
    // ===========================

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log(
      "✅ OTP Login Successful:",
      normalizedEmail
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        scanCount: user.scanCount,
        proActivatedAt: user.proActivatedAt,
        proExpiresAt: user.proExpiresAt,
      },
    });

  } catch (error) {
    console.error(
      "VERIFY OTP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
});

// ================================
// Ai Chat Endpoint
// ================================
app.post("/api/ai/chat", async (req, res) => {

  try {

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question required",
      });
    }

    const answer = await askGroq(`
You are RankFlow AI.

You are an SEO expert.

Keep answers practical, short and beginner friendly.

Question:

${question}
`);

    res.json({
      success: true,
      answer,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

});


// SEO Analyze
app.post(
  "/api/analyze",
  authenticateUser,
  async (req, res) => {
  try {

    if (!req.body || !req.body.url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    let { url } = req.body;

// User securely identified from JWT
const user = req.user;

console.log(
  "SEO Analysis requested by:",
  user.email
);
// ===========================
// Check Pro Expiry Before Analysis
// ===========================

if (
  user.plan === "pro" &&
  user.proExpiresAt &&
  new Date() > new Date(user.proExpiresAt)
) {
  user.plan = "free";
  user.proActivatedAt = null;
  user.proExpiresAt = null;

  await user.save();

  console.log(
    "⌛ Pro plan expired. User moved to Free:",
    user.email
  );
}
// ===========================
// Free Plan Scan Limit
// ===========================

if (
  user.plan !== "pro" &&
  user.scanCount >= 3
) {
  return res.status(403).json({
    success: false,
    message:
      "You have reached your 3 free scans. Upgrade to Pro for unlimited analyses.",
  });
}

    // Add https:// automatically
    if (
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      url = "https://" + url;
    }

    const lighthouseData = await runLighthouse(url);

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
      },
    });
    const $ = cheerio.load(response.data);
    
    // Heading Analysis
const headings = {
  h1: $("h1").length,
  h2: $("h2").length,
  h3: $("h3").length,
  h4: $("h4").length,
  h5: $("h5").length,
  h6: $("h6").length,

  h1Texts: $("h1")
    .map((i, el) => $(el).text().trim())
    .get(),
};
// Link Analysis
const allLinks = $("a");

const internalLinks = allLinks
  .toArray()
  .filter((link) => {
    const href = $(link).attr("href");

    if (!href) return false;

    return (
      href.startsWith("/") ||
      href.includes(new URL(url).hostname)
    );
  }).length;

const externalLinks = allLinks
  .toArray()
  .filter((link) => {
    const href = $(link).attr("href");

    if (!href) return false;

    return (
      href.startsWith("http") &&
      !href.includes(new URL(url).hostname)
    );
  }).length;

const links = {
  internal: internalLinks,
  external: externalLinks,
  total: allLinks.length,
};
// Image Analysis
const totalImages = $("img").length;

const withAlt = $("img")
  .toArray()
  .filter((img) => {
    const alt = $(img).attr("alt");
    return alt && alt.trim() !== "";
  }).length;

const missingAlt = totalImages - withAlt;

const images = {
  total: totalImages,
  withAlt,
  missingAlt,
};
// Content Analysis
const pageText = $("body")
  .text()
  .replace(/\s+/g, " ")
  .trim();

const words = pageText
  .split(" ")
  .filter((word) => word.length > 2);

const wordCount = words.length;

// Page Size (KB)
const pageSize = `${(
  Buffer.byteLength(response.data, "utf8") / 1024
).toFixed(2)} KB`;

// Reading Time (minutes)
const readingTime = Math.max(
  1,
  Math.ceil(wordCount / 200)
);
// Keyword Density
const stopWords = new Set([
  "the","and","for","that","with","this","from",
  "are","was","were","has","have","had",
  "you","your","our","www","https","http",
  "com","into","about","their","they","them",
  "will","would","could","should","can","not",
  "but","all","any","its","it's","than",
]);

const frequency = {};

words.forEach((word) => {
  word = word.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (!word || stopWords.has(word)) return;

  frequency[word] = (frequency[word] || 0) + 1;
});

const keywords = Object.entries(frequency)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .map(([word, count]) => ({
    word,
    count,
    density: (
      (count / wordCount) *
      100
    ).toFixed(2),
  }));
   const title = $("title").text() || "";

const description =
  $('meta[name="description"]').attr("content") || "";

const canonical =
  $('link[rel="canonical"]').attr("href") || "";

const ogTitle =
  $('meta[property="og:title"]').attr("content") || "";

const ogDescription =
  $('meta[property="og:description"]').attr("content") || "";

const ogImage =
  $('meta[property="og:image"]').attr("content") || "";

const twitterCard =
  $('meta[name="twitter:card"]').attr("content") || "";


  

// 👇 THIS MUST EXIST
const aiAdvice = await getSEOAdvice({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  twitterCard,
  score: Math.round(
    (
      lighthouseData.seo +
      lighthouseData.performance +
      lighthouseData.accessibility +
      lighthouseData.bestPractices
    ) / 4
  ),
});
// =========================
// SEO Issues Detection
// =========================
const issues = [];

// Missing Meta Description
if (!description) {
  issues.push({
    severity: "critical",
    category: "Meta Tags",
    message: "Meta description is missing.",
    recommendation:
      "Add a meta description between 150-160 characters.",
  });
}

// Missing Canonical
if (!canonical) {
  issues.push({
    severity: "warning",
    category: "SEO",
    message: "Canonical URL is missing.",
    recommendation:
      "Add a canonical URL.",
  });
}

// Missing H1
if (headings.h1 === 0) {
  issues.push({
    severity: "critical",
    category: "Headings",
    message: "No H1 tag found.",
    recommendation:
      "Every page should have one H1 tag.",
  });
}

// Multiple H1
if (headings.h1 > 1) {
 issues.push({
  severity: "warning",
  category: "Headings",
  message: "Multiple H1 tags found.",
  recommendation: "Use only one H1 tag on each page.",
});
}

// Images without Alt
if (images.missingAlt > 0) {
 issues.push({
  severity: "warning",
  category: "Images",
  message: `${images.missingAlt} image(s) missing alt text.`,
  recommendation: "Add descriptive alt text to all images.",
});
}

// Long Title
if (title && title.length > 60) {
  issues.push({
    severity: "warning",
    category: "Meta Tags",
    message: "Title is longer than 60 characters.",
    recommendation:
      "Keep the title between 50-60 characters.",
  });
}

const savedAnalysis = await Analysis.create({
  url,

  overallScore: Math.round(
    (
      lighthouseData.seo +
      lighthouseData.performance +
      lighthouseData.accessibility +
      lighthouseData.bestPractices
    ) / 4
  ),

  aiAdvice,

  metaData: {
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
  },

  categories: {
    seo: lighthouseData.seo,
    performance: lighthouseData.performance,
    accessibility: lighthouseData.accessibility,
    bestPractices: lighthouseData.bestPractices,
  },

  headings,

  links,

  images,

  wordCount,

  pageSize,

  readingTime,

  keywords,

  issues,

  loadTime: lighthouseData.metrics.fcp,

  metrics: {
    fcp: lighthouseData.metrics.fcp,
    lcp: lighthouseData.metrics.lcp,
    cls: lighthouseData.metrics.cls,
    tbt: lighthouseData.metrics.tbt,
    speedIndex: lighthouseData.metrics.speedIndex,
  },

  opportunities: lighthouseData.opportunities,

  diagnostics: lighthouseData.diagnostics,

  status: "completed",
});

// Increase scan count only after successful analysis
user.scanCount += 1;
await user.save();

res.json({
  success: true,
  _id: savedAnalysis._id,
  url: savedAnalysis.url,
  overallScore: savedAnalysis.overallScore,
  aiAdvice: savedAnalysis.aiAdvice,
  categories: savedAnalysis.categories,
  metaData: savedAnalysis.metaData,
  headings: savedAnalysis.headings,
  links: savedAnalysis.links,
  images: savedAnalysis.images,
  keywords: savedAnalysis.keywords,
  issues: savedAnalysis.issues,
  metrics: savedAnalysis.metrics,
  opportunities: savedAnalysis.opportunities,
  diagnostics: savedAnalysis.diagnostics,
  readingTime: savedAnalysis.readingTime,
  pageSize: savedAnalysis.pageSize,
  loadTime: savedAnalysis.loadTime,
  createdAt: savedAnalysis.createdAt,
  status: savedAnalysis.status,
});
  } catch (error) {
    console.error("ANALYZE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.delete("/api/history/:id", async (req, res) => {
  try {
    await Analysis.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
app.post("/api/keywords", async (req, res) => {
  try {
    const { keyword, url, domain } = req.body;

    const newKeyword = await Keyword.create({
      keyword,
      url,
      domain,
      currentPosition: null,
      currentPage: null,
      bestPosition: 0,
      positionChange: 0,
      active: true,
    });

    res.json({
      success: true,
      keyword: newKeyword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Test Route
app.get("/api/keywords", async (req, res) => {
  try {
    const keywords = await Keyword.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      keywords,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/keyword/:id", async (req, res) => {
  try {
    const keyword = await Keyword.findById(
      req.params.id
    );

    res.json({
      success: true,
      keyword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.delete("/api/keyword/:id", async (req, res) => {
  try {
    await Keyword.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Keyword deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.get("/api/test-serper", async (req, res) => {
  try {
    const response = await axios.post(
      "https://google.serper.dev/search",
      {
        q: "seo analyzer",
      },
      {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("SERPER ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: error.message,
      error: error.response?.data,
    });
  }
});
app.post("/api/check-rank", async (req, res) => {
  try {
    const { keyword, domain } = req.body;

    const response = await axios.post(
      "https://google.serper.dev/search",
      {
        q: keyword,
      },
      {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const results = response.data.organic || [];
    const competitors = results
  .slice(0, 10)
  .map((item) => ({
    position: item.position,
    title: item.title,
    domain: new URL(item.link).hostname,
    url: item.link,
  }));

    let position = null;
let currentPage = null;

for (const item of results) {
  if (item.link.toLowerCase().includes(domain.toLowerCase())) {
    position = item.position;
    currentPage = Math.ceil(item.position / 10);
    break;
  }
}
const existing = await Keyword.findOne({
  keyword,
  domain,
});

await RankHistory.create({
  keyword,
  domain,
  position,
});

await Keyword.findOneAndUpdate(
  { keyword, domain },
  {
    currentPosition: position,
    currentPage,
    bestPosition: existing
      ? Math.min(
          existing.bestPosition || position,
          position
        )
      : position,
    positionChange:
      existing && existing.currentPosition
        ? existing.currentPosition - position
        : 0,
    competitors,
    status: "completed",
    lastChecked: new Date(),
  },
  {
    upsert: true,
    new: true,
  }
);

res.json({
  success: true,
  keyword,
  domain,
  position,
  competitors,
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ===========================
// Pro Feature - Competitor Analysis
// JWT Protected
// ===========================

app.post(
  "/api/competitors",
  authenticateUser,
  async (req, res) => {
    try {
      const { keyword } = req.body;

      // User comes securely from JWT
      const user = req.user;

      if (!keyword) {
        return res.status(400).json({
          success: false,
          message: "Keyword is required",
        });
      }

      // ===========================
      // Check Pro Expiry
      // ===========================

      if (
        user.plan === "pro" &&
        user.proExpiresAt &&
        new Date() > new Date(user.proExpiresAt)
      ) {
        user.plan = "free";
        user.proActivatedAt = null;
        user.proExpiresAt = null;

        await user.save();

        console.log(
          "⌛ Pro expired during competitor analysis:",
          user.email
        );
      }

      // ===========================
      // Pro Access Check
      // ===========================

      if (user.plan !== "pro") {
        return res.status(403).json({
          success: false,
          message:
            "Competitor Analysis is available only for Pro users.",
        });
      }

      // ===========================
      // Fetch Competitors
      // ===========================

      const response = await axios.post(
        "https://google.serper.dev/search",
        {
          q: keyword,
        },
        {
          headers: {
            "X-API-KEY":
              process.env.SERPER_API_KEY,
            "Content-Type":
              "application/json",
          },
        }
      );

      const results =
        response.data.organic || [];

      const competitors = results
        .slice(0, 10)
        .map((item) => ({
          position: item.position,
          title: item.title,
          domain: new URL(
            item.link
          ).hostname,
          url: item.link,
        }));

      return res.json({
        success: true,
        competitors,
      });

    } catch (error) {
      console.error(
        "COMPETITORS ERROR:",
        error.response?.data ||
          error.message
      );

      return res.status(500).json({
        success: false,
        message: error.message,
        error: error.response?.data,
      });
    }
  }
);

// ===========================
// Pro Feature - Rank History
// ===========================

// ===========================
// Pro Feature - Rank History
// JWT Protected
// ===========================

app.get(
  "/api/rank-history/:domain",
  authenticateUser,
  async (req, res) => {
    try {
      // User securely identified from JWT
      const user = req.user;

      // Check Pro expiry
      if (
        user.plan === "pro" &&
        user.proExpiresAt &&
        new Date() > new Date(user.proExpiresAt)
      ) {
        user.plan = "free";
        user.proActivatedAt = null;
        user.proExpiresAt = null;

        await user.save();

        console.log(
          "⌛ Pro expired during Historical Tracking:",
          user.email
        );
      }

      // Pro access check
      if (user.plan !== "pro") {
        return res.status(403).json({
          success: false,
          message:
            "Historical Tracking is available only for Pro users.",
        });
      }

      // Get history
      const history = await RankHistory.find({
        domain: req.params.domain,
      }).sort({
        checkedAt: 1,
      });

      return res.json({
        success: true,
        history,
      });

    } catch (error) {
      console.error(
        "RANK HISTORY ERROR:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

app.get("/api/stats", async (req, res) => {
  try {
    const totalKeywords =
      await Keyword.countDocuments();

    const top10 =
      await Keyword.countDocuments({
        currentPosition: {
          $gt: 0,
          $lte: 10,
        },
      });

    res.json({
      success: true,
      totalKeywords,
      top10,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/history", async (req, res) => {
  try {
    const history = await Analysis.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      history,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Download PDF Report
// =========================
app.get("/api/report/pdf/:id", async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    const pdfDir = path.join(__dirname, "reports");

    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir);
    }

    const filePath = path.join(
      pdfDir,
      `${analysis._id}.pdf`
    );

    generateReport(analysis, filePath);

    setTimeout(() => {
      res.download(filePath, "RankFlow_Report.pdf");
    }, 1000);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Run once when server starts
  checkAllKeywords(Keyword, RankHistory);

  // Run every day at 9:00 AM
  cron.schedule("0 9 * * *", () => {
    console.log("⏰ Running scheduled rank check...");
    checkAllKeywords(Keyword, RankHistory);
  });
});