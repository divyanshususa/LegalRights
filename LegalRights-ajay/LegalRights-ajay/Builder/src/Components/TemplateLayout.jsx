import React from "react";
import { Button } from "antd"; // Import Button component from Ant Design
import { useParams } from "react-router-dom";
import Header from "../TemplateHeader/Header";
import General from "../TemplateHeader/General";
import Party from "../TemplateHeader/Party";

const TemplateLayout = () => {
  const param = useParams();

  return (
    <div className="wrapper">
      <header className="main-header">{/* Logo and Navbar */}</header>
      <aside className="main-sidebar">
        <section className="sidebar">{/* Sidebar content */}</section>
      </aside>
      <div className="content-wrapper">
        <section className="content" id="skiptomaincontent">
          <Header />
          <div className="rowht">&nbsp;</div>
          <div className="back-to-top_popup">{/* Status indicators */}</div>
          {/* <General />
          <Party/> */}
        </section>
        {/* <Button type="primary" className="btn btn-primary">
          Data Submission
        </Button>
        <Button type="btn btn-danger" className="btn">
          cancel
        </Button> */}
      </div>
    </div>
  );
};

export default TemplateLayout;
