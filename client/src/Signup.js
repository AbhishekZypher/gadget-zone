import React from 'react';
import {  useNavigate } from 'react-router-dom';
import './css/Signup.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Container, Row, Col, Card, Form, Button,  } from 'react-bootstrap';
import {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function SignupPage() {
  const [authenticationError, setAuthenticationError] = useState('');

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string().required('User name is required'),
      email: Yup.string().email('Invalid email format')
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'Invalid email format'
      ).required('Email is required'),
      phone: Yup.string()
        .matches(/^[0-9]{9,10}$/, 'Phone Number should be 9 or 10 digits (no country code needed)')
        .required('Phone is required'),
      password: Yup.string().min(6, 'Password should be at least 6 characters long').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Confirm Password is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission
      let UserType = 'user';
      let newuser = {
        UserName: values.userName,
        Password: values.password,
        Email: values.email,
        Phone: values.phone,
        UserType: UserType,
      };
      AddUser(newuser);
    },
  });
  const AddUser = (newuser) => {
    let query = `
        mutation AddUser($UserName:String!,$Password:String!,$Email:String!,$Phone: String!,$UserType: String!) {
          AddUser(UserName: $UserName,Password: $Password, Email: $Email, Phone: $Phone,UserType: $UserType) {
              UserName
              Password
              Email
              Phone
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
          UserName: newuser.UserName,
          Password: newuser.Password,
          Email: newuser.Email,
          Phone: newuser.Phone,
          UserType: newuser.UserType,
        },
      }),
    }).then(async (response) => {
      let created = await response.json();
      console.log(created,"createddddd ");
      if(created.data.AddUser.Email){
        setAuthenticationError('');
            // setShowAuthSuccess(false); // Hide the popup after 3 seconds
            let responseId = {
              Email: created.data.AddUser.Email,
            };
            const passedValueString = new URLSearchParams(responseId).toString();
            navigate(`/emailVerification?${passedValueString}`);
      }else{
        setAuthenticationError('An account with this email already exists !!');
      }
    });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formik.validateForm()) {
      formik.handleSubmit(); // Call Formik's handleSubmit function
    }
  };

  return (
    <Container className='p-4'>
      <Form name="userCreate" onSubmit={handleSubmit}>
      <Row>
        <Col md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
          Become an Gadget Zone<br />
            <span style={{ color: 'rgba(79,155,197,255)' }}>member today</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
          Join our Gadget Zone Family loyalty program today for rewards, discounts, inspiration and a few surprises along the way. It's quick, easy and free.
          </p>
        </Col>

        <Col md='6'>
          <Card className='my-5'>
            <Card.Body className='p-5'>
              <Row>
                <Col col='6'>
                  <Form.Group className='mb-4' controlId='UserName'>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type='text' name='userName'
                 value={formik.values.userName}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 isInvalid={formik.touched.userName && !!formik.errors.userName}/>
                    <Form.Control.Feedback type='invalid'>
                    {formik.errors.userName}
                  </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col col='6'>                  
              <Form.Group className='mb-4' controlId='Email' >
                <Form.Label>Email</Form.Label>
                <Form.Control type='text' name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && !!formik.errors.email} />
                    <Form.Control.Feedback type='invalid'>
                    {formik.errors.email}
                  </Form.Control.Feedback>
              </Form.Group>
                </Col>
              </Row>
              <Form.Group className='mb-4' controlId='Phone'>
                <Form.Label>Phone</Form.Label>
                <Form.Control type='text'  name='phone'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.phone && !!formik.errors.phone} />
                   <Form.Control.Feedback type='invalid'>
                    {formik.errors.phone}
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-4' controlId='Password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'  name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && !!formik.errors.password}/>
                     <Form.Control.Feedback type='invalid'>
                    {formik.errors.password}
                  </Form.Control.Feedback>
              </Form.Group>           
              <Form.Group className='mb-4' controlId='formPassword'>
                <Form.Label> Confirm Password</Form.Label>
                <Form.Control type='password' name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword} />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <div className='d-flex justify-content-center mb-4'>
                <Form.Check
                  name='flexCheck'
                  value=''
                  id='flexCheckDefault'
                  label='Subscribe to our newsletter'
                />
              </div>

              <Button className='w-100 mb-4' size='md' variant='primary' type="submit" >
                Sign Up
              </Button>

              {authenticationError && (
                  <Form.Text className='text-danger'>
                    {authenticationError}
                  </Form.Text>
                )}

              <div className='text-center'>
                <p>or sign up with:</p>

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
      {/* <Toast
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
          Signup successful!
        </Toast.Body>
      </Toast> */}
    </Container>
  );
}

export default SignupPage;
