import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';

const EditProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let Id = searchParams.get('Id');
  let ProductName = searchParams.get('ProductName');
  let Price = searchParams.get('Price');
  let Category = searchParams.get('Category');
  let Description = searchParams.get('Description');

  // Sample initial product data
  const initialProduct = {
    _id: Id,
    ProductName: ProductName,
    Price: Price,
    Category: Category,
    Description: Description
  };
  const [product, setProduct] = useState(initialProduct);
  const [productImage, setProductImage] = useState();

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

  const productUpdate = async (updatedProduct) => {
    let query = `
        mutation productUpdate($_id:String,$ProductName:String,$Price:String,$Category:String,$Description:String) {
          productUpdate(_id: $_id,ProductName: $ProductName,Price: $Price,Category: $Category,Description: $Description) {
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
          _id: updatedProduct._id,
          ProductName: updatedProduct.ProductName,
          Price: updatedProduct.Price,
          Category: updatedProduct.Category,
          Description: updatedProduct.Description,
        },
      }),
    }).then(async (response) => {
      let dataResponse = await response.json();
      console.log(dataResponse.data.productUpdate._id,"Updated product _id")

      if(dataResponse.data.productUpdate._id){
        alert(`The product details has been updated successfully`);
        navigate('/adminHome');
      }
      else{
        alert(`There has been an error. The product details has not been updated!`);
      }
    });
  };
  

  const handleSubmit = event => {
    event.preventDefault();
    console.log("product",product);
    productUpdate(product);
  };

  return (
    <div className="container">
    <div className="edit-product-page">
        <br />
      <h2>Edit Product</h2>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="ProductName"
            value={product.ProductName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <br />

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="Price"
            value={product.Price}
            onChange={handleInputChange}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="Category"
          value={product.Category}
          onChange={handleInputChange}
        >
          <option value="Phones">Phones</option>
          <option value="Laptops">Laptops</option>
        </Form.Control>
      </Form.Group>
        <br />
        {/* <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
                type="file"
                accept="image/*"
                // onChange={handleInputChange}
                onChange={convertToBase64}
            />
            </Form.Group>
            {<img src={productImage} alt="Selected" style={{height: '150px', width: '150px', float: 'left', marginRight: '10px',marginTop: '10px',marginBottom:'10px'}}/>} */}
        <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="Description"
          value={product.Description}
          onChange={handleInputChange}
        />
      </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default EditProducts;