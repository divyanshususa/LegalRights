import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd"; // Import Button component from Ant Design
import { useParams } from "react-router-dom";
import {
  TemplteContext,
  TemplteProvider,
  useTemplate,
} from "../Hooks/TemplateContext";
import { templatePlaceholders } from "../Components/Utility/placeholders";
import axios from "axios";

export default function General() {
  const contextValue = useContext(TemplteContext);

  console.log("contextValue", contextValue);

  const [inputValues, setInputValues] = useState({});
  const [internet, setinternet] = useState(true);
  const { template, content, updateContent } = useTemplate();

  const getTemplate = async () => {
    try {
      const res = await axios.get(`/templates/templates/name/${template}`);
      updateContent(res?.data?.template?.descriptions);
      console.log("Template fetched", res.data.template);
    } catch (error) {
      console.error("Failed to fetch template:", error);
      if (error) {
        setinternet(false);
      }
    }
  };
  useEffect(() => {
    getTemplate();
  }, []);

  console.log("TemplateContext", template);

  const handleInputChange = (placeholder) => (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [placeholder]: e.target.value,
    }));
  };

  const calculationFormulas = {
    a: {
      "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.": 774000,
      "Cost of Construction notified by Government in Sq.Mtrs.": 245520,
      "useFactor": 1,
      
    },
    b: {
      "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.": 245520,
      "Cost of Construction notified by Government in Sq.Mtrs.": 245520,
      useFactor: 1,
    },
    c: {
      "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.": 159840,
      "Cost of Construction notified by Government in Sq.Mtrs.": 245520,
      useFactor: 1,
    },
    d: {
      "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.": 127680,
      "Cost of Construction notified by Government in Sq.Mtrs.": 245520,
      useFactor: 1,
    },
    e: {
      "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.": 70080,
      "Cost of Construction notified by Government in Sq.Mtrs.": 245520,
      useFactor: 1,
    },
    f: {
      "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.": 56640,
      "Cost of Construction notified by Government in Sq.Mtrs.": 7500,
      useFactor: 1,
    },
    g: {
      "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.": 46200,
      "Cost of Construction notified by Government in Sq.Mtrs.": 8000,
      useFactor: 1,
    },
    h: {
      "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.": 23280,
      "Cost of Construction notified by Government in Sq.Mtrs.": 8500,
      useFactor: 1,
    },
  };

  const handleSelectChange = (placeholder) => (e) => {
    const selectedValue = e.target.value;
    setInputValues((prevValues) => ({
      ...prevValues,
      [placeholder]: selectedValue,
    }));

    // Update corresponding fields based on selected value
    if (placeholder === "Category of Colony") {
      const formula = calculationFormulas[selectedValue];
      if (formula) {
        setInputValues((prevValues) => ({
          ...prevValues,
          "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.": formula[
            "Minimum Rate of Land Notified by Govt. per Sq.Mtrs."
          ],
          "Cost of Construction notified by Government in Sq.Mtrs.": formula[
            "Cost of Construction notified by Government in Sq.Mtrs."
          ],
          useFactor: formula.useFactor,
          "Land Share Under Transfer in sq mtrs": formula[
            "Minimum Rate of Land Notified by Govt. per Sq.Mtrs."
          ] *
            formula["Cost of Construction notified by Government in Sq.Mtrs."] *
            formula.useFactor,
        }));
      }
    }
  };

  const handleReplaceContent = () => {
    let updatedContent = content;
    const placeholders = templatePlaceholders[template] || [];
    for (const placeholder of placeholders) {
      const value = inputValues[placeholder] || placeholder;
      const regex = new RegExp(`\\$\\{\\*\\*${placeholder}\\*\\*\\}`, "g");
      updatedContent = updatedContent.replace(regex, value);
    }
    updateContent(updatedContent);
  };

  useEffect(() => {
    console.log(
      inputValues["Name of Colony"],
      inputValues["Category of Colony"],
      inputValues["Type of Property"]
    );
  }, [inputValues["Name of Colony"]]);

 return (
   <>
     <div className="row">
       {templatePlaceholders[template]?.map((placeholder, index) => (
         <div className="col-md-6 mb-2" key={index}>
           <div className="form-group">
             <strong className="font-weight-bold">{placeholder}</strong>
             {placeholder === "Category" ? (
            <select
  className="form-control"
  value={inputValues["Category"] || ""}
  onChange={(e) => handleSelectChange("Category")(e)}
>
  <option value="">Select an option</option>
  <option value="Residential">Residential</option>
  <option value="Commercial">Commercial</option>
  <option value="Industry">Industry</option>
</select>
             ) : placeholder === "Category of Colony" ? (
               <select
                 className="form-control"
                 value={inputValues[placeholder] || ""}
                 onChange={handleSelectChange(placeholder)}
               >
                 <option value="">Select an option</option>
                 <option value="a">A</option>
                 <option value="b">B</option>
                 <option value="c">C</option>
                 <option value="d">D</option>
                 <option value="e">E</option>
                 <option value="f">F</option>
                 <option value="g">G</option>
                 <option value="h">H</option>
               </select>
             ) : (
               <input
                 type="text"
                 className="form-control"
                 placeholder={placeholder}
                 value={inputValues[placeholder] || ""}
                 onChange={handleInputChange(placeholder)}
               />
             )}
           </div>
         </div>
       ))}
       {inputValues["Category of Colony"] && (
         <div className="col-md-6 mb-2">
           <div className="form-group">
             <strong className="font-weight-bold">Cost of Land</strong>
             <input
               type="text"
               className="form-control"
               value={
                 (inputValues[
                   "Minimum Rate of Land Notified by Govt. per Sq.Mtrs."
                 ] || 0) *
                 (inputValues[
                   "Cost of Construction notified by Government in Sq.Mtrs."
                 ] || 0) *
                 (inputValues.useFactor || 0)
               }
               readOnly
             />
           </div>
         </div>
       )}
     </div>
     <Button
       type="primary"
       className="template-choose-button mb-3"
       onClick={handleReplaceContent}
       disabled={!template}
     >
       Replace Content
     </Button>{" "}
   </>
 );
}