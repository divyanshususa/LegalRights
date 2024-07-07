import React from "react";
import "./PropertDetails.css";
import { Button } from "antd";

const PropertyDetails = () => {
  return (
    <>
      <div className="property-details-container">
        <textarea
          className="property-details-input"
          placeholder="Write your paragraph here..."
        ></textarea>
      </div>
      <Button type="primary" className="template-choose-button mb-3">
        Replace Content
      </Button>
    </>
  );
};

export default PropertyDetails;
