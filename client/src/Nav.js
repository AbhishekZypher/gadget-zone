import { AppBar } from '@mui/material';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import logoImg from './img/logo.png';
import bckImg from './img/bck2.jpg';
import React, { useState, useEffect } from 'react';
import {  useNavigate} from 'react-router-dom';
import PageRoutes from './PageRoutes';

function Navi() {
  // Using useState to create the state variable for isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserType, setisUserType] = useState();
  const navigate = useNavigate();
  const style = {
    padding: '5px',
    color: 'white',
    backgroundImage: `url(${bckImg})`,
    backgroundSize: 'cover'
  };
  const logout = ()=>{
    
    sessionStorage.removeItem('SessionUserId');
    sessionStorage.removeItem('SessionUserType');
    navigate('/login');
  }

  const style1 = { color: 'white', paddingRight: '10px' };

  // useEffect to update the isLoggedIn state when the session value changes
  useEffect(() => {
    const sessionValue = sessionStorage.getItem("SessionUserId");
    const UserType = sessionStorage.getItem("SessionUserType");
    setisUserType(UserType);
    setIsLoggedIn(!!sessionValue);
  }, []); // Empty dependency array ensures this runs only once, on component mount

  // Add useEffect to watch for changes in isLoggedIn and update accordingly
  useEffect(() => {
    const sessionValue = sessionStorage.getItem("SessionUserId");
    const newIsLoggedIn = !!sessionValue;
    if (isLoggedIn !== newIsLoggedIn) {
      setIsLoggedIn(newIsLoggedIn);
    }
  }, [isLoggedIn]); 
  return (
    <AppBar position="static" style={style}>
      <div>
        <Navbar variant="dark" expand="lg">
          <Container>
          {isLoggedIn && isUserType == "user"? (
            <Navbar.Brand href="/">
              <img
                src={logoImg}
                width="95"
                height="80"
                className="d-inline-block align-centre"
                alt="Logo"
              />
              <span style={{ fontSize: '24px', color: 'white', marginLeft: '10px' }}>
                Gadget Zone
              </span>
            </Navbar.Brand>
             ) : null}
             {!isLoggedIn && !isUserType? (
            <Navbar.Brand href="/login">
              <img
                src={logoImg}
                width="95"
                height="80"
                className="d-inline-block align-centre"
                alt="Logo"
              />
              <span style={{ fontSize: '24px', color: 'white', marginLeft: '10px' }}>
                Gadget Zone
              </span>
            </Navbar.Brand>
             ) : null}
              {isLoggedIn && isUserType == "admin"? (
            <Navbar.Brand href="/adminHome">
              <img
                src={logoImg}
                width="95"
                height="80"
                className="d-inline-block align-centre"
                alt="Logo"
              />
              <span style={{ fontSize: '24px', color: 'white', marginLeft: '10px' }}>
                Gadget Zone
              </span>
            </Navbar.Brand>
             ) : null}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {isLoggedIn && isUserType == "user"? (
                  <NavDropdown
                    title="Products"
                    id="basic-nav-dropdown"
                    style={{ fontSize: '18px', color: 'white', marginRight: '20px' }}
                  >
                    <NavDropdown.Item href="/phones">Phones</NavDropdown.Item>
                    <NavDropdown.Item href="/laptops">Laptops</NavDropdown.Item>
                  </NavDropdown>
                ) : null}
                {isLoggedIn && isUserType == "user"? (
                  <Nav.Link href="/" style={{ fontSize: '18px', color: 'white', marginRight: '20px' }}>
                    Home
                  </Nav.Link>
                ):null} 
                {isLoggedIn && isUserType == "admin"? (
                  <Nav.Link href="/adminHome" style={{ fontSize: '18px', color: 'white', marginRight: '20px' }}>
                    Home
                  </Nav.Link>
                ):null}
                <Nav.Link
                  href="/about"
                  style={{ fontSize: '18px', color: 'white', marginRight: '20px' }}
                >
                  About
                </Nav.Link>
                {isLoggedIn && isUserType == "user"? (
                  <Nav.Link href="/cart" style={{ fontSize: '18px', color: 'white', marginRight: '20px' }}>
                    <i className="fa-solid fa-cart-shopping" style={style1}></i>
                  </Nav.Link>
                ) : null}

                <NavDropdown
                  title={<i className="fa-solid fa-user"></i>}
                  id="basic-nav-dropdown"
                  style={{ fontSize: '18px', color: 'white', marginRight: '10px' }}
                >
                  {isLoggedIn ? (
                    <React.Fragment>
                      <NavDropdown.Item onClick={logout} href='/login'>Logout</NavDropdown.Item>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                      <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    </React.Fragment>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      
    </AppBar>
  );
}

export default Navi;
