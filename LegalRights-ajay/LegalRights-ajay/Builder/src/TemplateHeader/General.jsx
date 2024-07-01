import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd"; // Import Button component from Ant Design
import { useParams } from "react-router-dom";
import {
  TemplteContext,
  TemplteProvider,
  useTemplate,
} from "../Hooks/TemplateContext";
import { templatePlaceholders } from "../Components/Utility/placeholders";
import axios from "axios";

export default function General() {
  const contextValue = useContext(TemplteContext);

  console.log("contextValue", contextValue);

  const [inputValues, setInputValues] = useState({});
  const [internet, setinternet] = useState(true);
  const { template, content, updateContent } = useTemplate();

  const getTemplate = async () => {
    try {
      const res = await axios.get(`/templates/templates/name/${template}`);
      updateContent(res?.data?.template?.descriptions);
      console.log("Template fetched", res.data.template);
    } catch (error) {
      console.error("Failed to fetch template:", error);
      if (error) {
        setinternet(false);
      }
    }
  };
  useEffect(() => {
    getTemplate();
  }, []);

  console.log("TemplateContext", template);

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
  useEffect(() => {
    console.log(
      inputValues["Name of Colony"],
      inputValues["Category of Colony"],
      inputValues["Type of Property"]
    );
  }, [inputValues["Name of Colony"]]);
  return (
    <>
      <div className="row">
        {template &&
          templatePlaceholders[template]?.map((placeholder, index) => (
            <div className="col-md-6 mb-2" key={index}>
              <div className="form-group">
                <strong className="font-weight-bold">{placeholder}</strong>
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
        disabled={!template}
      >
        Replace Content
      </Button>{" "}
    </>
  );
}
