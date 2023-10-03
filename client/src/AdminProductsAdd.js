import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';


const AddProducts = () => {
  const navigate = useNavigate();

  const [productImage, setProductImage] = useState();

  const [product, setProduct] = useState({
    ProductName: '',
    Price: '',
    Category: 'Phones',
    Description: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const convertToBase64 = e => {
    console.log("e",e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        console.log(reader.result);
        setProductImage(reader.result);
    };
    reader.onerror = error => {
        console.log("Error: ", error);
    };
  };


  const productAdd = async (addProduct) => {
    try{

    let query = `
        mutation productAdd($ProductName:String,$Image:String,$Price:String,$Category:String,$Description:String) {
          productAdd(ProductName: $ProductName,Image:$Image,Price: $Price,Category: $Category,Description: $Description) {
              _id
              ProductName
              Price
              Category
              Description
          }
        }
        `;
    // try {
      fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: {
          ProductName: addProduct.ProductName,
          Image: productImage,
          Price: addProduct.Price,
          Category: addProduct.Category,
          Description: addProduct.Description,
        },
      }),
    }).then(async (response) => {
      let dataResponse = await response.json();
      let data = dataResponse.data.productAdd._id;
      console.log(data,"Added product dataResponse")
      if (data) {
        alert(`The product has been added successfully`);
        navigate('/adminProducts');
      } else {
        alert(`There has been an error. The product has not been added!`);
      }
    });
}catch (error) {
    console.error('Error uploading image:', error);
  }
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("product",product);
    console.log(productImage,"uploaded Image ")
    productAdd(product);
  };

  return (
    <div className="container">
    <div className="edit-product-page">
        <br />
      <h2>Add Product</h2>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="ProductName"
            // value={product.ProductName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <br />

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="Price"
            // value={product.Price}
            onChange={handleInputChange}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="Category"
        //   value={product.Category}
          onChange={handleInputChange}
        >
          <option value="Phones">Phones</option>
          <option value="Laptops">Laptops</option>
        </Form.Control>
      </Form.Group>
        <br />

        <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
                type="file"
                accept="image/*"
                // onChange={handleInputChange}
                onChange={convertToBase64}
            />
            </Form.Group>
            {<img src={productImage} alt="Selected" style={{height: '150px', width: '150px', float: 'left', marginRight: '10px',marginTop: '10px',marginBottom:'10px'}}/>}

        <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="Description"
        //   value={product.Description}
          onChange={handleInputChange}
        />
      </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default AddProducts;