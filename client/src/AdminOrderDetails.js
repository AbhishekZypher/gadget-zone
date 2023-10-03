import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/AdminUserDetails.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AdminOrderDetails = () => {
  const [reactOrder, setReactOrder] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    let query = `
            query {
                orderList {
                _id
                UserId
                UserName
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
        let data1 = dataResponse.data.orderList;
        console.log("data1",data1);
        setReactOrder(data1);
        console.log("reactOrder",reactOrder);
      });
  };

  const orderDelete = async (orderId) => {
    let query = `
      mutation orderDelete($_id: String) {
        orderDelete(_id: $_id) {
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
          _id: orderId,
        },
      }),
    })
      .then(async (response) => {
        let dataResponse = await response.json();

        if (dataResponse.data.orderDelete._id) {
          alert(`The order has been removed successfully`);
        } else {
          alert(`There has been an error. The order has not been removed!`);
        }
      });
  };

  const handleDelete = async (orderId) => {
    orderDelete(orderId);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="manage-users-section">
        <h1 className="mt-2 mb-4" style={{ paddingBottom: 0 }}>Manage Orders</h1>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>UserName</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reactOrder.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.UserName}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(order._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
