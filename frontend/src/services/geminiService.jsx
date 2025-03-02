import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const geminiService = {
  checkGrammar: async (text) => {
    try {
      const response = await axios.post(
        GEMINI_API_URL,
        {
          contents: [
            {
              parts: [{ text }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error checking grammar with Gemini:", error.response?.data || error.message);
      throw error;
    }
  },

  getSuggestions: async (text) => {
    try {
      const response = await axios.post(
        GEMINI_API_URL,
        {
          contents: [
            {
              parts: [{ text }],
            },
          ],
          options: {
            suggestions: true,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting suggestions from Gemini:", error.response?.data || error.message);
      throw error;
    }
  },

  correctTone: async (text, desiredTone) => {
    try {
      const response = await axios.post(
        GEMINI_API_URL,
        {
          contents: [
            {
              parts: [{ text }],
            },
          ],
          options: {
            tone: desiredTone,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error correcting tone with Gemini:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default geminiService;
