import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import './css/Checkout.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    address: '',
    city: '',
    province: '',
    pinCode: '',
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      address: '',
      city: '',
      province: '',
      pinCode: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      mobileNumber: Yup.string()
        .matches(/^[0-9]{10,10}$/, 'Phone Number should be 10 digits (no country code needed)')
        .required('Phone is required'),
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      province: Yup.string().required('Province is required'),
      pinCode: Yup.string().min(6, 'Please enter valid Postal Code.').max(6, 'Please enter valid Postal Code.').required('Postal Code is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission
      let UserType = 'user';
      let responseId = {
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNumber: values.mobileNumber,
        address: values.address,
        city: values.city,
        province: values.province,
        pinCode: values.pinCode,
      };
      
      const passedValueString = new URLSearchParams(responseId).toString();
      navigate(`/payment?${passedValueString}`);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
    if (formik.validateForm()) {
      formik.handleSubmit(); 
      // Call Formik's handleSubmit function
    }
    // let responseId = {
    //   firstName: formData.firstName,
    //   lastName: formData.lastName,
    //   mobileNumber: formData.mobileNumber,
    //   address: formData.address,
    //   city: formData.city,
    //   province: formData.province,
    //   pinCode: formData.pinCode,
    // };
    // const passedValueString = new URLSearchParams(responseId).toString();
    // navigate(`/payment?${passedValueString}`);

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container className="checkout-container">
        <h1>Shipping Details</h1>
      <Form onSubmit={handleSubmit} className="checkout-form">
        <Row>
          <Col md={6}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text' name='firstName'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.firstName && !!formik.errors.firstName}/>
                   <Form.Control.Feedback type='invalid'>
                   {formik.errors.firstName}
                 </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text' name='lastName'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.lastName && !!formik.errors.lastName}/>
                   <Form.Control.Feedback type='invalid'>
                   {formik.errors.lastName}
                 </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formMobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type='text'  name='mobileNumber'
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.mobileNumber && !!formik.errors.mobileNumber} />
             <Form.Control.Feedback type='invalid'>
              {formik.errors.mobileNumber}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text' name='address'
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.address && !!formik.errors.address}/>
               <Form.Control.Feedback type='invalid'>
               {formik.errors.address}
             </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text' name='city'
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.city && !!formik.errors.city}/>
                   <Form.Control.Feedback type='invalid'>
                   {formik.errors.city}
                 </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formProvince">
              <Form.Label>Province</Form.Label>
              <Form.Control
                type='text' name='province'
                value={formik.values.province}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.province && !!formik.errors.province}/>
                   <Form.Control.Feedback type='invalid'>
                   {formik.errors.province}
                 </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formPinCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'  name='pinCode'
            value={formik.values.pinCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.pinCode && !!formik.errors.pinCode}/>
             <Form.Control.Feedback type='invalid'>
            {formik.errors.pinCode}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Proceed to Payment
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;
