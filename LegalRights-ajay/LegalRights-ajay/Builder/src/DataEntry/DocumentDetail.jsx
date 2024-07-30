import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Table,
  message,
  Modal,
  Select
} from "antd";
import axios from "../Service/axios";
const { Option } = Select;



export default function DocumentDetail() {
  const [dataSource, setDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const res = await axios.get("/data-entry/get-detail-group");
      console.log("detailed", res.data);
      setDataSource(res.data);
      setFilteredDataSource(res.data);
    } catch (error) {}
  };

  const handleSearch = (value) => {
    const filteredData = dataSource.filter(
      (item) =>
        item.document.toLowerCase().includes(value.toLowerCase()) ||
        item.partyDealer.toLowerCase().includes(value.toLowerCase()) ||
        item.propNo.toLowerCase().includes(value.toLowerCase()) ||
        item.Status.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  const onFinish = async (values) => {
    try {
      const res = await axios.post("/data-entry/create-detail-group", values);
      message.success("Data saved successfully");
      fetchdata();
      form.resetFields();
    } catch (error) {
      message.error("Failed to save data");
    }
  };

const handleInputChange = (id, field, value) => {
  const updatedData = dataSource.map((item) => {
    if (item._id === id) {
      return { ...item, [field]: value };
    }
    return item;
  });
  setDataSource(updatedData);
};

  const handleSubmit = async (id, field) => {
    const item = dataSource.find((data) => data._id === id);
    try {
      await axios.patch(`/data-entry/change-status-of-entry/${id}`, {
        [field]: item[field],
      });
      message.success(`${field} updated successfully`);
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
      message.error(`Failed to update ${field}`);
    }
  };

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          const res = await axios.patch(
            `/data-entry/${selectedRecord._id}`,
            values
          );
          message.success("Data updated successfully");
          fetchdata();
          form.resetFields();
          setIsModalOpen(false);
        } catch (error) {
          message.error("Failed to update data");
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const columns = [
    { title: "S.NO.", dataIndex: "serialNo", key: "serialNo" },
    { title: "DOCUMENT", dataIndex: "document", key: "document" },
    { title: "PROP.NO.", dataIndex: "propNo", key: "propNo" },
    { title: "PARTY/DEALER", dataIndex: "partyDealer", key: "partyDealer" },
    { title: "E-STAMP", dataIndex: "eStamp", key: "eStamp" },
    { title: "E-REG.FEE", dataIndex: "eRegFee", key: "eRegFee" },
    { title: "NGDRS NO.", dataIndex: "ngdrsNo", key: "ngdrsNo" },
    { title: "APP.DATE", dataIndex: "appDate", key: "appDate" },
    { title: "D.CHECK", dataIndex: "dCheck", key: "dCheck" },
    {
      title: "FINAL PRINT",
      dataIndex: "finalPrint",
      key: "finalPrint",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <div>{text}</div>
          <Select
            value={text}
            onChange={(value) => handleInputChange(record._id, "Status", value)}
            style={{ width: 120 }}
          >
            <Option value="pending">Pending</Option>
            <Option value="done">Done</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <div>
        <h1>Entry Status</h1>

        <div>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto auto",
              gap: "5px",
            }}
          >
            <Form.Item
              name="serialNo"
              label="S.NO."
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="document"
              label="DOCUMENT"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="propNo"
              label="PROP.NO."
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="partyDealer"
              label="PARTY/DEALER"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="eStamp"
              label="E-STAMP"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="eRegFee"
              label="E-REG.FEE"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ngdrsNo"
              label="NGDRS NO."
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="appDate"
              label="APP.DATE"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="dCheck"
              label="D.CHECK"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="finalPrint"
              label="FINAL PRINT"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

          <div style={{ marginBottom: 16 }}>
            <Input.Search
              placeholder="Search by Document, Party/Dealer, or Prop.No."
              onSearch={handleSearch}
              enterButton
            />
          </div>

          <Table
            columns={columns}
            dataSource={filteredDataSource}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>

      <Modal
        title="Update Form Details"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" initialValues={selectedRecord}>
          <Form.Item name="serialNo" label="S.NO." rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="document"
            label="DOCUMENT"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="propNo"
            label="PROP.NO."
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="partyDealer"
            label="PARTY/DEALER"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="eStamp" label="E-STAMP" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="eRegFee"
            label="E-REG.FEE"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ngdrsNo"
            label="NGDRS NO."
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="appDate"
            label="APP.DATE"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="dCheck" label="D.CHECK" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="finalPrint"
            label="FINAL PRINT"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {/* //status */}
          <Form.Item
            name="Status"
            label="Status"
            rules={[{ required: true }]}
            initialValue={selectedRecord?.Status}
          >
            <Select>
              <Option value="pending">Pending</Option>
              <Option value="done">Done</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>

          {/* //status */}
        </Form>
      </Modal>
    </>
  );
};

