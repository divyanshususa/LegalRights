import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Button, Table, message } from "antd";
import axios from "../Service/axios";
import moment from "moment";

const LedgerEntry = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const res = await axios.get(
        "/data-entry/get-ledger-entry"
      );
      console.log(res.data);
      setDataSource(res.data);
    } catch (error) {}
  };

  const onFinish = (values) => {
    const newEntry = {
      date: values.date.format("YYYY-MM-DD"),
      phoneNumber: values.phoneNumber,
      credit: values.credit,
      balance: values.balance,
      entries: entries.map((entry) => ({
        ...entry,
        debit: parseFloat(entry.debit),
        balance: parseFloat(entry.balance),
        sNo: parseInt(entry.sNo),
      })),
    };

    axios
      .post(
        "/data-entry/create-ledger-entry",
        newEntry
      )
      .then((response) => {
        message.success("Data saved successfully");
        //   setDataSource([...dataSource, newEntry]);
        form.resetFields();
        setEntries([]);
      })
      .catch((error) => {
        message.error("Failed to save data");
      });
  };

  const addEntry = () => {
    setEntries([
      ...entries,
      { description: "", debit: 0, balance: 0, sNo: entries.length + 1 },
    ]);
  };

  const handleEntryChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Credit", dataIndex: "credit", key: "credit" },
    { title: "Balance", dataIndex: "balance", key: "balance" },
    {
      title: "Entries",
      dataIndex: "entries",
      key: "entries",
      render: (entries) =>
        entries.map((entry) => (
          <div key={entry.sNo}>
            <span>
              {entry.description} - Debit: {entry.debit} - Balance:{" "}
              {entry.balance} - S.No: {entry.sNo}
            </span>
          </div>
        )),
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
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="credit" label="Credit" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="balance"
            label="Balance"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          {entries.map((entry, index) => (
            <div key={index}>
              <Form.Item label={`Entry ${index + 1} Description`} required>
                <Input
                  value={entry.description}
                  onChange={(e) =>
                    handleEntryChange(index, "description", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label={`Entry ${index + 1} Debit`} required>
                <Input
                  type="number"
                  value={entry.debit}
                  onChange={(e) =>
                    handleEntryChange(index, "debit", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label={`Entry ${index + 1} Balance`} required>
                <Input
                  type="number"
                  value={entry.balance}
                  onChange={(e) =>
                    handleEntryChange(index, "balance", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label={`Entry ${index + 1} S.No`} required>
                <Input
                  type="number"
                  value={entry.sNo}
                  onChange={(e) =>
                    handleEntryChange(index, "sNo", e.target.value)
                  }
                />
              </Form.Item>
            </div>
          ))}

          <Form.Item>
            <Button type="dashed" onClick={addEntry}>
              Add Entry
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <Table columns={columns} dataSource={dataSource} rowKey="date" />
      </div>
    </div>
  );
};

export default LedgerEntry;
