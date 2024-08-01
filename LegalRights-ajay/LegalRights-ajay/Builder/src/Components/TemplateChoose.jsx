import React, { useContext, useState } from "react";
import { Select, Button } from "antd";
import { Link } from "react-router-dom";
import "./TemplateChoose.css"; // Import CSS file for additional styles
import Witness from "./TemplateLayout";
import { useTemplate } from "../Hooks/TemplateContext";

const { Option } = Select;

const TemplateChoose = ({ choosetemp }) => {
  const [SelectedTemplate, setSelectedTemplate] = useState(null);

  choosetemp(SelectedTemplate);
  const { updateTemplate } = useTemplate();





  const handleTemplateSelect = (value) => {
    setSelectedTemplate(value);
    
  updateTemplate(value);
  };



  return (
    <div className="template-choose-container">
      <h1 className="template-choose-title">Choose a Template:</h1>
      <Select
        className="template-choose-select"
        style={{ width: 300, marginBottom: 16 }}
        placeholder="Select a template"
        onChange={handleTemplateSelect}
        value={SelectedTemplate}
      >
        <Option value="Sale Deed">Sale Deed</Option>
        <Option value="TWO PARTIES">TWO PARTIES</Option>
        <Option value="Rent Deed">Rent Deed</Option>
        <Option value="Will">Will</Option>
        {/* <Option value="VEHICLE SALE AND PURTUESED-5">
          VEHICLE SALE AND PURTUESED-5
        </Option> */}
        <Option value="FAMILY WILL">FAMILY WILL</Option>
        <Option value="Gift Deed">Gift Deed</Option>
        <Option value="VEHICLE SALE AND PURTUESED-5">
          VEHICLE SALE AND PURTUESED-5
        </Option>

        <Option value="BAYANA SAMPLE FINAL">BAYANA SAMPLE FINAL</Option>
        {/* <Option value="Will"> Will</Option>
        <Option value="Construction Agreement">Construction Agreement</Option>
        <Option value="Collaboration Agreement">Collaboration Agreement</Option>
        <Option value="No-rent Agreement">No-rent Agreement</Option>
        <Option value="Notary File">Notary File</Option>
        <Option value="Renovation Agreement">Renovation Agreement</Option>
        <Option value="Bayana">Bayana</Option>
        <Option value="Property Loan">Property Loan</Option>
        <Option value="Release Deed">Release Deed</Option>
        <Option value="Trust Deed">Trust Deed</Option>
        <Option value="Two Parties">Two Parties</Option> */}
        {/* Add more deed names as needed */}
      </Select>
      <br />
    </div>
  );
};

export default TemplateChoose;
