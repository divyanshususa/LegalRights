import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd"; // Import Button component from Ant Design
import { useParams } from "react-router-dom";
import { TemplteContext, TemplteProvider, useTemplate } from "../Hooks/TemplateContext";
import { templatePlaceholders } from "../Components/Utility/placeholders";
import axios from "axios";

export default function General() {

  const contextValue = useContext(TemplteContext);

  console.log("contextValue", contextValue);

  // return (
  //   <>
  //     <div className="row">
  //       <div className="col-lg-12">
  //         <div className="box box-primary">
  //           <div className="box-header with-border">
  //             <center>
  //               <h3 className="box-title headbolder">
  //                 A - General Information
  //               </h3>
  //             </center>
  //           </div>
  //           <div className="box-body">
  //             <div className="row">
  //               <div className="form-group">
  //                 <label htmlFor="language" className="col-sm-2 control-label">
  //                   Local Language For Data Entry
  //                 </label>
  //                 <div className="col-sm-10">
  //                   <input
  //                     type="text"
  //                     name="language"
  //                     className="form-control"
  //                     placeholder="English"
  //                     readOnly
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="row">
  //               <div className="form-group">
  //                 <label htmlFor="article" className="col-sm-2 control-label">
  //                   Article*
  //                 </label>
  //                 <div className="col-sm-10">
  //                   <select name="article" className="form-control">
  //                     <option value="">--Select--</option>
  //                     <option value="documentTitle">Document Title</option>
  //                     <option value="noOfPages">No. of Pages</option>
  //                     <option value="documentExecutionType">
  //                       Document Execution Type
  //                     </option>
  //                   </select>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="row">
  //               <div className="form-group">
  //                 <label
  //                   htmlFor="documentExecutionType"
  //                   className="col-sm-2 control-label"
  //                 >
  //                   Document Execution Type *
  //                 </label>
  //                 <div className="col-sm-10">
  //                   <input
  //                     type="text"
  //                     name="documentExecutionType"
  //                     className="form-control"
  //                     placeholder="Document Executed In India"
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="row">
  //               <div className="form-group">
  //                 <label
  //                   htmlFor="executionDate"
  //                   className="col-sm-2 control-label"
  //                 >
  //                   Date of Execution*
  //                 </label>
  //                 <div className="col-sm-10">
  //                   <input
  //                     type="text"
  //                     name="executionDate"
  //                     className="form-control"
  //                     placeholder="26-06-2024"
  //                     readOnly
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="row">
  //               <div className="form-group">
  //                 <label
  //                   htmlFor="advocateName"
  //                   className="col-sm-2 control-label"
  //                 >
  //                   Advocate Name [ENGLISH]
  //                 </label>
  //                 <div className="col-sm-10">
  //                   <input
  //                     type="text"
  //                     name="advocateName"
  //                     className="form-control"
  //                     placeholder="Advocate Name"
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="row">
  //               <div className="form-group">
  //                 <label
  //                   htmlFor="officeDetails"
  //                   className="col-sm-2 control-label"
  //                 >
  //                   Document Submission Office Details
  //                 </label>
  //                 <div className="col-sm-10">
  //                   <textarea
  //                     name="officeDetails"
  //                     className="form-control"
  //                     rows="3"
  //                     placeholder="Office Details"
  //                   ></textarea>
  //                   <p style={{ color: "red" }}>
  //                     Note: After Document submission citizen can not change
  //                     Office details.
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="row">
  //               <div className="form-group">
  //                 <label htmlFor="district" className="col-sm-2 control-label">
  //                   District *
  //                 </label>
  //                 <div className="col-sm-10">
  //                   <select name="district" className="form-control">
  //                     <option value="">--select--</option>
  //                     {/* Add district options here */}
  //                   </select>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="row">
  //               <div className="form-group">
  //                 <label
  //                   htmlFor="subDivision"
  //                   className="col-sm-2 control-label"
  //                 >
  //                   Sub-Division*
  //                 </label>
  //                 <div className="col-sm-10">
  //                   <select name="subDivision" className="form-control">
  //                     <option value="">--select--</option>
  //                     {/* Add sub-division options here */}
  //                   </select>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="row">
  //               <div className="form-group">
  //                 <label
  //                   htmlFor="subDivision"
  //                   className="col-sm-2 control-label"
  //                 >
  //                   Office Name*
  //                 </label>
  //                 <div className="col-sm-10">
  //                   <select name="subDivision" className="form-control">
  //                     <option value="">--select--</option>
  //                     {/* Add sub-division options here */}
  //                   </select>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         {/* Add more boxes for witness details and actions */}
  //       </div>
  //     </div>
  //   </>
  // );
  const [inputValues, setInputValues] = useState({});
  const [internet, setinternet] = useState(true);
  const { template, content, updateContent } = useTemplate();

  // const [selectedTemplate, setSelectedTemplate] = useState("");
  // const [content, setContent] = useState("");
  const getTemplate = async () => {
    try {
      const res = await axios.get(
        `/templates/templates/name/${template}`
      );
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
    getTemplate()
  }, [])


  console.log("TemplateContext", template);

  const handleInputChange = (placeholder) => (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [placeholder]: e.target.value,
    }));
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
      inputValues["Type of Property"],
    )
    
  }, [inputValues["Name of Colony"]])
  return <>
    {template &&
      templatePlaceholders[template]?.map((placeholder, index) => (
        <div className="col-md-3 mb-2" key={index}>
          <div className="form-group">
            <label className="form-label font-weight-bold">
              {placeholder}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={placeholder}
              value={inputValues[placeholder] || ""}
              onChange={handleInputChange(placeholder)}
            />
          </div>
        </div>

      ))}
    <Button
      type="primary"
      className="template-choose-button mb-3"
      onClick={handleReplaceContent}
      disabled={!template}
    >
      Replace Content
    </Button> </>;
}
