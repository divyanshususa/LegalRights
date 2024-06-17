import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import "./Home.css";
import PreviewTemplate from "./PreviewTemplate";
import { FaRegFileAlt } from "react-icons/fa";
import TemplateChoose from "./TemplateChoose";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = ({temp}) => {
  const [formData, setFormData] = useState({
    colonyName: "",
    category: "",
    propertyType: "",
    minLandRate: "",
    costOfConstruction: "",
    totalFlatArea: "",
    numberOfFloors: "",
    isLiftProvided: false,
    yearOfConstruction: "",
    typeOfColony: "",
    buildingStatus: "",
    useFactor: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/sale-main-documents",
        formData
      );
      console.log("Data posted successfully!");
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error posting data:", error);
      setErrors(error.response.data);
      setLoading(false);
    }
  };

  // Define field configurations
  const fields = [
    { id: "colonyName", label: "Name of Colony", type: "text" },
    { id: "category", label: "Category of Colony", type: "text" },
    { id: "propertyType", label: "Type of Property", type: "text" },
    {
      id: "minLandRate",
      label: "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.",
      type: "text",
    },
    {
      id: "costOfConstruction",
      label: "Cost of Construction notified by Government in Sq.Mtrs.",
      type: "text",
    },
    { id: "totalFlatArea", label: "Total Flat Area in Sq.Mtrs.", type: "text" },
    { id: "numberOfFloors", label: "Number of Floors", type: "number" },
    { id: "isLiftProvided", label: "Lift provided", type: "checkbox" },
    { id: "yearOfConstruction", label: "Year of Construction", type: "text" },
    { id: "typeOfColony", label: "Type of Colony", type: "text" },
    { id: "buildingStatus", label: "Status of Building", type: "text" },
    { id: "useFactor", label: "Use Factor", type: "text" },
  ];
  const [temps, settemp] = useState('');

  function choosetemp(temps) {
    console.log("routing",temps);
    settemp(temps)


    
  }
  return (
    <>
            <TemplateChoose choosetemp={choosetemp}/>
      <Container className="sale-main-form-container">
      
        {submitted && (
          <div className="submitted-message">
            Data submitted successfully! Thank you.
          </div>
        )}
      </Container>
      <PreviewTemplate temp={temps} />
    </>
  );
};

export default Home;
