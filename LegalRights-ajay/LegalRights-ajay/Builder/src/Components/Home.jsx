import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import "./Home.css";
import PreviewTemplate from "./PreviewTemplate";
import { FaRegFileAlt } from "react-icons/fa";
import TemplateChoose from "./TemplateChoose";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = ({ temp }) => {
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
        "https://legalrights-1.onrender.com/api/sale-main-documents",
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

  const [temps, settemp] = useState("");

  function choosetemp(temps) {
    console.log("routing", temps);
    settemp(temps);
  }
  return (
    <>
      <TemplateChoose choosetemp={choosetemp} />
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
