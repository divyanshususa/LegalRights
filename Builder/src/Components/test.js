import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Space } from "antd";

const { Search } = Input;

const UserHistory = () => {
  const [userRecords, setUserRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    const fetchUserRecords = async () => {
      try {
        const userId = "6631de17bd1c9cb279803839"; // Replace with actual user ID
        const response = await axios.get(
          `http://localhost:5000/api/sale-main-documents?id=${userId}`
        );
        setUserRecords(response.data.data);
        setFilteredRecords(response.data.data);
      } catch (error) {
        console.error("Error fetching user records:", error);
      }
    };

    fetchUserRecords();
  }, []);

  const handleSearch = (value) => {
    const filtered = userRecords.filter((record) =>
      Object.values(record).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredRecords(filtered);
  };

  const columns = [
    {
      title: "Colony Name",
      dataIndex: "colonyName",
      key: "colonyName",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Property Type",
      dataIndex: "propertyType",
      key: "propertyType",
    },
    {
      title: "Min Land Rate",
      dataIndex: "minLandRate",
      key: "minLandRate",
    },
    {
      title: "Cost of Construction",
      dataIndex: "costOfConstruction",
      key: "costOfConstruction",
    },

    {
      title: "Total Flat Area",
      dataIndex: "totalFlatArea",
      key: "totalFlatArea",
      sorter: (a, b) => a.totalFlatArea - b.totalFlatArea,
    },
    {
      title: "Number of Floors",
      dataIndex: "numberOfFloors",
      key: "numberOfFloors",
      sorter: (a, b) => a.numberOfFloors - b.numberOfFloors,
    },
    {
      title: "Is Lift Provided",
      dataIndex: "isLiftProvided",
      key: "isLiftProvided",
      render: (isLiftProvided) => (isLiftProvided ? "Yes" : "No"),
    },
    {
      title: "Year of Construction",
      dataIndex: "yearOfConstruction",
      key: "yearOfConstruction",
    },
    {
      title: "Type of Colony",
      dataIndex: "typeOfColony",
      key: "typeOfColony",
    },
    {
      title: "Building Status",
      dataIndex: "buildingStatus",
      key: "buildingStatus",
    },
    {
      title: "Use Factor",
      dataIndex: "useFactor",
      key: "useFactor",
      sorter: (a, b) => a.useFactor - b.useFactor,
    },
  ];

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
      <Table columns={columns} dataSource={filteredRecords} />
    </div>
  );
};

export default UserHistory;
