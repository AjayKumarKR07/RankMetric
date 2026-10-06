const axios = require("axios");
const sendRankAlert = require("../mail/mailService");

const checkAllKeywords = async (Keyword, RankHistory) => {
  try {
    console.log("🚀 Running scheduled rank check...");

    const keywords = await Keyword.find();

    for (const kw of keywords) {
      try {
        const response = await axios.post(
          "https://google.serper.dev/search",
          {
            q: kw.keyword,
          },
          {
            headers: {
              "X-API-KEY": process.env.SERPER_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        const results = response.data.organic || [];

        let position = 0;

        for (const item of results) {
          if (item.link.includes(kw.domain)) {
            position = item.position;
            break;
          }
        }

        // Save history
        await RankHistory.create({
          keyword: kw.keyword,
          domain: kw.domain,
          position,
        });

        const oldPosition = kw.currentPosition;

        // Update keyword
        await Keyword.findByIdAndUpdate(kw._id, {
          currentPosition: position,
          currentPage: position > 0 ? Math.ceil(position / 10) : null,
          bestPosition:
            kw.bestPosition === 0
              ? position
              : Math.min(kw.bestPosition, position),
          positionChange:
  oldPosition > 0
    ? oldPosition - position
    : 0,
        });

        // Send email if ranking changed
if (
  oldPosition &&
  position &&
  oldPosition !== position
) {
  await sendRankAlert({
    email: process.env.EMAIL_USER, // Temporary for testing
    keyword: kw.keyword,
    oldPosition,
    newPosition: position,
  });
}

        console.log(
          `✅ ${kw.keyword} → Position ${position}`
        );
      } catch (err) {
        console.error(
          `❌ Failed for ${kw.keyword}`,
          err.message
        );
      }
    }

    console.log("🎉 Daily rank check completed.");
  } catch (error) {
    console.error(error);
  }
};

module.exports = checkAllKeywords;