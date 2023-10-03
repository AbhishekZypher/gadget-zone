import React, { useEffect, useState } from 'react';
import './css/allProducts.css';
import allProductsBanner from './img/allProductsBanner.jpg';
import iPhone14ProBanner from './img/iPhone14ProBanner.jpg';
import samsungS22UltraBanner from './img/samsungS22UltraBanner.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

const ProductsPage = () => {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
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

    const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

   const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.Category === selectedCategory);

    const brochuresImages = [
      { id: '1', src: samsungS22UltraBanner, alt: 'samsungS22UltraBanner', link: '/laptops' },
      { id: '2', src: iPhone14ProBanner, alt: 'iPhone14ProBanner', link: '/phones' },
      
      
      // Add more category images as needed
    ];
  return (
<div className="products-grid">
      <img src={allProductsBanner} alt="Promotion Banner" className="promotion-banner" />
      <div className="category-filter">
        <label htmlFor="category">Filter by Category: </label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Phones">Phones</option>
          <option value="Laptops">Laptops</option>
        </select>
      </div>
      <div className="products-container">
      {filteredProducts.map(product => (
      <div key={product._id} className="product-item">
      <Link to={`/product?Id=${product._id}`}>
        <div className="product-image-container">
          <img className="product-image" src={product.Image} alt={product.ProductName} />
        </div>
        <h4>{product.ProductName}</h4>
        <h6><b>{product.Price} CAD</b></h6>
      </Link>
    </div>
))}

      </div>
      <div className="brochures-slider">
        <Carousel showThumbs={false} showStatus={false}>
          {brochuresImages.map(brochures => (
            <div key={brochures.id} className="brochures-slide" >
              <a href={brochures.link}>
                <img src={brochures.src} alt={brochures.alt} />
              </a>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductsPage;
