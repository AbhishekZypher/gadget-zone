import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';



const ForgetPassword = () => {
  
  const [otp, setOTP] = useState('');
  const [email, setEmail] = useState('');
  const [authenticationError, setAuthenticationError] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);

  const startTimer = () => {
    setOtpSent(true);
    let interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setOtpSent(false);
      setTimer(60);
    }, 60000);
  };
  // A simple function to check if the email is valid
  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleChange = (otp) => {
    setOTP(otp);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let toBePassedOtp = otp.toString();
    const otpCheck = async () => {
      let query = `
      mutation otpChecker($Email: String!, $OTP: String) {
        otpChecker(Email: $Email, OTP: $OTP) {
          Email,
          OTP
        }
      }
    `;
     await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { Email: email, OTP: toBePassedOtp } }),
      }).then(async (response) => {
        let reponseAfterSubmit = await response.json();
        console.log("reponseAfterSubmit",reponseAfterSubmit);
        if(reponseAfterSubmit.data.otpChecker.Email){
          setAuthenticationError('');
              // setShowAuthSuccess(false); // Hide the popup after 3 seconds
              let responseId = {
                Email: reponseAfterSubmit.data.otpChecker.Email,
              };
              const passedValueString = new URLSearchParams(responseId).toString();
              navigate(`/resetPassword?${passedValueString}`);
        }else{
          setAuthenticationError('The OTP that you entered is incorrect !!');
        }
      });
    };
    otpCheck();

    // TODO: Implement OTP verification logic here
    console.log('OTP:', otp);
    // Continue with the verification process
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      setEmailValid(false);
      return;
    }

    setEmailValid(true);
    const submitEmail = async () => {
      let query = `
      mutation sendOtpWithEmail($Email: String!) {
        sendOtpWithEmail(Email: $Email) {
          Email
        }
      }
    `;
     await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { Email: email} }),
      }).then(async (response) => {
        let reponseAfterSubmit = await response.json();
        console.log("reponseAfterSubmit",reponseAfterSubmit);
        if(reponseAfterSubmit.data.sendOtpWithEmail.Email){
            // setAuthenticationError('An OTP has sent to the above email successfully !!');
            alert('An OTP has sent to the above email successfully !!!');
              // setShowAuthSuccess(false); // Hide the popup after 3 seconds
        }else{
          setAuthenticationError('An error has occured !!');
        }
      });
      startTimer();
    };
    submitEmail();

    // TODO: Implement OTP verification logic here
    console.log('OTP:', otp);
    // Continue with the verification process
  };

  const renderInput = (props) => {
    const handleKeyPress = (e) => {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(e.charCode);
      if (!pattern.test(inputChar)) {
        e.preventDefault();
      }
    };
  
    return <input {...props} onKeyPress={handleKeyPress} />;
  };
  
  return (
    <Container >
      <div className="my-4">
        <h1>Forget Password</h1>
      </div>
      <Form onSubmit={handleSubmitEmail} style={{ height: '25vh' }}>
        <Form.Group controlId="formEmail" className="mb-4">
          <Form.Label>Enter your email address</Form.Label>
         
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!emailValid && (
            <Form.Text className="text-danger">Please enter a valid email address.</Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={otpSent}>
          {otpSent ? `Resend OTP in ${timer} sec` : 'Send OTP'}
        </Button>
        </Form>
      <Form onSubmit={handleSubmit} style={{height:'25vh'}}>
        <Form.Group controlId="formOTP" className="mb-4">
          <Form.Label>
            <br/>
            A 5 digit verification code sent to the above email address.
            <br/>
            <br/>
          </Form.Label>
          <div className="d-flex justify-content-center align-items-center">
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={5}
              separator={<span>-</span>}
              renderInput={renderInput}
              inputStyle={{
                width: '50px',
                height: '50px',
                fontSize: '20px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginRight: '15px',
                marginLeft: '15px',
                marginTop: '10px',
                marginBottom: '25px',
                textAlign: 'center',
              }}
            />
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Verify
        </Button>
        {authenticationError && (
                  <Form.Text className='text-danger'>
                    {authenticationError}
                  </Form.Text>
                )}
      </Form>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Container>
  );
};

export default ForgetPassword;
