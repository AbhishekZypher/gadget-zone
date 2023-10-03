import React from 'react';
import {  useNavigate,Link } from 'react-router-dom';
import './css/Login.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Container, Row, Col, Card, Form, Button,Toast } from 'react-bootstrap';
import {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function LoginPage() {
  // const [errorMessage, setErrorMessage] = useState('');
  const [authenticationError, setAuthenticationError] = useState('');
  const [showAuthSuccess, setShowAuthSuccess] = useState(false);
  const navigate = useNavigate();
 
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'Invalid email format'
      ).required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission
      let logUser = {
        Password: values.password,
        Email: values.email,
      };
      UserLogin(logUser); 
    },
  });

  // const error = {};
   const UserLogin =async (newuser) => {
    let query = `
        mutation UserLogin($Email:String!,$Password:String!) {
          UserLogin(Email: $Email,Password: $Password,) {
              _id
              UserType
          }
        }
        `;

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: {
          Email: newuser.Email,
          Password: newuser.Password,
        },
      }),
    }).then(async (response) => {
      let created = await response.json();
      console.log(created,"created resoponse");
      if(created.data.UserLogin._id){
        sessionStorage.setItem("SessionUserId",created.data.UserLogin._id)
        sessionStorage.setItem("SessionUserType",created.data.UserLogin.UserType)
        // setErrorMessage('');
          setAuthenticationError('');
          
        console.log(authenticationError,"api response error message set 1")
        setShowAuthSuccess(true); // Show authentication success popup
          setTimeout(() => {
            setShowAuthSuccess(false); // Hide the popup after 3 seconds
            if(created.data.UserLogin.UserType==="admin"){
              navigate('/adminHome');
              window.location.reload();
            }
            else{
              navigate('/');
              window.location.reload();
            }
            
          }, 1000);
      }else{
        // setErrorMessage("Email or Password entered is incorrect");
        // error.auth = 'Email or Password entered is incorrect !';
        // setErrorMessage('true');
        setAuthenticationError('Incorrect email or password !!');
        console.log(authenticationError,"api response error message set 2")
        // navigate("/login");

      }
    }).catch((error) => {
      console.log(error,"catch error");
      setAuthenticationError('Incorrect email or password !!');
    });
  };
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formik.validateForm()) {
      formik.handleSubmit(); // Call Formik's handleSubmit function
    }
  };

  return (
    <Container className='p-4'>
      <Form name="userLogin" onSubmit={handleSubmit}>
      <Row>
        <Col md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Welcome back! <br />
            <span style={{ color: 'rgba(79,155,197,255)' }}>Log in to your account</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
          Too many passwords?
          You can now login with a one-time only code we will send to your email address, or verified mobile number saved on your Gadget Zone account.
          </p>
        </Col>

        <Col md='6'>
          <Card className='my-5'>
            <Card.Body className='p-5'>
              <Form.Group className='mb-4' controlId='Email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='text' name='email'  value={formik.values.email}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 isInvalid={formik.touched.email && !!formik.errors.email} />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.email}
                  </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-4' controlId='Password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && !!formik.errors.password}/>
                    <Form.Control.Feedback type='invalid'>
                    {formik.errors.password}
                  </Form.Control.Feedback>
              </Form.Group>

              <div className='d-flex justify-content-center mb-4'>
                <Form.Check
                  name='flexCheck'
                  value=''
                  id='flexCheckDefault'
                  label='Remember me'
                />
              </div>
              
              <Button className='w-100 mb-4' size='md' variant='primary' type="submit">
                Log In
              </Button>
              <div className="text-center mt-3">
                  <Link to="/forgetPassword">Forgot Password</Link>
                </div>
              {authenticationError && (
                  <Form.Text className='text-danger'>
                    {authenticationError}
                  </Form.Text>
                )}
              {/* <Form.Group className='mb-4' controlId='auth'>
              
              <Form.Control.Feedback type='invalid'>
                    {errorMessage}
                  </Form.Control.Feedback>
                  </Form.Group> */}

              <div className='text-center'>
                <p>or log in with:</p>

                <Button
                  href='#'
                  variant='outline-primary'
                  className='mx-3'
                >
                  <i className='fab fa-facebook-f'></i>
                </Button>

                <Button
                  href='#'
                  variant='outline-primary'
                  className='mx-3'
                >
                  <i className='fab fa-twitter'></i>
                </Button>

                <Button
                  href='#'
                  variant='outline-primary'
                  className='mx-3'
                >
                  <i className='fab fa-google'></i>
                </Button>

                <Button
                  href='#'
                  variant='outline-primary'
                  className='mx-3'
                >
                  <i className='fab fa-github'></i>
                </Button>
              </div>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Form>
      {/* Authentication success popup */}
      <Toast
        show={showAuthSuccess}
        onClose={() => setShowAuthSuccess(false)}
        style={{
          position: 'fixed',
          top: '25px',
          left: '50%',
          transform: 'translateX(-50%)',
          minWidth: '200px',
          zIndex: 9999,
        }}
      >
        <Toast.Body className='text-white bg-info'>
          Authentication successful! Redirecting to home page...
        </Toast.Body>
      </Toast>
    </Container>
  );
}

export default LoginPage;
