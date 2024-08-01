import React, { useState } from "react";
import { Button } from "antd"; // Import Button component from Ant Design
import Party1 from "./Party1";
import Amount from "./FeePayment";
import General from "./General";
import Witness from "./Witness";
import PropertDetails from "./PropertDetails";
import { SearchOutlined } from "@ant-design/icons";
import { Divider, Flex, Radio, Space, Tooltip } from "antd";

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
              onClick={() => handleClick("Party1")}
            >
              B - Party
            </Button>

            <Button
              type="primary"
              className="btn btn-arrow-right"
              onClick={() => handleClick("Amount")}
            >
              Fee Payment
            </Button>
            <Button
              type="primary"
              className="btn btn-arrow-right"
              onClick={() => handleClick("Witness")}
            >
              D - Witness
            </Button>
            <Button
              type="primary"
              className="btn btn-arrow-right"
              onClick={() => handleClick("PropertDetails")}
            >
              E - PropertDetails
            </Button>
            <Button
              type="primary"
              className="btn btn-arrow-right"
              onClick={() => handleClick("PropertDetails")}
            >
              E - Seller
            </Button>
            <Button
              type="primary"
              className="btn btn-arrow-right"
              onClick={() => handleClick("PropertDetails")}
            >
              E - Buyer
            </Button>
          </div>
        </div>
      </div>
      {clicked === "General" && <General />}
      {clicked === "Party1" && <Party1 />}
      {clicked === "Amount" && <Amount />}
      {clicked === "Witness" && <Witness />}
      {clicked === "PropertDetails" && <PropertDetails />}
    </div>
  );
}

export default Header;
