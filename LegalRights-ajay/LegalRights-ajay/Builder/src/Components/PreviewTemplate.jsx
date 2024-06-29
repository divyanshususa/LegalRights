import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Editor from "../Editor";
import axios from "../Service/axios";
import { Button, Select } from "antd";
import { templatePlaceholders } from "./Utility/placeholders"; // Adjust the path as needed
import "bootstrap/dist/css/bootstrap.min.css";
import TemplateLayout from "./TemplateLayout";
import { useTemplate } from "../Hooks/TemplateContext";

const { Option } = Select;

export default function PreviewTemplate({ temp }) {
  const [internet, setinternet] = useState(true);
  // const [content, updateContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // const [template, updateTemplate] = useState("");
  // const [online,setonline]=useEffect('')
  const { template, content, updateTemplate, updateContent } = useTemplate();
  console.log("Preview temp", temp);
  console.log("This is user data", user);
  const navigate = useNavigate();
  useEffect(() => {
    if (temp) {
      getTemplate();
    }
  }, [temp, internet]);

  useEffect(() => {
    if (temp) {
      handleTemplateChange(temp);
    }
  }, [temp, internet]);

  const getTemplate = async () => {
    try {
      const res = await axios.get(
        `/templates/templates/name/${temp}`
      );
      updateContent(res.data.template.descriptions);
      console.log("Template fetched", res.data.template);
    } catch (error) {
      console.error("Failed to fetch template:", error);
      if (error) {
        setinternet(false);
      }
    }
  };

  const userId = JSON.parse(localStorage.getItem("user"));

  const retryFailedPost = async () => {
    const failedPost = JSON.parse(localStorage.getItem("failedPost"));
    if (failedPost) {
      try {
        const response = await axios.post("/api/Createposts", failedPost);
        if (response.status === 201) {
          localStorage.removeItem("failedPost");
          console.log("Successfully sent failed post.");

          navigate("/user/userhistory");
        }
      } catch (error) {
        console.error("Failed to resend post:", error);
        if (error) {
          setinternet(false);
        }
      }
    }
  };

  const createNewPost = async (ev) => {
    ev.preventDefault();
    const postData = {
      description: content,
      Name: temp,
      userId: userId._id,
    };

    console.log("isOnline net", internet);
    if (internet === false) {
      localStorage.setItem("failedPost", JSON.stringify(postData));
      alert(
        "You are offline. The post will be saved and sent once you're back online."
      );
      return;
    }

    try {
      const response = await axios.post("/api/Createposts", postData);
      if (response.status === 201) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      if (error) {
        setinternet(false);
      }
      // Handle specific errors (e.g., network error, server error)
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
    const placeholders = templatePlaceholders[template] || [];
    for (const placeholder of placeholders) {
      const value = inputValues[placeholder] || placeholder;
      const regex = new RegExp(`\\$\\{\\*\\*${placeholder}\\*\\*\\}`, "g");
      updatedContent = updatedContent.replace(regex, value);
    }
    updateContent(updatedContent);
  };

  const handleTemplateChange = (temp) => {
    updateTemplate(temp);
    setInputValues({});
    // Do not reset content here, it will be replaced when handleReplaceContent is called
  };

  if (redirect) {
    return <Navigate to="/user/userhistory" />;
  }

  return (
    <>
      <TemplateLayout />
      <div className="container mt-1">
        <div className="row">
          {/* {template &&
            templatePlaceholders[template].map((placeholder, index) => (
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
            ))} */}
        </div>

        {/* <Button
          type="primary"
          className="template-choose-button mb-3"
          onClick={handleReplaceContent}
          disabled={!template}
        >
          Replace Content
        </Button> */}
      </div>
      <form onSubmit={createNewPost}>
        <Editor
          value={content}
          onChange={updateContent}
          createNewPost={createNewPost}
        />
        <button className="btn btn-primary mt-2">Create post</button>
        <button className="btn btn-primary mt-2" onClick={retryFailedPost}>
          Sync
        </button>
      </form>
    </>
  );
}
