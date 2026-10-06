const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendRankAlert = async ({
  email,
  keyword,
  oldPosition,
  newPosition,
}) => {
  try {
    let subject = "";
    let message = "";

    if (newPosition < oldPosition) {
      subject = "📈 RankFlow - Ranking Improved!";
      message = `
Hello,

Great news!

Keyword: ${keyword}

Previous Rank: #${oldPosition}
Current Rank: #${newPosition}

Your ranking has improved.

Keep optimizing your website!

— RankFlow
`;
    } else if (newPosition > oldPosition) {
      subject = "⚠️ RankFlow - Ranking Dropped";
      message = `
Hello,

Keyword: ${keyword}

Previous Rank: #${oldPosition}
Current Rank: #${newPosition}

Your ranking has dropped.

Check your SEO strategy.

— RankFlow
`;
    } else {
      return;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });

    console.log(`📧 Email sent for ${keyword}`);
  } catch (err) {
    console.error("Email Error:", err.message);
  }
};

module.exports = sendRankAlert;