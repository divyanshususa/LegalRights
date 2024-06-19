import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate()
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.users)
      setUsers(response.data.users); // Update to set the users array
      setFilteredUsers(response.data.users); // Update to set the filtered users array
    } catch (error) {
      console.error("Error fetching user data:", error);
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
  ];

  const { Search } = Input;

  return (
    <>
      {/* Add debug output here */}
      <h1 style={{ alignItems: "center", color: "black", backgroundColor: "Highlight",fontFamily:"monospace bold" }} onClick={() => {
        navigate("/")
      }}>Admin Page</h1>
      {/* <pre>{JSON.stringify(filteredUsers, null, 2)}</pre> */}
      <Search
        placeholder="Search by name"
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={filteredUsers.filter(
          (user) =>
            (user.firstName ) ||
            (user.lastName ) ||
            (user.email &&
              user.email.toLowerCase().includes(searchText.toLowerCase())) ||
            (user.role)
        )}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </>
  );

};

export default UserTable;
