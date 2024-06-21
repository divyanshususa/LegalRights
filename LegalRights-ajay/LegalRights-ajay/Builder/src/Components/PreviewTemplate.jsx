import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import axios from "../Service/axios";
import { Button, Select } from "antd";
import { templatePlaceholders } from "./Utility/placeholders"; // Adjust the path as needed
import "bootstrap/dist/css/bootstrap.min.css";

const { Option } = Select;

export default function PreviewTemplate({ temp }) {
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [selectedTemplate, setSelectedTemplate] = useState("");

  console.log("Preview temp", temp);
  console.log("This is user data", user);

  useEffect(() => {
    if (temp) {
      getTemplate();
    }
  }, [temp]);

  useEffect(() => {
    if (temp) {
      handleTemplateChange(temp);
    }
  }, [temp]);

  const getTemplate = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/templates/templates/name/${temp}`
      );
      setContent(res.data.template.descriptions);
      console.log("Template fetched", res.data.template);
    } catch (error) {
      console.error("Failed to fetch template:", error);
    }
  };
  const userId = JSON.parse(localStorage.getItem("user"));
  const createNewPost = async (ev) => {
    ev.preventDefault();

    try {
      const response = await axios.post("/api/Createposts", {
        description: content,
        Name: temp,
        userId: userId._id,
      });

      if (response.status === 201) {
        setRedirect(true);
      }
    } catch (error) {
      if (error.response) {
        console.error("Failed to create post:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  const handleInputChange = (placeholder) => (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [placeholder]: e.target.value,
    }));
  };

  const handleReplaceContent = () => {
    let updatedContent = content;
    const placeholders = templatePlaceholders[selectedTemplate] || [];
    for (const placeholder of placeholders) {
      const value = inputValues[placeholder] || placeholder;
      const regex = new RegExp(`\\$\\{\\*\\*${placeholder}\\*\\*\\}`, "g");
      updatedContent = updatedContent.replace(regex, value);
    }
    setContent(updatedContent);
  };

  const handleTemplateChange = (temp) => {
    setSelectedTemplate(temp);
    setInputValues({});
    // Do not reset content here, it will be replaced when handleReplaceContent is called
  };

  if (redirect) {
    return <Navigate to="/user/userhistory" />;
  }

  return (
    <>
      <div className="container mt-1">
        <div className="row">
          {selectedTemplate &&
            templatePlaceholders[selectedTemplate].map((placeholder, index) => (
              <div className="col-md-3 mb-2" key={index}>
                <div className="form-group">
                  <label className="form-label font-weight-bold">
                    {placeholder}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={placeholder}
                    value={inputValues[placeholder] || ""}
                    onChange={handleInputChange(placeholder)}
                  />
                </div>
              </div>
            ))}
        </div>

        <Button
          type="primary"
          className="template-choose-button mb-3"
          onClick={handleReplaceContent}
          disabled={!selectedTemplate}
        >
          Replace Content
        </Button>
      </div>
      <form onSubmit={createNewPost}>
        <Editor
          value={content}
          onChange={setContent}
          createNewPost={createNewPost}
        />
        <button className="btn btn-primary mt-2">Create post</button>
      </form>
    </>
  );
}
