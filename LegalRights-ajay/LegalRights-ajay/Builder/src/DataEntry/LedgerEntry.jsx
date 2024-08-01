import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Button, Table, message } from "antd";
import axios from "../Service/axios";
import moment from "moment";

const LedgerEntry = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const res = await axios.get("/data-entry/get-ledger-entry");
      console.log(res.data);
      setDataSource(res.data);
    } catch (error) {}
  };

  const onFinish = (values) => {
    const newEntry = {
      Sno_Credit: values.snoCredit,
      date_Credit: values.dateCredit.format("YYYY-MM-DD"),
      phoneNumber_Credit: values.phoneNumberCredit,
      credit_Credit: values.creditCredit,
      balance_Credit: values.balanceCredit,
      date_debit: values.dateDebit.format("YYYY-MM-DD"),
      debit_debit: values.debitDebit,
      balance_debit: values.balanceDebit,
      Sno_debit: values.snoDebit,
    };

    axios
      .post("/data-entry/create-ledger-entry", newEntry)
      .then((response) => {
        message.success("Data saved successfully");
        fetchdata();
        form.resetFields();
      })
      .catch((error) => {
        message.error("Failed to save data");
      });
  };

  const addEntry = () => {
    form.setFieldsValue({
      entries: [
        ...form.getFieldsValue().entries,
        {
          description: "",
          debit: 0,
          balance: 0,
          sNo: form.getFieldsValue().entries.length + 1,
        },
      ],
    });
  };

  const handleEntryChange = (index, field, value) => {
    form.setFieldsValue({
      entries: form
        .getFieldsValue()
        .entries.map((entry, i) =>
          i === index ? { ...entry, [field]: value } : entry
        ),
    });
  };

  const columns = [
    {
      title: "Sno Credit",
      dataIndex: "Sno_Credit",
      key: "Sno_Credit",
    },
    {
      title: "Sno Debit",
      dataIndex: "Sno_debit",
      key: "Sno_debit",
    },
    {
      title: "Balance Credit",
      dataIndex: "balance_Credit",
      key: "balance_Credit",
    },
    {
      title: "Balance Debit",
      dataIndex: "balance_debit",
      key: "balance_debit",
    },
    {
      title: "Credit Credit",
      dataIndex: "credit_Credit",
      key: "credit_Credit",
    },
    {
      title: "Date Credit",
      dataIndex: "date_Credit",
      key: "date_Credit",
    },
    {
      title: "Date Debit",
      dataIndex: "date_debit",
      key: "date_debit",
    },
    {
      title: "Debit Debit",
      dataIndex: "debit_debit",
      key: "debit_debit",
    },
    {
      title: "Phone Number Credit",
      dataIndex: "phoneNumber_Credit",
      key: "phoneNumber_Credit",
    },
  ];

  return (
    <div>
      <div>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto  ",
            gap: "5px",
          }}
        >
          <Form.Item
            name="snoCredit"
            label="Sno Credit"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="dateCredit"
            label="Date Credit"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="phoneNumberCredit"
            label="Phone Number Credit"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="creditCredit"
            label="Credit Credit"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="balanceCredit"
            label="Balance Credit"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="dateDebit"
            label="Date Debit"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="debitDebit"
            label="Debit Debit"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="balanceDebit"
            label="Balance Debit"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="snoDebit"
            label="Sno Debit"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default LedgerEntry;