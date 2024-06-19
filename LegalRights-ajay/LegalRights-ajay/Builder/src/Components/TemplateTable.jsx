import React, { useState } from "react";
import { Table, Button, Modal } from "antd";

const TemplateTable = ({ data }) => {
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  console.log("Temptable", data);

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Created Date",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handlePreview(record.description)}
        >
          Preview
        </Button>
      ),
    },
  ];

  const handlePreview = (description) => {
    setPreviewContent(description);
    setPreviewModalVisible(true);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={Array.isArray(data) ? data : [data]}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Description Preview"
        visible={previewModalVisible}
        onCancel={() => setPreviewModalVisible(false)}
        footer={null}
        width={1000} // Set the width of the modal
      >
        <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <div dangerouslySetInnerHTML={{ __html: previewContent }} />
        </div>
      </Modal>
    </div>
  );
};

export default TemplateTable;
