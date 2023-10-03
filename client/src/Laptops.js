import React, { useEffect, useState } from 'react';
import './css/Laptops.css';
import laptopsBanner from './img/laptopsBanner.jpg';
import { Link } from 'react-router-dom';


const LaptopsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory] = useState('Laptops');

  useEffect(() => {
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
      // } catch (error) {
      //   console.error('Error fetching products:', error);
      // }
    };

    fetchProducts();
  }, []);
   const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.Category === selectedCategory);


  return (
<div className="products-grid">
    <h1>Laptops</h1>
      <img src={laptopsBanner} alt="Promotion Banner" className="promotion-banner" />
      <div className="products-container">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-item">
            <Link to={`/product/${product._id}`}> {/* Add the Link component with the appropriate URL */}
            <img src={product.Image} alt={product.ProductName} style={{ width: '200px', height: '150px' }}/>
            <h4>{product.ProductName}</h4>
            <h6><b>{product.Price} CAD</b></h6>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaptopsPage;
