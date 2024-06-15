import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Button, Table, message } from 'antd';
import axios from 'axios';
import moment from 'moment';


export default function DocumentDetail() {

  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  
  useEffect(()=>{
    fetchdata()
},[])

const fetchdata= async()=>{
try {
const res = await axios.get("http://localhost:5000/data-entry/get-detail-group")
console.log(res.data)
setDataSource(res.data)
setFilteredDataSource(res.data);
} catch (error) {

}
}

const handleSearch = (value) => {
  const filteredData = dataSource.filter(item =>
    item.document.toLowerCase().includes(value.toLowerCase()) ||
    item.partyDealer.toLowerCase().includes(value.toLowerCase()) ||
    item.propNo.toLowerCase().includes(value.toLowerCase())
  );
  setFilteredDataSource(filteredData);
};


const onFinish = (values) => {
  const newData = {
    ...values,
    appDate: values.appDate.format('YYYY-MM-DD')
  };
  axios.post('http://localhost:5000/data-entry/create-detail-group', newData)
    .then(response => {
      message.success('Data saved successfully');
      // setDataSource([...dataSource, newData]);
      fetchdata()
      form.resetFields();
    })
    .catch(error => {
      message.error('Failed to save data');
    });
};


const handleInputChange = (id, field, value) => {
  const updatedData = dataSource.map(item => {
    if (item._id === id) {
      return { ...item, [field]: value };
    }
    return item;
  });
  setDataSource(updatedData);
};

const handleSubmit = async (id, field) => {
  const item = dataSource.find(data => data._id === id);
  try {
    await axios.patch(`http://localhost:5000/data-entry/update-status/${id}`, {
      [field]: item[field]
    });
    message.success(`${field} updated successfully`);
  } catch (error) {
    console.error(`Failed to update ${field}:`, error);
    message.error(`Failed to update ${field}`);
  }
};
const columns = [
  { title: 'S.NO.', dataIndex: 'serialNo', key: 'serialNo' },
  { title: 'DOCUMENT', dataIndex: 'document', key: 'document' },
  { title: 'PROP.NO.', dataIndex: 'propNo', key: 'propNo' },
  { title: 'PARTY/DEALER', dataIndex: 'partyDealer', key: 'partyDealer' },
  {
    title: 'E-STAMP', dataIndex: 'eStamp', key: 'eStamp',
    render: (text, record) => (
      <div style={{ display: "flex", gap: "20px" }}>
        <div>{text}</div>
        <div>
          <Input
            value={record.eStamp}
            onChange={e => handleInputChange(record._id, 'eStamp', e.target.value)}
          />
          <Button onClick={() => handleSubmit(record._id, 'eStamp')}>Submit</Button>
        </div>
      </div>
    ),
  },
  {
    title: 'E-REG.FEE', dataIndex: 'eRegFee', key: 'eRegFee',
    render: (text, record) => (
      <div style={{ display: "flex", gap: "20px" }}>
        <div>{text}</div>
        <div >
          <Input
            value={record.eRegFee}
            onChange={e => handleInputChange(record._id, 'eRegFee', e.target.value)}
          />
          <Button onClick={() => handleSubmit(record._id, 'eRegFee')}>Submit</Button>
        </div>
      </div>
    ),
  },
  { title: 'NGDRS NO.', dataIndex: 'ngdrsNo', key: 'ngdrsNo' },
  {
    title: 'APP.DATE', dataIndex: 'appDate', key: 'appDate',
    render: (text) => moment(text).format('YYYY-MM-DD')
  },
  {
    title: 'D.CHECK', dataIndex: 'dCheck', key: 'dCheck',
    render: (text, record) => (
      <div style={{ display: "flex", gap: "20px" }}>
        <div>{text}</div>
        <div>
          <Input
            value={record.dCheck}
            onChange={e => handleInputChange(record._id, 'dCheck', e.target.value)}
          />
          <Button onClick={() => handleSubmit(record._id, 'dCheck')}>Submit</Button>
        </div>
      </div>
    ),
  },
  {
    title: 'FINAL PRINT', dataIndex: 'finalPrint', key: 'finalPrint',
    render: (text, record) => (
      <div style={{ display: "flex", gap: "20px" }}>
        <div>{text}</div>
        <div>
          <Input
            value={record.finalPrint}
            onChange={e => handleInputChange(record._id, 'finalPrint', e.target.value)}
          />
          <Button onClick={() => handleSubmit(record._id, 'finalPrint')}>Submit</Button>
        </div>
      </div>
    ),
  },
];


// const columns = [
//   { title: 'S.NO.', dataIndex: 'serialNo', key: 'serialNo' },
//   { title: 'DOCUMENT', dataIndex: 'document', key: 'document' },
//   { title: 'PROP.NO.', dataIndex: 'propNo', key: 'propNo' },
//   { title: 'PARTY/DEALER', dataIndex: 'partyDealer', key: 'partyDealer' },
//   {
//     title: 'E-STAMP', dataIndex: 'eStamp', key: 'eStamp',
//     render: (text, record) => (
//       <div style={{display:"flex" , gap:"20px"}}>
//         <div>{text}</div>
//         <div>
//         <Input
//           value={record.eStamp}
//           onChange={e => handleInputChange(record._id, 'eStamp', e.target.value)}
//         />
//         <Button onClick={() => handleSubmit(record._id, 'eStamp')}>Submit</Button>
//       </div>
//       </div>
//     ),
//   },
//   {
//     title: 'E-REG.FEE', dataIndex: 'eRegFee', key: 'eRegFee',
//     render: (text, record) => (
//       <div style={{display:"flex" , gap:"20px"}}>
//         <div>{text}</div>
//         <div >
//         <Input
//           value={record.eRegFee}
//           onChange={e => handleInputChange(record._id, 'eRegFee', e.target.value)}
//         />
//         <Button onClick={() => handleSubmit(record._id, 'eRegFee')}>Submit</Button>
//       </div>
//       </div>
//     ),
//   },
//   { title: 'NGDRS NO.', dataIndex: 'ngdrsNo', key: 'ngdrsNo' },
//   {
//     title: 'APP.DATE', dataIndex: 'appDate', key: 'appDate',
//     render: (text) => moment(text).format('YYYY-MM-DD')
//   },
//   {
//     title: 'D.CHECK', dataIndex: 'dCheck', key: 'dCheck',
//     render: (text, record) => (
//       <div style={{display:"flex" , gap:"20px"}}>
//         <div>{text}</div>
//         <div>
//         <Input
//           value={record.dCheck}
//           onChange={e => handleInputChange(record._id, 'dCheck', e.target.value)}
//         />
//         <Button onClick={() => handleSubmit(record._id, 'dCheck')}>Submit</Button>
//       </div>
//       </div>
//     ),
//   },
//   {
//     title: 'FINAL PRINT', dataIndex: 'finalPrint', key: 'finalPrint',
//     render: (text, record) => (
//       <div style={{display:"flex" , gap:"20px"}}>
//         <div>{text}</div>
//         <div>
//         <Input
//           value={record.finalPrint}
//           onChange={e => handleInputChange(record._id, 'finalPrint', e.target.value)}
//         />
//         <Button onClick={() => handleSubmit(record._id, 'finalPrint')}>Submit</Button>
//       </div>
//       </div>
//     ),
//   },
// ];
  return (
    <div>
      <h1>Document detail Group</h1>

      <div>
        <Form form={form} onFinish={onFinish} layout="vertical" style={{display:"grid", gridTemplateColumns: "auto auto auto auto auto ", gap:"5px"}}>
        <Form.Item name="serialNo" label="S.NO." rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="document" label="DOCUMENT" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="propNo" label="PROP.NO." rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="partyDealer" label="PARTY/DEALER" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="eStamp" label="E-STAMP" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="eRegFee" label="E-REG.FEE" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="ngdrsNo" label="NGDRS NO." rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="appDate" label="APP.DATE" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="dCheck" label="D.CHECK" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="finalPrint" label="FINAL PRINT" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" >Submit</Button>
        </Form.Item>
        </Form>

        <div style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search by Document, Party/Dealer, or Prop.No."
          onSearch={value => handleSearch(value)}
          style={{ width: 400 }}
        />
      </div>
        <Table columns={columns} dataSource={filteredDataSource} pagination={{ pageSize: 10 }} rowKey="_id" style={{ overflowX: "scroll" }} />
      </div>
    </div>
  );
}
