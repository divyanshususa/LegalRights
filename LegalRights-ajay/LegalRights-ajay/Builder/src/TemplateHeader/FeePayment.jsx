import React from "react";
import { Form, Button } from "react-bootstrap";

export default function FeePayment() {
  const HandleAddOn = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="row">
        <Form style={{ display: "grid", direction: "column",margin:"1.5em"}}>
          <Form.Group controlId="partyType">
            {/* <strong>FeePayment</strong> */}
          </Form.Group>

          <Form.Group controlId="salutation">
            <strong>E-stampNo.</strong>
            <Form.Control type="text" placeholder="E-stampNo." />
          </Form.Group>

          <Form.Group controlId="partyFullName">
            <strong>Registration Fee No.</strong>
            <Form.Control type="text" placeholder="Registration Fee No." />
          </Form.Group>

          <Form.Group controlId="Date">
            <strong>Date</strong>
            <Form.Control type="text" placeholder="Date" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

