import React from "react";
import { useNavigate } from "react-router-dom";

import "./custom.css"; // Custom CSS file for additional styling

export default function DataEntry() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h3>Data Entry</h3>
        </div>
        <ul className="list-group list-group-flush">
          <li
            className="list-group-item clickable-item"
            onClick={() => {
              navigate("/user/dailyLedger");
            }}
          >
            Daily Ledger
          </li>
          <li
            className="list-group-item clickable-item"
            onClick={() => {
              navigate("/user/documentdetail");
            }}
          >
            Detail Group
          </li>
          <li
            className="list-group-item clickable-item"
            onClick={() => {
              navigate("/user/propertydetails");
            }}
          >
            Property Details
          </li>
        </ul>
      </div>
    </div>
  );
}
