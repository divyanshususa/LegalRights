import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useNavigate } from "react-router-dom";

const TemplateAdd = () => {
  const [name, setName] = useState("");
  const [descriptions, setDescriptions] = useState("");
    const navigate = useNavigate(); 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/templates/cretaetemplates",
        {
          descriptions,
          Name: name,
        }
      );
      console.log("Template added:", response.data);
      setDescriptions("");
        setName("");
     console.log("msg sent")
    } catch (error) {
      console.error("Error adding template:", error);
    }
  };

  return (
    <div>
      <h2>Add Template</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="quill-editor">
          <label htmlFor="descriptions">Descriptions:</label>
          <ReactQuill
            id="descriptions"
            value={descriptions}
            onChange={setDescriptions}
            modules={modules}
            formats={formats}
            placeholder="Write something..."
            required
          />
        </div>
        <button type="submit">Add Template</button>
      </form>
    </div>
  );
};

export default TemplateAdd;

// Quill modules and formats options
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    [{ align: [] }],
    [{ color: [] }],
    ["clean"],
  ]
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
    "color"
];
