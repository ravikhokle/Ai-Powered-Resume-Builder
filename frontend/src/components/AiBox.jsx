import { Sparkles, Maximize, Minimize, Copy, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

const AiBox = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const textareaRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [response]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        const toggleButton = document.querySelector(".ai-toggle-button");
        if (!toggleButton?.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please enter a question");
      return;
    }

    setResponse("");
    setError("");
    setLoading(true);

    try {
      const url = `${import.meta.env.VITE_API}/gemini`;
      const { data } = await axios.post(url, { prompt: input });
      setResponse(data.text || "No response received.");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const toggleBox = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setInput("");
      setResponse("");
      setError("");
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={toggleBox}
        className="ai-toggle-button"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "12px 24px",
          backgroundColor: isOpen ? "#6c757d" : "#155dfc",
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
          zIndex: 9998,
        }}
      >
        <Sparkles fill={isOpen ? "#ccc" : "#ff00ff"} color="#fff" size={18} />
        {isOpen ? "Close AI" : "Ask AI"}
      </button>

      {/* AI Box */}
      {isOpen && (
        <div
          ref={boxRef}
          style={{
            position: isFullscreen ? "fixed" : "fixed",
            top: isFullscreen ? "0" : "auto",
            left: isFullscreen ? "0" : "auto",
            bottom: isFullscreen ? "0" : "80px",
            right: isFullscreen ? "0" : "20px",
            width: isFullscreen ? "100vw" : "min(90vw, 400px)",
            height: isFullscreen ? "100vh" : "auto",
            maxHeight: isFullscreen ? "none" : "70vh",
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: isFullscreen ? "0" : "12px",
            padding: isFullscreen ? "2rem" : "1.25rem",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
            zIndex: 9999,
            animation: "fadeIn 0.3s ease-in-out",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h3 style={{ margin: 0, color: "#333", fontSize: "1.1rem" }}>
              AI Assistant
            </h3>
            <button
              onClick={toggleFullscreen}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#666",
                padding: "4px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
              }}
              aria-label={isFullscreen ? "Minimize" : "Maximize"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: "auto" }}>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  position: "relative",
                  marginBottom: "1rem",
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask AI anything..."
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: `1px solid ${error ? "#ff6b6b" : "#ddd"}`,
                    fontSize: "14px",
                    backgroundColor: "#fff",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    transition: "all 0.2s",
                  }}
                />
                {error && (
                  <p
                    style={{
                      color: "#ff6b6b",
                      fontSize: "0.8rem",
                      margin: "0.5rem 0 0",
                    }}
                  >
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: loading ? "#e9ecef" : "#155dfc",
                  color: loading ? "#6c757d" : "white",
                  fontSize: "16px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontWeight: "500",
                }}
              >
                {loading ? (
                  <>
                    <Loading show={loading} />
                    <span>Processing...</span>
                  </>
                ) : (
                  "Ask AI"
                )}
              </button>
            </form>

            {response && (
              <div
                style={{
                  marginTop: "1.5rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "#f1f3f5",
                    borderBottom: "1px solid #e0e0e0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <small style={{ color: "#495057" }}>AI Response</small>
                  <button
                    onClick={handleCopy}
                    style={{
                      backgroundColor: copyStatus ? "#2b8a3e" : "#364fc7",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      transition: "all 0.2s",
                    }}
                  >
                    {copyStatus ? (
                      <>
                        <Check size={14} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  ref={textareaRef}
                  value={response}
                  readOnly
                  style={{
                    width: "100%",
                    minHeight: "120px",
                    padding: "12px",
                    border: "none",
                    backgroundColor: "#fff",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    resize: "none",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default AiBox;