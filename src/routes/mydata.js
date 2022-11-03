
import { Card } from "react-bootstrap";

import { auth } from "../utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./data.css";

const Data = () => {
  const [authUser, setAuthUser] = useState("");
  const [loading, setLoading] = useState(true);

  //Watch to see if user is logged in or out and set a loading state

  onAuthStateChanged(auth, (user) => {
    setAuthUser(user?.email);
    setLoading(false);
  });

  //   //Fetch user data from database
  const [bankUser, setBankUser] = useState({});
  useEffect(() => {
    // find one user by email - alternative to find
    if (!loading) {
      console.log(authUser);
      fetch(`/account/findOne/${authUser}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setBankUser(data);
        });
    }
  }, [loading]);

  if (!loading)
    return (
      <>
      

        <Card
          bg="light"
          text="dark"
          border="primary"
          style={{ width: "18rem", position: "relative", left: "100px" }}
        >
          <Card.Body>
            <Card.Title>User Info</Card.Title>
            <Card.Text>Name : {bankUser.name}</Card.Text>
            <Card.Text>Email : {bankUser.email}</Card.Text>
            <Card.Text>Balance : ${bankUser.balance}</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
};

export default Data;
