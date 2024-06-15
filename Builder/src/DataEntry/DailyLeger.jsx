import React, { useState } from "react";
import { Table, Input, Button,Form ,DatePicker} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import axios from 'axios';

const { TextArea } = Input;

const DataEntryTable = () => {
  // const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    const newData = {
      key: count,
      dateSlipNo: "",
      doc: "",
      firstParty1: "",
      firstParty2: "",
      secondParty: "",
      propDetail: "",
      regNo: "",
      bNo: "",
      volNo: "",
      pageNo: "",
      regDate: "",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);

  const onFinish = (values) => {
    const newData = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      regDate: values.regDate.format('YYYY-MM-DD')
    };
    axios.post('/api/entry', newData)
      .then(response => {
        message.success('Data saved successfully');
        setDataSource([...dataSource, newData]);
        form.resetFields();
      })
      .catch(error => {
        message.error('Failed to save data');
      });
  };
  
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleInputChange = (e, key, column) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, [column]: e.target.value });
      setDataSource(newData);
    }
  };

  const columns = [
    {
      title: "DATE / SLIP NO",
      dataIndex: "dateSlipNo",
      key: "dateSlipNo",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e, record.key, "dateSlipNo")}
        />
      ),
    },
    {
      title: "DOC",
      dataIndex: "doc",
      key: "doc",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e, record.key, "doc")}
        />
      ),
    },
    {
      title: "1ST PARTY",
      dataIndex: "firstParty1",
      key: "firstParty1",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e, record.key, "firstParty1")}
        />
      ),
    },
    {
      title: "1ST PARTY",
      dataIndex: "firstParty2",
      key: "firstParty2",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e, record.key, "firstParty2")}
        />
      ),
    },
    {
      title: "2ND PARTY",
      dataIndex: "secondParty",
      key: "secondParty",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e, record.key, "secondParty")}
        />
      ),
    },
    {
      title: "PROP. DETAIL",
      dataIndex: "propDetail",
      key: "propDetail",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e, record.key, "propDetail")}
        />
      ),
    },
    {
      title: "REG. NO",
      dataIndex: "regNo",
      key: "regNo",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e, record.key, "regNo")}
        />
      ),
    },
    {
      title: "B. NO",
      dataIndex: "bNo",
      key: "bNo",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e, record.key, "bNo")}
        />
      ),
    },
    {
      title: "VOL NO",
      dataIndex: "volNo",
      key: "volNo",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e, record.key, "volNo")}
        />
      ),
    },
    {
      title: "PAGE NO",
      dataIndex: "pageNo",
      key: "pageNo",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e, record.key, "pageNo")}
        />
      ),
    },
    {
      title: "REG. DATE",
      dataIndex: "regDate",
      key: "regDate",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e, record.key, "regDate")}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ];

  return (
    <div className="data-entry-table">

<Form form={form} layout="vertical" onFinish={onFinish} style={{display:"grid", gridTemplateColumns: "auto auto auto auto auto ", gap:"5px"}}>
      <Form.Item name="date" label="DATE" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="slipNo" label="SLIP NO" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="doc" label="DOC" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="firstParty" label="1ST PARTY" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="secondParty" label="2ND PARTY" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="propDetail" label="PROP. DETAIL" rules={[{ required: true }]}>
        <Input rows={4} />
      </Form.Item>
      <Form.Item name="regNo" label="REG. NO" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="bNo" label="B. NO" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="volNo" label="VOL NO" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="pageNo" label="PAGE NO" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="regDate" label="REG. DATE" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{marginTop:"30px"}}>
          Submit
        </Button>
      </Form.Item>
    </Form>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Add a row
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default DataEntryTable;
