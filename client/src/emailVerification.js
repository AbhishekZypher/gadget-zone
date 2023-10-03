import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';



const OTPPage = () => {
  
  const [otp, setOTP] = useState('');
  const [authenticationError, setAuthenticationError] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let passedEmail = searchParams.get('Email');
  
  // useEffect(() => {
  //   const fetchEmail = async () => {
  //     let query = `
  //     mutation signupVerification($Email: String!, $OTP: String) {
  //       signupVerification(Email: $Email, OTP: $OTP) {
  //         Email,
  //         OTP
  //       }
  //     }
  //   `;
  //    await fetch("http://localhost:5000/graphql", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ query, variables: { Email: passedEmail } }),
  //     }).then(async (response) => {
  //       let reponseList = await response.json();
  //       console.log("reponseList",reponseList);
  //       return;
  //     });
  //   };
  //   fetchEmail();
  // },[1]);


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
        body: JSON.stringify({ query, variables: { Email: passedEmail, OTP: toBePassedOtp } }),
      }).then(async (response) => {
        let reponseAfterSubmit = await response.json();
        console.log("reponseAfterSubmit",reponseAfterSubmit);
        if(reponseAfterSubmit.data.otpChecker.Email){
          setAuthenticationError('');
              // setShowAuthSuccess(false); // Hide the popup after 3 seconds
              navigate(`/`);
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

  const handleSubmitToSendOtp = (e) => {
    e.preventDefault();
    const fetchEmail = async () => {
      let query = `
      mutation signupVerification($Email: String!, $OTP: String) {
        signupVerification(Email: $Email, OTP: $OTP) {
          Email,
          OTP
        }
      }
    `;
     await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { Email: passedEmail } }),
      }).then(async (response) => {
        let reponseList = await response.json();
        alert("A 5 digit verification code has been sent to the given email address.");
        console.log("reponseList",reponseList);
        return;
      });
    };
    fetchEmail();
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
        <h1>Email Verification</h1>
      </div>
      <Form onSubmit={handleSubmitToSendOtp} style={{height:'25vh'}}>
        <Form.Group controlId="formOtpConfirmation" className="mb-4">
          <Form.Label>
            Please confirm your email address given below.
            <br/>
            <br/>
            <Form.Text className='text-danger '>
              {passedEmail}
              </Form.Text>
              <br />
              <Button variant="primary" type="submit">
                Send OTP
              </Button>
          </Form.Label>
          </Form.Group>
          </Form>

          <Form onSubmit={handleSubmit} style={{height:'25vh'}}>
          <Form.Group controlId="formOTP" className="mb-4">
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
                marginTop: '25px',
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
    </Container>
  );
};

export default OTPPage;
