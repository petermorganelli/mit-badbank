import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useBankContext } from "../utils/BankContext";

const Deposit = () => {
  const { bank, currentUser, updateTransactions } = useBankContext();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  const user = bank.users.find((user) => user.name === currentUser.name);

  const handleChange = (e) => {
    setSuccessMessage("");
    setErrorMessage("");
    setDepositAmount(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorMessage("");
    let currentBalance = parseFloat(user.balance);
    let addedFunds = parseFloat(depositAmount);
    let newBalance = currentBalance + addedFunds;

    let currentDate = Date();

    let subtractedFunds = null;
    
    const userName = bank.loggedInUser;
    let transType = "credit";

    if (Number(addedFunds) && addedFunds < 0) {
      setErrorMessage(`You can not deposit a negative amount!`);
    } else if (!Number(addedFunds) && addedFunds !== 0) {
      setErrorMessage(`You must input a number!`);
    } else if (Number(addedFunds) && addedFunds > 0) {
      user.balance = newBalance;
      setSuccessMessage(`$${addedFunds} has been added to your balance.`);
      updateTransactions(
        userName,
        currentBalance,
        newBalance,
        subtractedFunds,
        addedFunds,
        currentDate,
        transType
      );
      setDepositAmount("");
    }
  };

  return (
    <>
      <Card
        bg="light"
        text="dark"
        border="primary"
        style={{ width: "18rem", position: "relative", left: "100px" }}
      >
        <Card.Header>Deposit</Card.Header>
        <Card.Body>
          {bank.loggedInUser ? (
            <>
              <Card.Text>User : {bank.loggedInUser}</Card.Text>
              <Card.Text>Balance : $ {user.balance}</Card.Text>
              <form id="depo" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputDepositAmount"
                    className="form-label"
                  >
                    Amount : $ {depositAmount}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="depositAmount"
                    value={depositAmount}
                    onChange={handleChange}
                  />
                </div>

                <button
                  disabled={!depositAmount ? true : false}
                  type="submit"
                  className="btn btn-primary"
                >
                  Deposit
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
            </>
          ) : (
            <div>
              <Card.Title>Please Login</Card.Title>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Deposit;
