import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const systemPrompt = `You are a highly professional and concise resume assistant. Generate responses to help users create impactful resumes. Focus on clarity, professionalism, and brevity for each response. The user query is: "${prompt}"`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(systemPrompt);

    const finalText =
      result?.response?.candidates[0]?.content?.parts[0]?.text?.trim() ||
      "Sorry, I couldn't generate a response. Please try again with a different prompt.";

    res.status(200).json({ text: finalText });
  } catch (error) {
    console.error("Error generating content:", error);
    res
      .status(500)
      .json({
        error: "An internal server error occurred. Please try again later.",
      });
  }
};

export default gemini;
