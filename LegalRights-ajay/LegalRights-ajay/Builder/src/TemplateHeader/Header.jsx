import React, { useState } from "react";
import { Button } from "antd"; // Import Button component from Ant Design
import Party from "./Party";
import General from "./General";
import Witness from "./Witness";
import PropertDetails from "./PropertDetails";

function Header() {
  const [clicked, setClicked] = useState("General");

  const handleClick = (section) => {
    setClicked(section);
  };

  return (
    <div className="Headers">
      <div className="row">
        <div className="col-md-12">
          <div className="btn-arrow">
            <Button
              type="primary"
              className="btn btn-arrow-right"
              onClick={() => handleClick("General")}
            >
              A - General Information
            </Button>

            <Button
              type="primary"
              className="btn btn-arrow-right"
              onClick={() => handleClick("Party")}
            >
              B - Party
            </Button>
            <Button
              type="primary"
              className="btn btn-arrow-right"
              onClick={() => handleClick("Witness")}
            >
              C - Witness
            </Button>
            <Button
              type="primary"
              className="btn btn-arrow-right"
              onClick={() => handleClick("PropertDetails")}
            >
              PropertDetails
            </Button>
          </div>
        </div>
      </div>
      {clicked === "General" && <General />}
      {clicked === "Party" && <Party />}
      {clicked === "Witness" && <Witness />}
      {clicked === "PropertDetails" && <PropertDetails />}
    </div>
  );
}

export default Header;
