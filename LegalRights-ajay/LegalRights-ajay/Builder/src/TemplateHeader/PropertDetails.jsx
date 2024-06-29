import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function PropertDetails() {
  const [circleRate, setCircleRate] = useState(0);
  const [amount, setAmount] = useState(0);

  // Add your calculation logic here

  return (
    <div>
      <h2>PropertDetails</h2>
      <Form>
        <Form.Group controlId="circleRate">
          <Form.Label></Form.Label>

          <Form.Group controlId="fee">
            <Form.Label>
              <b>Search Your Locality</b>
            </Form.Label>
            <Form.Control as="select">
              <option value="Kashmere Gate">Kashmere Gate</option>
              {/* Add other party categories */}
            </Form.Control>
          </Form.Group>


          
          <Form.Label>Circle Rate</Form.Label>
          <Form.Control
            type="number"
            value={circleRate}
            onChange={(e) => setCircleRate(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </Form.Group>

        {/* Add other input fields and calculation results */}
        {/* For example, display the calculated stamp duty */}

        <Button variant="primary" type="submit">
          Calculate
        </Button>
      </Form>
    </div>
  );
}
