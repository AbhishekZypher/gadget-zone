// import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function ResetPassword(){
    const [password, setPassword] = useState('');
    const [authenticationError, setAuthenticationError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let passedEmail = searchParams.get('Email');
  
    const formik = useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },
      validationSchema: Yup.object({
        password: Yup.string().min(6, 'Password should be at least 6 characters long').required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords do not match')
          .required('Confirm Password is required'),
      }),
      onSubmit: (values) => {
        // Handle form submission
        let UserType = 'user';
        let newuser = {
          
          Password: values.password,
          Email: passedEmail,
          
        };
        console.log("newuser",newuser)
        setPassword(newuser.Password);
        const passwordUpdate = async () => {
          let query = `
          mutation passwordUpdate($Email: String!, $Password: String) {
              passwordUpdate(Email: $Email, Password: $Password) {
              Email,
              Password
            }
          }
        `;
         await fetch("http://localhost:5000/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables: { Email: passedEmail, Password: newuser.Password } }),
          }).then(async (response) => {
            let reponseAfterSubmit = await response.json();
            console.log("reponseAfterSubmit",reponseAfterSubmit);
            if(reponseAfterSubmit.data.passwordUpdate.Email){
              setAuthenticationError('');
                  alert("Password change successful");
                  navigate(`/login`);
            }else{
              setAuthenticationError('The OTP that you entered is incorrect !!');
            }
          });
        };
        passwordUpdate();
      },
    });

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };
  
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // TODO: Implement password reset logic here
      if (formik.validateForm()) {
        formik.handleSubmit(); // Call Formik's handleSubmit function
      }
    };
    return(
        <Container>
        <div className="my-4">
          <h1>Reset Password</h1>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'  name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && !!formik.errors.password}/>
               <Form.Control.Feedback type='invalid'>
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password' name='confirmPassword'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword} />
              <Form.Control.Feedback type='invalid'>
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Reset Password
          </Button>
          {authenticationError && (
                  <Form.Text className='text-danger'>
                    {authenticationError}
                  </Form.Text>
                )}
        </Form>
      </Container>
    )
}
export default ResetPassword;