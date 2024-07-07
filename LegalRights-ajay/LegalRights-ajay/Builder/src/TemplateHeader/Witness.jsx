import React from "react";
import { Form, Button } from "react-bootstrap";

export default function Witness() {
  const HandleAddOn = () => {
    window.location.reload();
  };

  return (
    <>
      <Button variant="primary" onClick={HandleAddOn}>
        AddOn
      </Button>
      <Form>
        <Form.Group controlId="salutation">
          <strong>Salutation</strong>
          <Form.Control type="text" placeholder="MR." />
        </Form.Group>

        <Form.Group controlId="witnessFullName">
          <strong>Witness Full Name</strong>
          <Form.Control type="text" placeholder="Enter witness full name" />
        </Form.Group>

        <Form.Group controlId="fatherHusbandName">
          <strong>Father / Husband Full Name</strong>
          <Form.Control
            type="text"
            placeholder="Enter father/husband full name"
          />
        </Form.Group>

        <Form.Group controlId="identificationType">
          <strong>Identification Type</strong>
          <Form.Control as="select">
            <option value="">--Select--</option>
            <option value="">AdharNumber</option>
            <option value="">PANNo.</option>
            {/* Add other identification types */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="identificationDescription">
          <strong>Identification Description</strong>
          <Form.Control
            type="text"
            placeholder="Enter identification description"
          />
        </Form.Group>

        <Form.Group controlId="address">
          <strong>Address</strong>
          <Form.Control type="text" placeholder="Enter address" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
