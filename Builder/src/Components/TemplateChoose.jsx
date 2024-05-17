import React, { useState } from "react";
import { Select, Button } from "antd";
import { Link } from "react-router-dom";
import "./TemplateChoose.css"; // Import CSS file for additional styles

const { Option } = Select;

const TemplateChoose = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (value) => {
    setSelectedTemplate(value);
  };

  return (
    <div className="template-choose-container">
      <h1 className="template-choose-title">Choose a Template:</h1>
      <Select
        className="template-choose-select"
        style={{ width: 300, marginBottom: 16 }}
        placeholder="Select a template"
        onChange={handleTemplateSelect}
        value={selectedTemplate}
      >
        <Option value="Sale Deed">Sale Deed</Option>
        <Option value="Rent Deed">Rent Deed</Option>
        <Option value="Lease Agreement">Lease Agreement</Option>
        <Option value="Mortgage Deed">Mortgage Deed</Option>
        <Option value="Gift Deed">Gift Deed</Option>
        <Option value="Power of Attorney">Power of Attorney</Option>
        <Option value="Release Deed">Release Deed</Option>
        <Option value="Trust Deed">Trust Deed</Option>
        <Option value="Partition Deed">Partition Deed</Option>
        <Option value="Will">Will</Option>
        {/* Add more deed names as needed */}
      </Select>
      <br />
      <Link to={`/user?template=${selectedTemplate}`}>
        <Button type="primary" className="template-choose-button">
          Submit
        </Button>
      </Link>
    </div>
  );
};

export default TemplateChoose;
