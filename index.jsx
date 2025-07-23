import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const App = () => {
  const [instruction, setInstruction] = useState("");
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateNames = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.shecodes.io/ai/v1/generate?prompt=Suggest cute baby names based on these instructions: ${instruction}&context=Be creative and diverse&key=42t6213cf48c3o5336a35503b83be79d`
      );

      const data = await response.json();
      const aiText = data.answer;

      const nameList = aiText
        .split("\n")
        .map((n) => n.trim())
        .filter((n) => n);

      setNames(nameList);
    } catch (error) {
      console.error("Error fetching names:", error);
      setNames(["Something went wrong. Please try again."]);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Baby Names Generator 👶</h1>
      <p>
        Describe what kind of names you want (e.g. cute girl names, traditional
        African boy names, unisex nature-themed names)
      </p>

      <textarea
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        placeholder="Enter your instructions here..."
      />

      <button onClick={generateNames} disabled={loading || !instruction}>
        {loading ? "Generating..." : "Generate Names"}
      </button>

      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <footer>
        <a
          href="https://github.com/YOUR_GITHUB_USERNAME/baby-names-generator"
          target="_blank"
          rel="noreferrer"
        >
          View Source Code on GitHub
        </a>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

