import React, { useEffect, useState } from 'react';
import {  useNavigate, Link } from 'react-router-dom';
import './css/AdminProductsDetails.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const AdminProductsDetails = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    let query = `
  query  {
      productList {
          _id
          ProductName
          Description
          Image
          Price
          Category
      }
    }
    `;
    // try {
      fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    }).then(async (response) => {
      let dataResponse = await response.json();
      console.log(dataResponse,"dataResponse")
      let data = dataResponse.data.productList;
      console.log(data,"data")
      setProducts(data);
    });
  };

  const productDelete = async (product) => {
    let query = `
        mutation productDelete($_id: String) {
          productDelete(_id: $_id) {
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
              _id: product,
            },
          }),
        }).then(async (response) => {
          let dataResponse = await response.json();
          console.log(dataResponse.data.productDelete._id,"Deleted product _id")
    
          if(dataResponse.data.productDelete._id){
            alert(`The product has been removed successfully`);
          }
          else{
            alert(`There has been an error. The product has not been removed!`);
          }
        });
  };
  
  const handleDelete = async (product) => {
    console.log("product",product);
    productDelete(product); 
    fetchProducts()       
  }

  const handleAddBtn = async () => {
    navigate(`/addProducts`);
  }

  const handleUpdate = async (product) => {
    let data={
      Id : product._id,
      ProductName: product.ProductName,
      Price: product.Price,
      Category: product.Category,
      Description: product.Description
    }
    const passedValueString = new URLSearchParams(data).toString();      
    navigate(`/editProducts?${passedValueString}`);         
  }

  useEffect(() => {
    fetchProducts();
  }, []);

    return (
            <div className="container">
              <div className="manage-products-section">
                <h1 className="mt-2" style={{ paddingBottom: 0 }}>Manage Products</h1>
                <button onClick={() => handleAddBtn()} className="btn btn-primary mb-4 mt-3">Add New Product</button>
              </div>
                <div className="table-container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th> 
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                        <td>{product.ProductName}</td>
                        <td>{product.Price} CAD</td>
                        <td>{product.Category}</td>
                        <td>
                        <button onClick={() => handleUpdate(product)} className="btn btn-primary mr-2">Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Remove</button>
                        </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
    
    );
};

export default AdminProductsDetails;
