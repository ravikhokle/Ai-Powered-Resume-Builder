const ENDPOINTS = ["v1", "v1beta"];
const FALLBACK_MODELS = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.0-pro"];

const fetchModels = async (endpoint, apiKey) => {
  const url = `https://generativelanguage.googleapis.com/${endpoint}/models?key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return Array.isArray(data?.models) ? data.models : [];
};

const pickModel = (models) => {
  const supported = models.filter((model) => {
    const methods = model.supportedGenerationMethods || model.supportedMethods || [];
    return methods.includes("generateContent");
  });

  const candidates = supported.length ? supported : models;
  const flash = candidates.find((model) => model.name?.includes("flash"));
  const chosen = flash || candidates[0];
  if (!chosen?.name) {
    return null;
  }
  const modelId = chosen.name.includes("/") ? chosen.name.split("/").pop() : chosen.name;
  return modelId;
};

const gemini = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "API key not configured" });
    }

    const systemPrompt = `You are a senior resume writer and career coach. Provide specific, accurate, and tailored responses. Do NOT ask the user questions. Always deliver a best-effort finalized response even if details are missing, using reasonable, non-fictional phrasing (avoid making up metrics).

  Use the following rules:
  - Always tailor the wording to the user’s role, seniority, and tech stack if provided.
  - Prefer concrete outcomes and impact, but do not fabricate numbers.
  - Keep responses concise and professional.
  - If asked for a summary, produce 1–3 sentences max.

  User request: "${prompt}"`;

    let lastError = null;

    for (const endpoint of ENDPOINTS) {
      const models = await fetchModels(endpoint, process.env.GEMINI_API_KEY);
      const pickedModel = models ? pickModel(models) : null;
      const modelCandidates = pickedModel ? [pickedModel] : FALLBACK_MODELS;

      for (const model of modelCandidates) {
        const url = `https://generativelanguage.googleapis.com/${endpoint}/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const body = {
          contents: [
            {
              role: "user",
              parts: [{ text: systemPrompt }],
            },
          ],
        };

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const data = await response.json();
          const text =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
            "No response generated.";
          return res.status(200).json({ text });
        }

        const errorBody = await response.text();
        lastError = { endpoint, model, status: response.status, errorBody };
      }
    }

    return res.status(500).json({
      error: "Failed to generate AI response",
      details: lastError,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to generate AI response",
      message: error.message,
    });
  }
};

export default gemini;
