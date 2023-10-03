import React, { useEffect, useState } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import './css/Cart.css';

const Cart = () => {
  const userId = sessionStorage.getItem('SessionUserId')
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  let i=1;
 
  const GoToCheckout = ()=>{

    if(userId){
      navigate(`/checkout`);
    }else{
      navigate('/login')
    }   
  }

  const fetchCartItems = async () => {
    let query = `
  query FetchCartItems($UserId: String!) {
    FetchCartItems (UserId:$UserId){
          _id
          ProductName
          Price
          Quantity
      }
    }
    `;
    // try {
      fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query , variables: { UserId: userId }}),
    }).then(async (response) => {
      let dataResponse = await response.json();
      console.log(dataResponse,"cart Items in response")
      let data = dataResponse.data.FetchCartItems;
      console.log(data,"data")
      setCartItems(data);
      console.log(cartItems,"cart items after set");
      // setProducts(data);
    });
    // } catch (error) {
    //   console.error('Error fetching products:', error);
    // }
  };

  useEffect(() => {
    fetchCartItems();
  },[]);

  
  
  // 

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    let query = `
            mutation ItemRemoveCart($UserId:String!,$ProductId:String!) {
              ItemRemoveCart(UserId: $UserId,ProductId: $ProductId) {
                ProductId
              }
            }
            `;
    
        fetch("http://localhost:5000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            variables: {
              UserId: userId,
              ProductId: id,
            },
          }),
        }).then(async (response) => {
          let AddedToCart = await response;
          console.log(AddedToCart,"Remove Item from Cart resoponse");
          // if(AddedToCart.data){
            // navigate('/cart');
            // sessionStorage.setItem("SessionUserId",created.data.UserLogin._id)
            // setErrorMessage('');
            //   setAuthenticationError('');
              
            // console.log(authenticationError,"api response error message set 1")
            // setShowAuthSuccess(true); // Show authentication success popup
            //   setTimeout(() => {
            //     setShowAuthSuccess(false); // Hide the popup after 3 seconds
            //     navigate('/cart');
            //   }, 1000);
          // }else{
          //   // setErrorMessage("Email or Password entered is incorrect");
          //   // error.auth = 'Email or Password entered is incorrect !';
          //   // setErrorMessage('true');
          //   setAuthenticationError('Item not added to cart');
          //   console.log(authenticationError,"api response error message set 2")
          //   // navigate("/login");
    
          // }
        }).catch((error) => {
          console.log(error,"catch error");
          // setAuthenticationError('Error While adding to cart !!');
        });
    setCartItems(updatedItems);
  };

  const handleChangeQuantity = (id, newQuantity) => {

    const updatedItems = cartItems.map((item) =>
      item._id === id ? { ...item, Quantity: Math.max(1, parseInt(newQuantity, 10)) } : item
    );
    console.log(newQuantity,"newQuantity");
    console.log(id,"id"); 

    let query = `
            mutation UpdateToCart($UserId:String!,$ProductId:String!,$Quantity:Int!) {
              UpdateToCart(UserId: $UserId,ProductId: $ProductId,Quantity:$Quantity) {
                  Quantity
              }
            }
            `;
    
        fetch("http://localhost:5000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            variables: {
              UserId: userId,
              ProductId: id,
              Quantity: newQuantity
            },
          }),
        }).then(async (response) => {
          let AddedToCart = await response.json();
          console.log(AddedToCart,"Quantity updated to Cart resoponse");
          // if(AddedToCart.data){
            // navigate('/cart');
            // sessionStorage.setItem("SessionUserId",created.data.UserLogin._id)
            // setErrorMessage('');
            //   setAuthenticationError('');
              
            // console.log(authenticationError,"api response error message set 1")
            // setShowAuthSuccess(true); // Show authentication success popup
            //   setTimeout(() => {
            //     setShowAuthSuccess(false); // Hide the popup after 3 seconds
            //     navigate('/cart');
            //   }, 1000);
          // }else{
          //   // setErrorMessage("Email or Password entered is incorrect");
          //   // error.auth = 'Email or Password entered is incorrect !';
          //   // setErrorMessage('true');
          //   setAuthenticationError('Item not added to cart');
          //   console.log(authenticationError,"api response error message set 2")
          //   // navigate("/login");
    
          // }
        }).catch((error) => {
          console.log(error,"catch error");
          // setAuthenticationError('Error While adding to cart !!');
        });
    setCartItems(updatedItems);


  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.Price * item.Quantity, 0);
  };

  return (
    <Container>
      <header>
        <h1>Shopping Cart</h1>
      </header>
      <div className="cart-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SLNO</th>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>{i++}</td>
                <td className="cart-item-details">
                  <span className="cart-item-name">{item.ProductName}</span>
                </td>
                <td className="cart-item-price">${item.Price}</td>
                <td>
                  <div className="input-group mb-3" style={{ width: '170px', margin: 'auto' }}>
                    <Button
                      className="btn btn-white border border-secondary px-3"
                      type="button"
                      id="button-addon1"
                      data-mdb-ripple-color="dark"
                      onClick={() => handleChangeQuantity(item._id, item.Quantity - 1)}
                    >
                      <i className="fas fa-minus"></i>
                    </Button>
                    <input
                    disabled
                      type="text"
                      className="form-control text-center border border-secondary"
                      placeholder="1"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      value={item.Quantity}
                      onChange={(e) => handleChangeQuantity(item._id, e.target.value)}
                    />
                    <Button
                      className="btn btn-white border border-secondary px-3"
                      type="button"
                      id="button-addon2"
                      data-mdb-ripple-color="dark"
                      onClick={() => handleChangeQuantity(item._id, item.Quantity + 1)}
                    >
                      <i className="fas fa-plus"></i>
                    </Button>
                  </div>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleRemoveItem(item._id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="total-price">Total Price: ${calculateTotalPrice()}</div>
        <br />
        <Button className="checkout-btn" onClick={GoToCheckout}>Proceed to Checkout</Button>
      </div>
    </Container>
  );
};

export default Cart;
