import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import './css/Payment.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { parse, isAfter } from 'date-fns';
const Payment = () => {
  const [paymentData, setPaymentData] = useState({
    cardHolderName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    paymentMethod: 'creditCard',
  });

  const location = useLocation();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('SessionUserId')

  const formik = useFormik({
    initialValues: {
      cardHolderName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVV: '',
      paymentMethod: '',
    },
    validationSchema: Yup.object({
      cardHolderName: Yup.string().required('Card Holder Name is required'),
      cardNumber: Yup.string()
        .matches(/^[0-9]{16}$/, 'Card Number should be 16 digits')
        .required('Card Number is required'),
        cardExpiry: Yup.string()
        .test('expiryDate', 'Invalid Expiry Date', (value) => {
          if (!value) return false;
          const [month, year] = value.split('/');
          const currentDate = new Date();
          const expiryDate = new Date(parseInt('20' + year, 10), parseInt(month, 10) - 1, 1);
          return isAfter(expiryDate, currentDate);
        })
        .required('Expiry Date is required'),
      cardCVV: Yup.string()
        .matches(/^[0-9]{3}$/, 'CVV should be 3 digits')
        .required('CVV is required'),
      
      paymentMethod: Yup.string().required('Select any Payment Method'),
    }),
    onSubmit: (values) => {
      // Handle form submission
      

    const searchParams = new URLSearchParams(location.search);
    let firstName = searchParams.get('firstName');    
    let lastName = searchParams.get('lastName');    
    let mobileNumber = searchParams.get('mobileNumber');    
    let address = searchParams.get('address');    
    let city = searchParams.get('city');    
    let province = searchParams.get('province');    
    let pinCode = searchParams.get('pinCode');    

    let neworder = {
      UserId: userId,
      FirstName: firstName,
      LastName: lastName,
      MobileNumber: mobileNumber,
      Address: address,
      City: city,
      Province: province,
      PinCode: pinCode,
      CardHolderName: paymentData.cardHolderName,
      CardNumber: paymentData.cardNumber,
      CardExpiry: paymentData.cardExpiry,
      CardCVV: paymentData.cardCVV,
      PaymentMethod: paymentData.paymentMethod,
    };
    if(userId){
      AddOrder(neworder);
    }else{
      navigate('/login')
    }  
      // const passedValueString = new URLSearchParams(responseId).toString();
      // navigate(`/payment?${passedValueString}`);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const AddOrder = (newOrder) => {
    console.log("newOrder",newOrder);
    let query = `
    mutation AddOrder($UserId: String!, $FirstName: String!, $LastName: String!, $MobileNumber: String!, $Address: String!, $City: String!, $Province: String!, $PinCode: String!, $CardHolderName: String!, $CardNumber: String!, $CardExpiry: String!, $CardCVV: String!, $PaymentMethod: String!) {
      AddOrder(UserId: $UserId, FirstName: $FirstName, LastName: $LastName, MobileNumber: $MobileNumber, Address: $Address, City: $City, Province: $Province, PinCode: $PinCode, CardHolderName: $CardHolderName, CardNumber: $CardNumber, CardExpiry: $CardExpiry, CardCVV: $CardCVV, PaymentMethod: $PaymentMethod) {
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
          UserId:newOrder.UserId,
          FirstName:newOrder.FirstName,
          LastName:newOrder.LastName,
          MobileNumber:newOrder.MobileNumber,
          Address:newOrder.Address,
          City:newOrder.City,
          Province:newOrder.Province,
          PinCode:newOrder.PinCode,
          CardHolderName:newOrder.CardHolderName,
          CardNumber:newOrder.CardNumber,
          CardExpiry:newOrder.CardExpiry,
          CardCVV:newOrder.CardCVV,
          PaymentMethod:newOrder.PaymentMethod,
        },
      }),
    }).then(async (response) => {
      let created = await response.json();
      console.log(created,"createddddd ");
        navigate(`/orderPlaced`);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formik.validateForm()) {
      formik.handleSubmit(); 
      // Call Formik's handleSubmit function
    }
    // Perform form validation and payment processing logic here
    console.log('Payment data submitted:', paymentData);

    

  };

  return (
    <Container className="payment-container">

        <h1>Payment Details</h1>

      <Form onSubmit={handleSubmit} className="payment-form">
        <Form.Group controlId="formCardHolderName">
          <Form.Label>Cardholder Name</Form.Label>
          <Form.Control
            type='text' name='cardHolderName'
            value={formik.values.cardHolderName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.cardHolderName && !!formik.errors.cardHolderName}/>
               <Form.Control.Feedback type='invalid'>
               {formik.errors.cardHolderName}
             </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type='text'  name='cardNumber'
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.cardNumber && !!formik.errors.cardNumber} />
             <Form.Control.Feedback type='invalid'>
              {formik.errors.cardNumber}
            </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formCardExpiry">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                 type='text' name='cardExpiry'
                 placeholder="MM/YYYY"
                 value={formik.values.cardExpiry}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 isInvalid={formik.touched.cardExpiry && !!formik.errors.cardExpiry}/>
                    <Form.Control.Feedback type='invalid'>
                    {formik.errors.cardExpiry}
                  </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCardCVV">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type='text'  name='cardCVV'
                value={formik.values.cardCVV}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.cardCVV && !!formik.errors.cardCVV} />
                 <Form.Control.Feedback type='invalid'>
                  {formik.errors.cardCVV}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Form.Group controlId="formPaymentMethod">
          <Form.Label>Payment Method</Form.Label>
          <Row>
            <Col md={6}>
              <Form.Check
                type="radio"
                label="Credit Card"
                name="paymentMethod"
                value="creditCard"
                checked={formik.values.paymentMethod === 'creditCard'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.paymentMethod && !!formik.errors.paymentMethod}
              />
            </Col>
            <Col md={6}>
              <Form.Check
                type="radio"
                label="Debit Card"
                name="paymentMethod"
                value="debitCard"
                checked={formik.values.paymentMethod === 'debitCard'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.paymentMethod && !!formik.errors.paymentMethod}
              />
            </Col>
          </Row>
          <Form.Control.Feedback type='invalid'>
                  {formik.errors.paymentMethod}
                </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Pay & Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default Payment;
