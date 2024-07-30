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
            DATA ENTRY
          </li>
          <li
            className="list-group-item clickable-item"
            onClick={() => {
              navigate("/user/documentdetail");
            }}
          >
            DETAIL GROUP
          </li>
          {/* <li
            className="list-group-item clickable-item"
            onClick={() => {
              navigate("/user/ledgerentry");
            }}
          >
            Ledger Entry
          </li> */}
        </ul>
      </div>
    </div>
  );
}
