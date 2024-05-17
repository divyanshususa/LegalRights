import React, { useState, useEffect } from "react";
import axios from "axios";

const DocumentEditor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:3000/files");
      const formattedHtmlContent = response.data.htmlContent
        .replace(/\n/g, "<br>")
        .replace(/ /g, "&nbsp;");
      setHtmlContent(formattedHtmlContent);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (content) => {
    setHtmlContent(content);
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:3000/files", {
        htmlContent,
      });
      alert("File content saved successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Document Editor</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div>
        <h2>Edit Content:</h2>
        <div
          contentEditable={true}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          onBlur={(e) => handleEditorChange(e.target.innerHTML)}
        ></div>
      </div>
      <button onClick={handleSave}>Save Content</button>
    </div>
  );
};

export default DocumentEditor;
