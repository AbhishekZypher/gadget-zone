import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";

export default function Paypay() {
  const [savedCards, setSavedCards] = useState([
    {
      type: "mastercard",
      cardNumber: "**** **** **** 3193",
    },
    {
      type: "visa",
      cardNumber: "**** **** **** 4296",
    },
  ]);

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCVV] = useState("");

  const handleAddCard = () => {
    // Add validation logic here before adding the card
    if (cardholderName && cardNumber && expireDate && cvv) {
      const newCard = {
        type: cardNumber.startsWith("4") ? "visa" : "mastercard",
        cardNumber: cardNumber.slice(-4).padStart(cardNumber.length, "*"),
      };
      setSavedCards((prevCards) => [...prevCards, newCard]);
      // Clear the input fields after adding the card
      setCardholderName("");
      setCardNumber("");
      setExpireDate("");
      setCVV("");
    } else {
      alert("Please fill in all card details.");
    }
  };

  const handleRemoveCard = (index) => {
    const updatedCards = savedCards.filter((_, i) => i !== index);
    setSavedCards(updatedCards);
  };

  return (
    <MDBContainer
      className="py-5"
      fluid
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp)",
      }}
    >
      <MDBRow className=" d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="5">
          <MDBCard className="rounded-3">
            <MDBCardBody className="p-4">
              <div className="text-center mb-4">
                <h3>Settings</h3>
                <h6>Payment</h6>
              </div>
              <p className="fw-bold mb-4 pb-2">Saved cards:</p>
              {savedCards.map((card, index) => (
                <div
                  className="d-flex flex-row align-items-center mb-4 pb-1"
                  key={index}
                >
                  <img
                    className="img-fluid"
                    src={
                      card.type === "mastercard"
                        ? "https://img.icons8.com/color/48/000000/mastercard-logo.png"
                        : "https://img.icons8.com/color/48/000000/visa.png"
                    }
                    alt={card.type}
                  />
                  <div className="flex-fill mx-3">
                    <div className="form-outline">
                      <MDBInput
                        label="Card Number"
                        id={`form${index}`}
                        type="text"
                        size="lg"
                        value={card.cardNumber}
                      />
                    </div>
                  </div>
                  <a href="#!" onClick={() => handleRemoveCard(index)}>
                    Remove card
                  </a>
                </div>
              ))}
              <p className="fw-bold mb-4">Add new card:</p>
              <MDBInput
                label="Cardholder's Name"
                id="form3"
                type="text"
                size="lg"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
              />
              <MDBRow className="my-4">
                <MDBCol size="7">
                  <MDBInput
                    label="Card Number"
                    id="form4"
                    type="text"
                    size="lg"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </MDBCol>
                <MDBCol size="3">
                  <MDBInput
                    label="Expire"
                    id="form5"
                    type="password"
                    size="lg"
                    placeholder="MM/YYYY"
                    value={expireDate}
                    onChange={(e) => setExpireDate(e.target.value)}
                  />
                </MDBCol>
                <MDBCol size="2">
                  <MDBInput
                    label="CVV"
                    id="form6"
                    type="password"
                    size="lg"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCVV(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>
              <MDBBtn color="success" size="lg" block onClick={handleAddCard}>
                Add card
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
