import React, { useState } from "react";
import Home from "./Components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Signin from "./Components/Signin";
import MainLayout from "./Components/MainLayout";
import PreviewTemplate from "./Components/PreviewTemplate";
import UserHistory from "./Components/UserHistory";
import TemplateChoose from "./Components/TemplateChoose";
import Admin from "./Components/Admin";
import DocumentPreview from "./Components/DocumentPreview";
import DocumentEditor from "./Components/DocumentPreview";
import DataEntry from "./Components/DataEntry";
import DailyLeger from "./DataEntry/DailyLeger";
import DocumentDetail from "./DataEntry/DocumentDetail";
import PropertyDetails from "./DataEntry/PropertyDetails";
import Ledger from "./DataEntry/Ledger";
import LedgerEntry from "./DataEntry/LedgerEntry";
import TemplateAdd from "./Components/TemplateAdd";
import Witness from "./Components/TemplateLayout";
import Party1 from "./TemplateHeader/Party1";
import General from "./TemplateHeader/General";
import { TemplteContext, TemplteProvider } from "./Hooks/TemplateContext";
import FeePayment from "./TemplateHeader/FeePayment";

export default function Routing() {
  const a = "1";

  const [temp, settemp] = useState("0");

  function choosetemp(temp) {
    console.log("routing 31", temp);
    settemp(temp);
    setSelectedTemplate(temp);
  }

  function tempreturn(temp) {
    return temp;
  }

  function updatetemp(temp) {
    setSelectedTemplate(temp);
  }

  const [SelectedTemplate, setSelectedTemplate] = useState(temp);
  const [template, setTemplate] = useState();
  const [content, setContent] = useState("");

  console.log("SelectedTemplate()any ", SelectedTemplate);

  const updateTemplate = (updateTemplate) => {
    console.log("updateTemplate", updateTemplate);
    setSelectedTemplate(SelectedTemplate);
    setTemplate(updateTemplate);
  };

  const updateContent = (details) => {
    setContent(details);
  };

  return (
    <div>
      <TemplteProvider
        value={{ template, updateTemplate, content, updateContent }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/temp" element={<DocumentPreview />} />
            <Route path="/tempadd" element={<TemplateAdd />} />

            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/user/part/partys" element={<Party />} /> */}
            <Route path="/userhistory" element={<UserHistory />} />
            <Route path="/choosetemplate" element={<TemplateChoose />} />
            <Route path="/template" element={<PreviewTemplate />} />

            <Route path="/user" element={<MainLayout />}>
              <Route index element={<Home temp={temp} />} />
              <Route path="userhistory" element={<UserHistory />} />
              <Route path="admin" element={<Admin />} />
              {/* <Route path="dailyLedger" element={<DailyLeger />} /> */}
              <Route path="dailyLedger" element={<Ledger />} />
              <Route path="documentdetail" element={<DocumentDetail />} />
              <Route path="ledgerentry" element={<LedgerEntry />} />
              <Route path="witness" element={<Witness />} />
              <Route path="dataentry" element={<DataEntry />} />
              <Route path="party1" element={<Party1 />} />
              <Route path="feepayment" element={<FeePayment />} />
              <Route path="general" element={<General />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TemplteProvider>
    </div>
  );
}
