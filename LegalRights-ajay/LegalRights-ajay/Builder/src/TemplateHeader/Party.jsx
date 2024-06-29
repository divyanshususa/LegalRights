import React from "react";
import { Form, Button } from "react-bootstrap";

export default function Party() {
  return (
    <Form>
      <Form.Group controlId="partyType">
        <Form.Label>Select Party Type</Form.Label>
        <Form.Control as="select">
          <option value="CLAIMANT">Claimant</option>
          {/* Add other party types */}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="partyCategory">
        <Form.Label>Select Party Category</Form.Label>
        <Form.Control as="select">
          <option value="Individual">Individual</option>
          {/* Add other party categories */}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="isExecuter">
        <Form.Check type="checkbox" label="Is Executer?" />
      </Form.Group>

      <Form.Group controlId="salutation">
        <Form.Label>Salutation</Form.Label>
        <Form.Control type="text" placeholder="MR." />
      </Form.Group>

      <Form.Group controlId="partyFullName">
        <Form.Label>Party Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter party full name" />
      </Form.Group>

      <Form.Group controlId="fatherHusbandName">
        <Form.Label>Father / Husband Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter father/husband full name"
        />
      </Form.Group>

      <Form.Group controlId="age">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" placeholder="Enter age" />
      </Form.Group>

      <Form.Group controlId="aadharNumber">
        <Form.Label>Aadhar Number</Form.Label>
        <Form.Control type="text" placeholder="Enter Aadhar number" />
      </Form.Group>

      <Form.Group controlId="identificationType">
        <Form.Label>Identification Type</Form.Label>
        <Form.Control as="select">
          <option value="">--Select--</option>
          {/* Add other identification types */}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="identificationType">
        <Form.Label>Identification Number :- </Form.Label>
        <Form.Control as="select">
          <option value="">--Select--</option>
          {/* Add other identification types */}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="identificationType">
        <Form.Label>Gender</Form.Label>
        <Form.Control as="select">
          <option value="">--Select--</option>
          {/* Add other identification types */}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="identificationType">
        <Form.Label>Presentation Exemption :-</Form.Label>
        <Form.Control as="select">
          <option value="">--Select--</option>
          {/* Add other identification types */}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="aadharNumber">
        <Form.Label>MobileNo. :- *</Form.Label>
        <Form.Control type="text" placeholder="Enter Aadhar number" />
      </Form.Group>

      <Form.Group controlId="aadharNumber">
        <Form.Label>Email :- *</Form.Label>
        <Form.Control type="text" placeholder="Enter Aadhar number" />
      </Form.Group>

      <Form.Group controlId="aadharNumber">
        <Form.Label>Address :- *</Form.Label>
        <Form.Control type="text" placeholder="Enter Aadhar number" />
      </Form.Group>

      <Form.Group controlId="identificationType">
        <Form.Label>Home Visit :-</Form.Label>
        <Form.Control as="select">
          <option value="">--Select--</option>
          {/* Add other identification types */}
        </Form.Control>
      </Form.Group>
      {/* Add other form fields similarly */}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
