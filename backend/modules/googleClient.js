require("dotenv").config(); // Loads environment variables

const { GoogleGenerativeAI } = require("@google/generative-ai"); // Use require instead of import

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

module.exports = { genAI }; // Export genAI
