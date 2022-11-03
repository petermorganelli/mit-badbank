import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const Withdrawl = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [activeUser, setActiveUser] = useState({});

  onAuthStateChanged(auth, (user) => {
    setActiveUser(user);
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSuccessMessage("");
    setErrorMessage("");
    setAmount(value);
  };

  function updateUser() {
    fetch(`/account/update/${activeUser.email}/-${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setSuccessMessage(
            `$${amount} has been subtracted from ${email}'s account.`
          );

          console.log("JSON:", data);
        } catch (err) {
          setErrorMessage("Withdrawl failed");
          console.log("err:", text);
        }
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(email, amount);

    setAmount("");
  };

  
  if (activeUser?.email)
    return (
      <>
        <Card
          bg="light"
          text="dark"
          border="primary"
          style={{ width: "18rem", position: "relative", left: "100px" }}
        >
          <Card.Header>Withdrawl</Card.Header>
          <Card.Body>
            <Card.Text>Balance : </Card.Text>
            <form id="depo" onSubmit={handleSubmit}>
              <div>
                <label>User : {activeUser.email}</label>{" "}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputDepositAmount"
                  className="form-label"
                >
                  Amount : $ {amount}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="depositAmount"
                  value={amount}
                  onChange={handleChange}
                />
              </div>

              <button
                disabled={!amount ? true : false}
                type="submit"
                className="btn btn-primary"
              >
                Withdraw
              </button>
              {errorMessage && (
                <div className="mt-2 alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="mt-2 alert alert-success" role="alert">
                  {successMessage}
                  <br />
                </div>
              )}
            </form>
          </Card.Body>
        </Card>
      </>
    );
  else
    return (
      <Card>
        <Card.Body>
          <Card.Title>Please Login</Card.Title>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </Card.Body>
      </Card>
    );
};
export default Withdrawl;
