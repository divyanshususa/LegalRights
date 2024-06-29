import React from "react";
import { Form, Button } from "react-bootstrap";

export default function Witness() {
  return (
    <Form>
      <Form.Group controlId="salutation">
        <Form.Label>Salutation</Form.Label>
        <Form.Control type="text" placeholder="MR." />
      </Form.Group>

      <Form.Group controlId="witnessFullName">
        <Form.Label>Witness Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter witness full name" />
      </Form.Group>

      <Form.Group controlId="fatherHusbandName">
        <Form.Label>Father / Husband Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter father/husband full name"
        />
      </Form.Group>

      <Form.Group controlId="gender">
        <Form.Label>Gender</Form.Label>
        <Form.Control as="select">
          <option value="Female">Female</option>
          {/* Add other gender options */}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="identificationType">
        <Form.Label>Identification Type</Form.Label>
        <Form.Control as="select">
          <option value="">--Select--</option>
          {/* Add other identification types */}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="identificationDescription">
        <Form.Label>Identification Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter identification description"
        />
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter address" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
