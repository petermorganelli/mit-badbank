import { useBankContext } from "../utils/BankContext";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useState, useEffect } from "react";
import "./data.css";

const Data = () => {
  const { bank, loggedTransactions } = useBankContext();

  const items = bank.users;
  const trans = loggedTransactions.data;
  let noTrans = document.getElementById("noTransactions");

  //   const tranName = loggedTransactions.data.userName;
  //   const tranNewBalance = loggedTransactions.data.newBalance;
  //   const tranSubtractedFunds = loggedTransactions.data.subtractedFunds;
  //   const tranDate = loggedTransactions.data.currentDate;

  //   const user = bank.users.find((user) => user.name === currentUser.name);

  return (
    <>

      <table>
        <td id="userInfo">
          <Card
            bg="light"
            text="dark"
            border="primary"
            style={{
              width: "18rem",
              height: "700px",
              position: "relative",
              left: "100px",
            }}
          >
            <div className="scrollit" style={{ height: "700px" }}>
              <Card.Body style={{ height: "800px" }}>
                <Card.Title style={{ textAlign: "center" }}>
                  ALL DATA
                </Card.Title>
                <Card.Text style={{ textAlign: "center" }}>
                  Current User : {bank.loggedInUser}
                </Card.Text>
                {items.map((user) => (
                  <ul className="list-group-item">
                    <li className="list-group-item" key="{data.username}">
                      Username : {user.username}
                    </li>
                    <li className="list-group-item" key="{data.email}">
                      Email : {user.email}
                    </li>
                    <li className="list-group-item" key="{data.password}">
                      Password : {user.password}
                    </li>
                    <li className="list-group-item" key="{data.balance}">
                      Balance : ${user.balance}
                    </li>
                  </ul>
                ))}
              </Card.Body>
            </div>
          </Card>
        </td>
                  
        <Card
          bg="light"
          text="dark"
          border="primary"
          style={{ width: "70rem", position: "relative", left: "98px" }}
        >
          <div className="scrollit" style={{ height: "700px" }}>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                User Transactions
              </Card.Title>
              {(trans.length < 1) ? (
              <div id="noTransactions" style={{textAlign: "center"}}>There are no transactions to display.</div>):(<div></div>)
              }
              <table class="table table-hover" style={{ textAlign: "center" }}>
                <thead>
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Starting Balance</th>
                    <th scope="col">Debit Amount</th>
                    <th scope="col">Credit Amount</th>
                    <th scope="col">New Balance</th>
                    <th scope="col">Transaction Time</th>
                    <th scope="col">Type</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {(trans.length > 0 ) ? (trans.map((data) => (
                    <tr>
                      <td>{data.userName}</td>
                      <td>{data.currentBalance}</td>
                      
                      <td id="subtracted"style={{ color: "red"}}>{data.subtractedFunds}</td>
                      <td id="added"style={{ color: "green"}}>{data.addedFunds}</td>
                      <td>${data.newBalance}</td>
                      <td>{data.currentDate}</td>
                      <td>{data.transType}</td>
                    </tr>
                  ))) : (
                    <h1></h1> 
                    
                  )}
                </tbody>
              </table>
            </Card.Body>
          </div>
        </Card>
      </table>
    </>
  );
};

export default Data;
