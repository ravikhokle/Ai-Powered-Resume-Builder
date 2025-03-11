import { Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const AiBox = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setError("");
    setLoading(true);

    try {
      const url = `${import.meta.env.VITE_API}/gemini`;
      const { data } = await axios.post(url, { prompt: input });

      setResponse(data.text || "No response received.");
    } catch (err) {
      setError("Ask something...");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopyStatus("Copied");

    setTimeout(() => {
      setCopyStatus("Copy");
    }, 3000);
  };

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
   

      {/* Toggle Button */}
      <button
        onClick={toggleBox}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "12px 20px",
          backgroundColor: "#155dfc",
          color: "white",
          borderRadius: "50px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
        }}
      >
        <Sparkles fill="#ff00ff" color="#fff" />
        {isOpen ? "Close AI" : "Ask AI"}
      </button>

      {/* AI Box */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
            zIndex: 9999,
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask AI anything..."
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: loading ? "white" : "#007bff",
                color: "white",
                fontSize: "16px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.3s ease",
              }}
              disabled={loading}
            >
              {loading ? <Loading show={loading} /> : "Send"}
            </button>
          </form>
          {error && (
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor: "#ffe6e6",
                borderRadius: "8px",
                border: "1px solid #ffcccc",
                color: "#d9534f",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}
          {response && (
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #ddd",
                maxHeight: "200px",
                overflowY: "auto",
                fontSize: "14px",
              }}
            >
              <textarea
                value={response}
                onChange={handleResponseChange}
                style={{
                  width: "100%",
                  height: "100px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  resize: "none", // Removed resizable property
                }}
              />
              <button
                onClick={handleCopy}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  backgroundColor:
                    copyStatus === "Copied" ? "#28a745" : "#007bff",
                  border: "none",
                  color: "white",
                  fontSize: "14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {copyStatus}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AiBox;