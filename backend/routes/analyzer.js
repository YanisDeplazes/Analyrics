// https://github.com/YanisDeplazes/STUWE1/wiki/Final-Concept#user-content-api-test

var express = require("express");
var router = express.Router();
var { genAI } = require("../modules/googleClient");

// Ensure the express app uses express.json() middleware
router.use(express.json());

router.post("/", async function (req, res, next) {
  const textPrompt = `Analyze the following line by rhyme, description, emotions:`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let analysisResults = {};

    const { lyrics } = req.body;

    // Check if lyrics is provided and is an array
    if (!lyrics || !Array.isArray(lyrics)) {
      return res.status(400).json({ error: "Invalid or missing lyrics array" });
    }

    // Analyze each line and store the raw response
    for (const [index, line] of lyrics.entries()) {
      const prompt = textPrompt + `"${line}"`;
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json", // Set response to JSON format
          temperature: 0.7,
          topK: 5,
          maxOutputTokens: 256,
        },
      });

      // Store JSON response into results
      analysisResults[`Line ${index + 1}`] = result.response.candidates;
    }

    // Send the analysis results as a JSON response
    res.json(analysisResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
