import React, { useState } from 'react';
import { Container, Row, Col, Image, Nav, Tab, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';

const ProductPage = () => {

  const [product, setProduct] = React.useState([]);
  const [quantity, setQuantity] = React.useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let passedId = searchParams.get('Id');
  const productId=sessionStorage.setItem('productId',passedId)
  console.log("passedId",passedId);
  const userId = sessionStorage.getItem('SessionUserId')
  const [authenticationError, setAuthenticationError] = useState('');
  const navigate = useNavigate();

  const AddtoCart = ()=>{
    if(userId){
      let query = `
            mutation AddToCart($UserId:String!,$ProductId:String!,$Quantity:Int!) {
              AddToCart(UserId: $UserId,ProductId: $ProductId,Quantity:$Quantity) {
                  _id
                  UserId
                  ProductId
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
              ProductId: passedId,
              Quantity: quantity
            },
          }),
        }).then(async (response) => {
          let AddedToCart = await response.json();
          console.log(AddedToCart,"Add to Cart resoponse");
          if(AddedToCart.data){
            navigate('/cart');
            // sessionStorage.setItem("SessionUserId",created.data.UserLogin._id)
            // setErrorMessage('');
            //   setAuthenticationError('');
              
            // console.log(authenticationError,"api response error message set 1")
            // setShowAuthSuccess(true); // Show authentication success popup
            //   setTimeout(() => {
            //     setShowAuthSuccess(false); // Hide the popup after 3 seconds
            //     navigate('/cart');
            //   }, 1000);
          }else{
            // setErrorMessage("Email or Password entered is incorrect");
            // error.auth = 'Email or Password entered is incorrect !';
            // setErrorMessage('true');
            setAuthenticationError('Item not added to cart');
            console.log(authenticationError,"api response error message set 2")
            // navigate("/login");
    
          }
        }).catch((error) => {
          console.log(error,"catch error");
          setAuthenticationError('Error While adding to cart !!');
        });
    }else{
      navigate('/login')
    }
    
        
      
  }

  React.useEffect(
    function () {
      let query = `
    query productListById($_id: String!) {
      productListById(_id: $_id) {
        _id
        ProductName
        Description
        Image
        Price
        Category
        Specification
        Warranty
        Shipping
        Seller
      }
    }
    `;

      fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { _id: passedId } }),
      }).then(async (response) => {
        let productResponse = await response.json();
        console.log("productResponse",productResponse.data.productListById);
        let productDetails = productResponse.data.productListById;
        setProduct(productDetails);
        // setallEmp(empTempList);

      });
    },
    [passedId]
  );


  // const product = {
  //   name: 'Sample Product',
  //   price: 99.99,
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique justo non efficitur placerat. Quisque pharetra ultrices turpis, ac ultricies ipsum sollicitudin sed.',
  //   images: [
  //     'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp',
  //     'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp',
  //     'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp',
  //     'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp'
  //   ],
  // };

  return (
    <>
      {/* Content */}
      <section className="py-5">
      <Container>
      <Row className="gx-5">
        <Col lg={6}>
          <div className="border rounded-4 mb-3 d-flex justify-content-center">
            <a
              data-fslightbox="mygalley"
              className="rounded-4"
              target="_blank"
              data-type="image"
              href={product.Image}
            >
              <Image
                style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }}
                className="rounded-4 fit"
                src={product.Image}
              />
            </a>
          </div>
          {/* <div className="d-flex justify-content-center mb-3">
            {product.images.slice(1).map((image, index) => (
              <a
                key={index}
                data-fslightbox="mygalley"
                className="border mx-1 rounded-2"
                target="_blank"
                data-type="image"
                href={image}
              >
                <Image
                  width={60}
                  height={60}
                  className="rounded-2"
                  src={image}
                />
              </a>
            ))}
          </div> */}
        </Col>
        {/* IMAGE DISPLAY TO REFER LATER */}
        {/* <Col lg={6}>
          <div className="border rounded-4 mb-3 d-flex justify-content-center">
            <a
              data-fslightbox="mygalley"
              className="rounded-4"
              target="_blank"
              data-type="image"
              href={product.Images[0]}
            >
              <Image
                style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }}
                className="rounded-4 fit"
                src={product.Image[0]}
              />
            </a>
          </div>
          <div className="d-flex justify-content-center mb-3">
            {product.images.slice(1).map((image, index) => (
              <a
                key={index}
                data-fslightbox="mygalley"
                className="border mx-1 rounded-2"
                target="_blank"
                data-type="image"
                href={image}
              >
                <Image
                  width={60}
                  height={60}
                  className="rounded-2"
                  src={image}
                />
              </a>
            ))}
          </div>
        </Col> */}
        <Col lg={6}>
          <div className="ps-lg-3">
            <h4 className="title text-dark">
              {product.ProductName}
            </h4>  
            <p>
              {product.Description}
            </p>
            <br />
            <div className="mb-3">
              <span className="h5">${product.Price}</span>
              <span className="text-muted">/per item</span>
            </div>
            <hr />
            <Row className="mb-4 justify-content-center">
              <Col md={4} xs={6}>
                <label className="mb-2">Size</label>
                <select className="form-select border border-secondary" style={{ height: '35px' }}>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </Col>
              <Col md={4} xs={6} className="mb-3">
              <label className="mb-2 d-block">Quantity</label>
              <div className="input-group mb-3" style={{ width: '170px' }}>
                <Button
                  className="btn btn-white border border-secondary px-3"
                  type="button"
                  id="button-addon1"
                  data-mdb-ripple-color="dark"
                  onClick={() => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1))}
                >
                  <i className="fas fa-minus"></i>
                </Button>
                <input
                  type="text"
                  className="form-control text-center border border-secondary"
                  placeholder="1"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  value={quantity}
                  onChange={event => setQuantity(event.target.value)}
                />
                <Button
                  className="btn btn-white border border-secondary px-3"
                  type="button"
                  id="button-addon2"
                  data-mdb-ripple-color="dark"
                  onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </div>
              </Col>
            </Row>
            <div className="text-center my-4">
              <Button onClick={AddtoCart} className="btn btn-warning shadow-0 px-4 mx-2">Buy now</Button>
              <Button onClick={AddtoCart} className="btn btn-primary shadow-0 px-4 mx-2">
                <i className="me-1 fa fa-shopping-basket"></i> Add to cart
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
      </section>
      {/* Content */}

      <section className="bg-light border-top py-4">
      <Container>
        <Tab.Container defaultActiveKey="specification">
      <Row className="gx-4">
        <Col lg={12}>
          <div className="border rounded-2 px-3 py-2 bg-white">
            {/* Pills navs */}

            <Nav justify variant="pills" defaultActiveKey="specification" id="ex1" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="specification">Specification</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="warranty">Warranty info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="shipping">Shipping info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="seller">Seller profile</Nav.Link>
              </Nav.Item>
            </Nav>
            {/* Pills navs */}

            {/* Pills content */}
            <Tab.Content id="ex1-content">
              <Tab.Pane eventKey="specification" className="fade show">
              {/* <div dangerouslySetInnerHTML={{__html: product.Specification}} />                 */}
                <Row className="mb-2">
                  <Col md={6}>
                    <ul className="list-unstyled mb-0">
                      <li>
                        <i className="fas fa-check text-success me-2"></i>Some great feature name here
                      </li>
                      <li>
                        <i className="fas fa-check text-success me-2"></i>Lorem ipsum dolor sit amet, consectetur
                      </li>
                      <li>
                        <i className="fas fa-check text-success me-2"></i>Duis aute irure dolor in reprehenderit
                      </li>
                      <li>
                        <i className="fas fa-check text-success me-2"></i>Optical heart sensor
                      </li>
                    </ul>
                  </Col>
                  <Col md={6} className="mb-0">
                    <ul className="list-unstyled">
                      <li>
                        <i className="fas fa-check text-success me-2"></i>Easy fast and ver good
                      </li>
                      <li>
                        <i className="fas fa-check text-success me-2"></i>Some great feature name here
                      </li>
                      <li>
                        <i className="fas fa-check text-success me-2"></i>Modern style and design
                      </li>
                    </ul>
                  </Col>
                </Row>
                <table className="table border mt-3 mb-2">
                  <tbody>
                    <tr>
                      <th className="py-2">Display:</th>
                      <td className="py-2">13.3-inch LED-backlit display with IPS</td>
                    </tr>
                    <tr>
                      <th className="py-2">Processor capacity:</th>
                      <td className="py-2">2.3GHz dual-core Intel Core i5</td>
                    </tr>
                    <tr>
                      <th className="py-2">Camera quality:</th>
                      <td className="py-2">720p FaceTime HD camera</td>
                    </tr>
                    <tr>
                      <th className="py-2">Memory:</th>
                      <td className="py-2">8 GB RAM or 16 GB RAM</td>
                    </tr>
                    <tr>
                      <th className="py-2">Graphics:</th>
                      <td className="py-2">Intel Iris Plus Graphics 640</td>
                    </tr>
                  </tbody>
                </table>
              </Tab.Pane>
              <Tab.Pane eventKey="warranty" className="fade">
                Tab content or sample information now <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              </Tab.Pane>
              <Tab.Pane eventKey="shipping" className="fade">
                Another tab content or sample information now <br />
                Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Tab.Pane>
              <Tab.Pane eventKey="seller" className="fade">
                Some other tab content or sample information now <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum.
              </Tab.Pane>
            </Tab.Content>
            {/* Pills content */}
          </div>
        </Col>
      </Row>
      </Tab.Container>
    </Container>
      </section>
    </>
  );
};

export default ProductPage;
