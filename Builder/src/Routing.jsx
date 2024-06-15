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




export default function Routing() {
  const [temp, settemp] = useState('0');
 const a = '1'
  function choosetemp(temp) {
    console.log("routing",temp);
    settemp(temp)
    
  }
  function tempreturn(temp) {
   return temp
 }


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/temp" element={<DocumentPreview />} />

          <Route path="/admin" element={<Admin />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/userhistory" element={<UserHistory />} />
          <Route
            path="/choosetemplate"
            element={<TemplateChoose choosetemp={choosetemp} />}
          />
          <Route path="/template" element={<PreviewTemplate />} />

          <Route path="/user" element={<MainLayout />}>
            <Route index element={<Home temp={temp} />} />
            <Route path="userhistory" element={<UserHistory />} />
            {/* <Route path="dailyLedger" element={<DailyLeger />} /> */}
            <Route path="dailyLedger" element={<Ledger />} />
            <Route path="documentdetail" element={<DocumentDetail />} />
            <Route path="ledgerentry" element={<LedgerEntry />} />
            <Route path="dataentry" element={<DataEntry />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
