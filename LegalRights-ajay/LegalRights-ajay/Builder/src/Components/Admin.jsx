import React, { useState, useEffect } from "react";
import { Table, Input, Modal, Button, List, Pagination } from "antd";
import axios from "../Service/axios";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Set the number of posts per page
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const userResponse = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const postResponse = await axios.get("/api/GetAllposts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(userResponse.data.users);
      setPosts(postResponse.data.posts);
      setFilteredUsers(userResponse.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handlePreview = (userId) => {
    const userPosts = posts.filter((post) => post.userId === userId);
    setPreviewContent(userPosts);
    setCurrentPage(1); // Reset to first page whenever a new user is selected
    setPreviewModalVisible(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Posts",
      key: "posts",
      render: (text, record) => (
        <Button type="primary" onClick={() => handlePreview(record._id)}>
          View Posts
        </Button>
      ),
    },
  ];

  const { Search } = Input;

  // Pagination logic for the posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = previewContent.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <h1
        style={{
          alignItems: "center",
          color: "black",
          backgroundColor: "Highlight",
          fontFamily: "monospace bold",
          borderRadius: "10px",
          display: 'flex',
          flexDirection: 'row',
          justifyContent:"center",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        Admin Page
      </h1>
      <Search
        placeholder="Search by name"
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={filteredUsers.filter(
          (user) =>
            user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase()) ||
            user.role.toLowerCase().includes(searchText.toLowerCase())
        )}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Posts Preview"
        visible={previewModalVisible}
        onCancel={() => setPreviewModalVisible(false)}
        footer={null}
        width={1000}
      >
        <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <List
            dataSource={currentPosts}
            renderItem={(post) => (
              <List.Item key={post._id}>
                <div dangerouslySetInnerHTML={{ __html: post.description }} />
                <div>
                  <strong>Name:</strong> {post.Name}
                </div>
                <div>
                  <strong>Created Date:</strong>{" "}
                  {new Date(post.CreatedDate).toLocaleString()}
                </div>
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={postsPerPage}
            total={previewContent.length}
            onChange={handlePageChange}
          />
        </div>
      </Modal>
    </>
  );
};

export default UserTable;
