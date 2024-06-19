import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Space } from "antd";
import { useParams } from "react-router-dom"; // Import useParams for extracting the post ID from URL
import TemplateTable from "./TemplateTable";

const { Search } = Input;

const UserHistory = () => {
  const [userRecords, setUserRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserRecords = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `http://localhost:5000/api/getpostbyuserid/${userId._id}`
        );
        const posts = response.data.posts;
        console.log("filteredRecords hostiory",filteredRecords,"post",posts)
        // Ensure posts is an array before setting state
        setUserRecords(Array.isArray(posts) ? posts : [posts]);
        setFilteredRecords(Array.isArray(posts) ? posts : [posts]);
      } catch (error) {
        console.error("Error fetching user records:", error);
      }
    };

    fetchUserRecords();
  }, [id]);

  const handleSearch = (value) => {
    const filtered = userRecords.filter((record) =>
      Object.values(record).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredRecords(filtered);
  };

  return (
    <div>
      <h1>User History</h1>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search records"
          onSearch={handleSearch}
          enterButton
        />
      </Space>
      <TemplateTable data={filteredRecords} />
    </div>
  );
};

export default UserHistory;
