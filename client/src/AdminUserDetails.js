import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/AdminUserDetails.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AdminUserDetails = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    let query = `
      query {
        userList {
          _id
          UserName
          Email
          Phone
        }
      }
    `;

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then(async (response) => {
        let dataResponse = await response.json();
        let data = dataResponse.data.userList;
        setUsers(data);
        console.log("users",users);
      });
  };

  const userDelete = async (userId) => {
    let query = `
      mutation userDelete($_id: String) {
        userDelete(_id: $_id) {
          _id
        }
      }
    `;

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: {
          _id: userId,
        },
      }),
    })
      .then(async (response) => {
        let dataResponse = await response.json();

        if (dataResponse.data.userDelete._id) {
          alert(`The user has been removed successfully`);
        } else {
          alert(`There has been an error. The user has not been removed!`);
        }
      });
  };

  const handleDelete = async (userId) => {
    userDelete(userId);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="manage-users-section">
        <h1 className="mt-2 mb-4" style={{ paddingBottom: 0 }}>Manage Users</h1>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.UserName}</td>
                <td>{user.Email}</td>
                <td>{user.Phone}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserDetails;
