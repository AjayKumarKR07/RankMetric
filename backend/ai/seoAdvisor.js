require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Generic chat function
async function askGroq(prompt) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    return completion.choices[0].message.content;

  } catch (err) {
    console.error(err);

    return "AI is currently unavailable.";
  }
}

// SEO Report
async function getSEOAdvice(seoData) {

  const prompt = `
You are an expert SEO consultant.

Analyze this website:

Title: ${seoData.title}
Meta Description: ${seoData.description}
Canonical: ${seoData.canonical}
Open Graph Title: ${seoData.ogTitle}
Open Graph Description: ${seoData.ogDescription}
Twitter Card: ${seoData.twitterCard}

SEO Score: ${seoData.score}/100

Provide:

1. Overall Analysis
2. Strengths
3. Weaknesses
4. SEO Recommendations
5. Priority Actions
`;

  return askGroq(prompt);
}

module.exports = {
  getSEOAdvice,
  askGroq,
};