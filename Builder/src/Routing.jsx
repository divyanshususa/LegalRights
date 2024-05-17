import React from "react";
import Home from "./Components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Signin from "./Components/Signin";
import MainLayout from "./Components/MainLayout";
import PreviewTemplate from "./Components/PreviewTemplate";
import UserHistory from "./Components/UserHistory";
import TemplateChoose from "./Components/TemplateChoose";
import Admin from "./Components/Admin";
import DocumentPreview from "./Components/PreviewTemplate";

export default function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/userhistory" element={<UserHistory />} />
          <Route path="/choosetemplate" element={<TemplateChoose />} />
          <Route path="/template" element={<PreviewTemplate />} />
          {/* <Route
            path="/fronttemplate"
            element={
              <DocumentPreview filePath="D:\Builder\Builder\src\File\SaleDeedFinalFlat.docx" />
            }
          /> */}

          <Route path="/user" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="userhistory" element={<UserHistory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
