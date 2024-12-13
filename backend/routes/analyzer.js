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

    const { track, critic } = req.body;
    // Check if lyrics is provided and is an array
    if (!track) {
      return res.status(400).json({ error: "Invalid or missing lyrics array" });
    }
    if (!critic) {
      return res.status(400).json({ error: "No critic specified" });
    }
    const textPrompt = `You are a lyrics analyst that analyses lyrics of songs.
    You analyse the lyrics based on a persona and respond in the style of the persona.
    You pick certain lines that go well with the description and approach of your persona.
    You respond with about 4-6 specific lines and for each line, you have a comment in the style of your persona.
    Decide whether the comment description mood is happy, smirk, calm, sad or weird.
    If the text is not english, provide a translation, otherwise leave the translation empty.
    You respond with the following json schema Array<{line:string,lineTranslation:string,description:string,descriptionMood:string}>
    Your persona’s description is: ${critic.description}
    Your tone is: ${critic.tone}
    Your approach is: ${critic.approach}
    You engage like this: ${critic.engagement}
    Here are the lyrics that you analyse: ${track.track} by ${track.artist}\n
    ${track.lyrics.map((l) => l.line).join("\n")}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: textPrompt }] }],
      generationConfig: {
        response_mime_type: "application/json",
        temperature: 0.7,
        topK: 5,
        maxOutputTokens: 2000,
      },
    });

    const responseCandidates = result.response.candidates;
    if (
      responseCandidates.length == 0 &&
      responseCandidates[0].content.parts.length == 0
    ) {
      throw new Error("Analysis did not contain an analysis.");
    }
    const analysis = responseCandidates[0].content.parts[0].text;
    const analysisAsJson = JSON.parse(analysis);
    res.json(analysisAsJson);
  } catch (error) {
    res.status(502).json({ error: error.message });
  }
});

module.exports = router;
