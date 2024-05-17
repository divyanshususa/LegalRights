import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Space, Button, Modal, Form, InputNumber } from "antd"; // Import Modal, Form, and InputNumber

const { Search } = Input;

const UserHistory = () => {
  const [userRecords, setUserRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

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

  const editRecord = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Handle form submission here
        console.log("Updated values:", values);
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => editRecord(record)}>
          Edit
        </Button>
      ),
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

      <Modal
        title="Edit Record"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Colony Name" name="colonyName">
            <Input />
          </Form.Item>
          <Form.Item label="Location" name="location">
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input />
          </Form.Item>
          <Form.Item label="Property Type" name="propertyType">
            <Input />
          </Form.Item>
          <Form.Item label="Min Land Rate" name="minLandRate">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Cost of Construction" name="costOfConstruction">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Total Flat Area" name="totalFlatArea">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Number of Floors" name="numberOfFloors">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Is Lift Provided" name="isLiftProvided">
            <Input />
          </Form.Item>
          <Form.Item label="Year of Construction" name="yearOfConstruction">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Type of Colony" name="typeOfColony">
            <Input />
          </Form.Item>
          <Form.Item label="Building Status" name="buildingStatus">
            <Input />
          </Form.Item>
          <Form.Item label="Use Factor" name="useFactor">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserHistory;
