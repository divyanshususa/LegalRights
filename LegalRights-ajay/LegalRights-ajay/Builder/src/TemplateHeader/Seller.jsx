import React, { useState, useContext } from "react";
import "./PropertDetails.css";
import { Button } from "antd";
import {
  TemplteContext,
  TemplteProvider,
  useTemplate,
} from "../Hooks/TemplateContext";

const Seller = () => {
  const [paragraph, setParagraph] = useState("");
  const { template, content, updateContent } = useTemplate();

  const handleReplaceContent = () => {
    const updatedContent = content.replace("S1", paragraph);
    updateContent(updatedContent);
  };

  return (
    <>
      <h2>Seller</h2>

      <div className="property-details-container">
        <textarea
          className="property-details-input"
          placeholder="Write your paragraph here..."
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
        ></textarea>
      </div>
      <Button
        type="primary"
        className="template-choose-button mb-3"
        onClick={handleReplaceContent}
      >
        Replace Content
      </Button>
    </>
  );
};

export default Seller;
