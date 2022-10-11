import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useBankContext } from "../utils/BankContext";

function Withdrawl() {
  const { bank, currentUser, updateTransactions } = useBankContext();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [withdrawlAmount, setWithdrawlAmount] = useState("");

  const user = bank.users.find((user) => user.name === currentUser.name);

  const handleChange = (e) => {
    setSuccessMessage("");
    setErrorMessage("");
    setWithdrawlAmount(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorMessage("");
    let currentBalance = parseFloat(user.balance);
    let subtractedFunds = parseFloat(withdrawlAmount);
    let newBalance = currentBalance - subtractedFunds;
    let currentDate = Date();
    
    let addedFunds = null;
    const userName = bank.loggedInUser;
    let transType = "debit";

    if (Number(subtractedFunds) > Number(currentBalance)) {
      setErrorMessage("Insufficient Funds.");
    } else if (Number(subtractedFunds) && subtractedFunds < 0) {
      setErrorMessage(`You may not withdrawl a negative amount!`);
    } else if (!Number(subtractedFunds) && subtractedFunds !== 0) {
      setErrorMessage(`You must input a number!`);
    } else {
      user.balance = newBalance;

      setSuccessMessage(
        `$${subtractedFunds} has been deducted from your balance.`
      );
      updateTransactions(
        userName,
        currentBalance,
        newBalance,
        subtractedFunds,
        addedFunds,
        currentDate,
        transType
      );
      setWithdrawlAmount("");
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
        <Card.Header>Withdrawl</Card.Header>
        <Card.Body>
          {bank.loggedInUser ? (
            <>
              <Card.Text>User : {bank.loggedInUser}</Card.Text>
              <Card.Text>Balance : $ {user.balance}</Card.Text>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputWithdrawlAmount"
                    className="form-label"
                  >
                    Amount : $ {withdrawlAmount}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="withdrawlAmount"
                    value={withdrawlAmount}
                    onChange={handleChange}
                  />
                </div>

                <button
                  disabled={!withdrawlAmount ? true : false}
                  type="submit"
                  className="btn btn-primary"
                >
                  Withdrawl
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
}

export default Withdrawl;
