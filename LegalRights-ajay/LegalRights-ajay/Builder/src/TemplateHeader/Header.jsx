import React, { useState } from "react";
import { Button } from "antd"; // Import Button component from Ant Design
import Party1 from "./Party1";
import Amount from "./FeePayment";
import General from "./General";
import Witness from "./Witness";
import PropertDetails from "./PropertDetails";
import { SearchOutlined } from "@ant-design/icons";
import { Divider, Flex, Radio, Space, Tooltip } from "antd";
import {
  TemplteContext,
  TemplteProvider,
  useTemplate,
} from "../Hooks/TemplateContext";
import Buyer from "./Buyer";
import Seller from "./Seller";
import Property from "./Property";

function Header() {
  const [clicked, setClicked] = useState("General");

  const handleClick = (section) => {
    setClicked(section);
  };
  const { template, content, updateContent } = useTemplate();

   return (
     <div className="Headers">
       <div className="row">
         <div className="col-md-12">
           {template}
           <div className="btn-arrow">
             {template == "Sale Deed" ? (
               <>
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
               </>
             ) : (
               <>
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
                   onClick={() => handleClick("Seller")}
                 >
                   B - Seller
                 </Button>
                 <Button
                   type="primary"
                   className="btn btn-arrow-right"
                   onClick={() => handleClick("Buyer")}
                 >
                   C - Buyer
                 </Button>
                 <Button
                   type="primary"
                   className="btn btn-arrow-right"
                   onClick={() => handleClick("Property")}
                 >
                   D - Property
                 </Button>
               </>
             )}
           </div>
         </div>
       </div>
       {clicked === "General" && <General />}
       {clicked === "Party1" && <Party1 />}
       {clicked === "Amount" && <Amount />}
       {clicked === "Witness" && <Witness />}
       {clicked === "PropertDetails" && <PropertDetails />}
       {clicked === "Buyer" && <Buyer />}
       {clicked === "Seller" && <Seller />}
       {clicked === "Property" && <Property />}
     </div>
   );
}

export default Header;
