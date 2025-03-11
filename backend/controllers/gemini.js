import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const finalText = result.response.candidates[0].content.parts[0].text ||
      "No text generated";
    res.status(200).json({ text: finalText });
  } catch (error) {
    res.status(500).json({ error: "An internal server error" });
  }
};

export default gemini;
