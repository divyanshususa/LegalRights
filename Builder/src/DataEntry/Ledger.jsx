import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Button, Table, message } from 'antd';
import axios from 'axios';
import moment from 'moment';        

const Ledger = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
  
    useEffect(()=>{
        fetchledger()
    },[])

    const fetchledger= async()=>{
try {
    const res = await axios.get("http://localhost:5000/data-entry/get-entries")
    console.log(res.data)
    setDataSource(res.data)
    setFilteredDataSource(res.data)
} catch (error) {
    
}
    }
    const onFinish = (values) => {
      const newData = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        regDate: values.regDate.format('YYYY-MM-DD')
      };
      axios.post('http://localhost:5000/data-entry/create-entry', newData)
        .then(response => {
          message.success('Data saved successfully');
        //   setDataSource([...dataSource, newData]);
        fetchledger()
          form.resetFields();
        })
        .catch(error => {
          message.error('Failed to save data');
        });
    };
    const handleSearch = (value) => {
      const filteredData = dataSource.filter(item =>
        item.doc.toLowerCase().includes(value.toLowerCase()) ||
        item.slipNo.toLowerCase().includes(value.toLowerCase()) ||
        item.firstParty.toLowerCase().includes(value.toLowerCase()) ||
        item.secondParty.toLowerCase().includes(value.toLowerCase()) ||
        item.regNo.toLowerCase().includes(value.toLowerCase()) ||
        item.propDetail.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDataSource(filteredData);
    };
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Slip No', dataIndex: 'slipNo', key: 'slipNo' },
      { title: 'Doc', dataIndex: 'doc', key: 'doc' },
      { title: '1st Party', dataIndex: 'firstParty', key: 'firstParty' },
      { title: '2nd Party', dataIndex: 'secondParty', key: 'secondParty' },
      { title: 'Prop. Detail', dataIndex: 'propDetail', key: 'propDetail' },
      { title: 'Reg. No', dataIndex: 'regNo', key: 'regNo' },
      { title: 'B. No', dataIndex: 'bNo', key: 'bNo' },
      { title: 'Vol No', dataIndex: 'volNo', key: 'volNo' },
      { title: 'Page No', dataIndex: 'pageNo', key: 'pageNo' },
      { title: 'Reg. Date', dataIndex: 'regDate', key: 'regDate' }
    ];
  
    return (
      <div>
        <Form form={form} onFinish={onFinish} layout="vertical" style={{display:"grid", gridTemplateColumns: "auto auto auto auto auto ", gap:"5px"}}>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="slipNo" label="Slip No" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="doc" label="Doc" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="firstParty" label="1st Party" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="secondParty" label="2nd Party" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="propDetail" label="Prop. Detail" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="regNo" label="Reg. No" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="bNo" label="B. No" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="volNo" label="Vol No" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="pageNo" label="Page No" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="regDate" label="Reg. Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{marginTop:"30px"}}>Submit</Button>
          </Form.Item>
        </Form>

        <Input.Search
        placeholder="Search by Doc, Slip No, 1st Party, 2nd Party, Reg No, or Prop. Detail"
        onSearch={value => handleSearch(value)}
        style={{ width: 400, marginBottom: 16 }}
      />
        <Table columns={columns} dataSource={filteredDataSource} pagination={{ pageSize: 10 }} rowKey="slipNo" />
      </div>
    );
}

export default Ledger