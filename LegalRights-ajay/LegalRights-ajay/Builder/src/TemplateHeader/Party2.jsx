import React from "react";
import { Form, Button } from "react-bootstrap";

export default function Party2() {
  const HandleAddOn = () => {
    window.location.reload();
  };

  return (
    <>
      <Button variant="primary" onClick={HandleAddOn}>
        AddOn
      </Button>
      <div className="row">
        <Form style={{ display: "grid", direction: "column" }}>
          <Form.Group controlId="partyType">
            <strong>Party Type</strong>
            <Form.Control as="select">
              <option value="Vendee">Vendee</option>
              {/* Add other party types */}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="partyCategory">
            <strong>Select Party Category</strong>
            <Form.Control as="select">
              <option value="Individual">Individual</option>
              {/* Add other party categories */}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="isExecuter">
            <Form.Check type="checkbox" label="Is Executer?" />
          </Form.Group>

          <Form.Group controlId="salutation">
            <strong>Salutation</strong>
            <Form.Control type="text" placeholder="MR." />
          </Form.Group>

          <Form.Group controlId="partyFullName">
            <strong>Party Full Name</strong>
            <Form.Control type="text" placeholder="Enter party full name" />
          </Form.Group>

          <Form.Group controlId="fatherHusbandName">
            <strong>Father / Husband Full Name</strong>
            <Form.Control
              type="text"
              placeholder="Enter father/husband full name"
            />
          </Form.Group>

          <Form.Group controlId="age">
            <strong>Age</strong>
            <Form.Control type="number" placeholder="Enter age" />
          </Form.Group>

          <Form.Group controlId="aadharNumber">
            <strong>Aadhar Number</strong>
            <Form.Control type="text" placeholder="Enter Aadhar number" />
          </Form.Group>

          <Form.Group controlId="identificationType">
            <strong>Gender</strong>
            <Form.Control as="select">
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              {/* Add other identification types */}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="aadharNumber">
            <strong>MobileNo. :- *</strong>
            <Form.Control type="text" placeholder="Enter Aadhar number" />
          </Form.Group>

          <Form.Group controlId="aadharNumber">
            <strong>Email :- *</strong>
            <Form.Control type="text" placeholder="Enter Aadhar number" />
          </Form.Group>

          <Form.Group controlId="aadharNumber">
            <strong>Address :- *</strong>
            <Form.Control type="text" placeholder="Enter Aadhar number" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

// <Form.Group controlId="identificationType">
//   <strong>Identification Type</strong>
//   <Form.Control as="select">
//     <option value="">--Select--</option>
//     {/* Add other identification types */}
//   </Form.Control>
// </Form.Group>

// <Form.Group controlId="identificationType">
//   <strong>Identification Number :- </strong>
//   <Form.Control as="select">
//     <option value="">--Select--</option>
//     {/* Add other identification types */}
//   </Form.Control>
// </Form.Group>
