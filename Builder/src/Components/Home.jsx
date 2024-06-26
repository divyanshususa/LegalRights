import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import "./Home.css";
import PreviewTemplate from "./PreviewTemplate";
import { FaRegFileAlt } from "react-icons/fa";


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

  return (
    <>
      <Container className="sale-main-form-container">
        <Row style={{ display: "flex" }}>
          <Col md={6}>
            <h2>
              <FaRegFileAlt /> Sale Main Document Form
            </h2>

            <Form className="sale-main-form" onSubmit={handleSubmit}>
              {fields.slice(0, 6).map((field) => (
                <Form.Group key={field.id} controlId={field.id}>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    type={field.type}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    required
                  />
                  {errors && errors[field.id] && (
                    <Form.Text className="text-danger">
                      {errors[field.id]}
                    </Form.Text>
                  )}
                </Form.Group>
              ))}
            </Form>
          </Col>
          <Col md={6}>
            <h2 className="form-heading" style={{ color: "white" }}>
              bb
            </h2>
            <Form
              className="sale-main-form"
              onSubmit={handleSubmit}
              style={{ margin: "1.5em" }}
            >
              {fields.slice(6).map((field) => (
                <Form.Group key={field.id} controlId={field.id}>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    type={field.type}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    required
                  />
                  {errors && errors[field.id] && (
                    <Form.Text className="text-danger">
                      {errors[field.id]}
                    </Form.Text>
                  )}
                </Form.Group>
              ))}
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
              </Button>
            </Form>
          </Col>
        </Row>
        {submitted && (
          <div className="submitted-message">
            Data submitted successfully! Thank you.
          </div>
        )}
      </Container>
      <PreviewTemplate temp={temp} />
    </>
  );
};

export default Home;
