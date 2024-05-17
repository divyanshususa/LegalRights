import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Include Quill styles

const DocumentEditor = () => {
  const [description, setDescription] = useState(""); // State for editor content
  const quillRef = useRef(null); // Reference to Quill editor instance
  const [isEditorReady, setIsEditorReady] = useState(false); // Flag for editor readiness

  useEffect(() => {
    // Check if editor is available (replace with actual check)
    if (quillRef.current && quillRef.current.quill) {
      setIsEditorReady(true);
    }
  }, [quillRef]);

  const handleEditorChange = (newContent) => {
    setDescription(newContent); // Update state with new editor content
  };

  const handleSavePost = async () => {
    const editor = quillRef.current && quillRef.current.quill; // Check if editor is defined
    if (!editor) {
      console.warn("Quill editor not yet initialized");
      return;
    }

    const rawContent = editor.root.innerHTML; // Get raw HTML content

    const escapedDescription = rawContent
      .replace(/\n/g, "\\n")
      .replace(/\t/g, "\\t"); // Escape control characters

    const data = {
      description: escapedDescription,
      // ... other data to be sent based on your requirements
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/post/createpost",
        data
      );
      // Handle success response (e.g., show a success message)
    } catch (error) {
      console.error("Error saving post:", error); // Log error for debugging
      // Handle error response (e.g., show an error message)
    }
  };

  const customToolbar = [
    [{ header: [1, 2, false] }], // Headers
    ["bold", "italic", "underline", "strikethrough"], // Basic formatting
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    ["link", "image"], // Link and image
    ["clean"], // Clear formatting
    [{ indent: "-1" }, { indent: "+1" }], // Indentation
    ["code-block"], // Code block
  ]; // Customize toolbar options as needed

  return (
    <div>
      <h1>Document Editor</h1>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={{ toolbar: customToolbar }}
        onChange={handleEditorChange}
        value={description} // Set initial content (optional)
      />
      <button
        onClick={handleSavePost}
        disabled={!description || !isEditorReady}
      >
        Save Post
      </button>
    </div>
  );
};

export default DocumentEditor;
