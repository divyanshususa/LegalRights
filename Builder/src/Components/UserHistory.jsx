import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table, Input, Space, Button, Modal, Form, InputNumber } from "antd";
import { useParams } from "react-router-dom"; // Import useParams for extracting the post ID from URL
import TemplateTable from "./TemplateTable";

const { Search } = Input;

const UserHistory = () => {
  const [userRecords, setUserRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [postInfo, setPostInfo] = useState(null);

  const { id } = useParams();
  // const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchUserRecords = async () => {
      try {
        const userId = "6631de17bd1c9cb279803839"; // Replace with actual user ID
        const response = await axios.get(
          `http://localhost:5000/templates/getalltemplates`
        );

        // console.log("this", response.data.templates)
        // setUserRecords(response.data.templates);
        setFilteredRecords(response.data.templates);
      } catch (error) {
        console.error("Error fetching user records:", error);
      }
    };

    fetchUserRecords();
  }, []);

  // useEffect(() => {
  //   if (id) {
  //     fetch(`http://localhost:5000/api/posts/664b99e1e53750d554ee00c1`).then((response) => {
  //       response.json().then((postInfo) => {
  //         setPostInfo(postInfo);
  //       });
  //     });
  //   }
  // }, [id]);

  const handleSearch = (value) => {
    const filtered = userRecords.filter((record) =>
      Object.values(record).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredRecords(filtered);
  };

  // const editRecord = (record) => {
  //   setSelectedRecord(record);
  //   setIsModalVisible(true);
  //   form.setFieldsValue(record);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  // const handleOk = () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       // Handle form submission here
  //       console.log("Updated values:", values);
  //       setIsModalVisible(false);
  //     })
  //     .catch((error) => {
  //       console.error("Validation failed:", error);
  //     });
  // };

  // const columns = [
  //   {
  //     title: "Colony Name",
  //     dataIndex: "colonyName",
  //     key: "colonyName",
  //   },
  //   {
  //     title: "Location",
  //     dataIndex: "location",
  //     key: "location",
  //   },
  //   {
  //     title: "Category",
  //     dataIndex: "category",
  //     key: "category",
  //   },
  //   {
  //     title: "Property Type",
  //     dataIndex: "propertyType",
  //     key: "propertyType",
  //   },
  //   {
  //     title: "Min Land Rate",
  //     dataIndex: "minLandRate",
  //     key: "minLandRate",
  //   },
  //   {
  //     title: "Cost of Construction",
  //     dataIndex: "costOfConstruction",
  //     key: "costOfConstruction",
  //   },
  //   {
  //     title: "Total Flat Area",
  //     dataIndex: "totalFlatArea",
  //     key: "totalFlatArea",
  //     sorter: (a, b) => a.totalFlatArea - b.totalFlatArea,
  //   },
  //   {
  //     title: "Number of Floors",
  //     dataIndex: "numberOfFloors",
  //     key: "numberOfFloors",
  //     sorter: (a, b) => a.numberOfFloors - b.numberOfFloors,
  //   },
  //   {
  //     title: "Is Lift Provided",
  //     dataIndex: "isLiftProvided",
  //     key: "isLiftProvided",
  //     render: (isLiftProvided) => (isLiftProvided ? "Yes" : "No"),
  //   },
  //   {
  //     title: "Year of Construction",
  //     dataIndex: "yearOfConstruction",
  //     key: "yearOfConstruction",
  //   },
  //   {
  //     title: "Type of Colony",
  //     dataIndex: "typeOfColony",
  //     key: "typeOfColony",
  //   },
  //   {
  //     title: "Building Status",
  //     dataIndex: "buildingStatus",
  //     key: "buildingStatus",
  //   },
  //   {
  //     title: "Use Factor",
  //     dataIndex: "useFactor",
  //     key: "useFactor",
  //     sorter: (a, b) => a.useFactor - b.useFactor,
  //   },
  //   {
  //     title: "Preview",
  //     key: "preview",
  //     render: (text, record) => (
  //       <Button
  //         type="primary"
  //         onClick={() => {
  //           if (record.id) {
  //             fetch(`http://localhost:5000/api/posts/${record.id}`).then(
  //               (response) => {
  //                 response.json().then((postInfo) => {
  //                   setPostInfo(postInfo);
  //                   setIsModalVisible(true);
  //                 });
  //               }
  //             );
  //           }
  //         }}
  //       >
  //         Preview
  //       </Button>
  //     ),
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (text, record) => (
  //       <Button type="primary" onClick={() => editRecord(record)}>
  //         Edit
  //       </Button>
  //     ),
  //   },
  // ];

  return (
    <div>
      <h1>User History</h1>
      {/* <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search records"
          onSearch={handleSearch}
          enterButton
        />
      </Space> */}


      {/* <Table columns={columns} dataSource={filteredRecords} />

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

      {postInfo && (
        <Modal
          title="Post Preview"
          visible={true}
          onCancel={() => setPostInfo(null)}
          footer={null}
        >
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          />
        </Modal>
      )} */}

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
