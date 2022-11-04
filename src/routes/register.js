
import { useState } from 'react';
import { Card } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState("");
  const [activeUser, setActiveUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setActiveUser(currentUser);
  });

  //creates user in firebase auth

  function createFirebaseUser() {
    (async () => {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    })();
  }

  //adds user into mongoDb database

  function addUser() {
    console.log(name, email, password, balance);

    const url = `/account/create/${name}/${email}/${password}/${balance}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    })();
  }

  //deletes user from mongoDb database
  function deleteUser() {
    const url = `/account/deleteAccount/${email}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
      setSuccessMessage("The account has been deleted.");
    })();
  }

  //handles input entry
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "fieldName") {
      setName(value);
    } else if (name === "fieldPassword") {
      setPassword(value);
    } else if (name === "fieldEmail") {
      setEmail(value);
    } else {
      setBalance(Number(value));
    }
  };
  ///handles form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    ///Minimum requirements check
    if (!name || !password || !email) {
      setErrorMessage(
        "You need to provide a value for username, password and email!"
      );
      return;

      ///Checks to see if user already exists in old context bank object
      // const user = bank.users.find(user => user.username === username);
      // if (user) {
      //     setErrorMessage('User alreadyy exists!')
      //     return;
    } else if (password.length < 8) {
      setErrorMessage(`Password must be at least 8 characters long.`);
      return;
    } else {
      addUser(name, password, email, balance);
      createFirebaseUser(email, password);

      setSuccessMessage("You have successfully created an account!");
    }
  };

  return (
    <div>
      <Card
        bg="light"
        text="dark"
        border="primary"
        style={{
          width: "18rem",
          position: "relative",
          left: "100px",
          padding: "10px",
        }}
      >
        <Card.Header>Register</Card.Header>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputUsername" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              name="fieldName"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              name="fieldPassword"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              name="fieldEmail"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputBalance" className="form-label">
              Starting Balance
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputBalance"
              name="balance"
              value={balance}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
          {/* <button type="submit" onSubmit={deleteUser} className="btn btn-danger">
                Delete Account
            </button> */}

          {errorMessage && (
            <div className="mt-2 alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mt-2 alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
        </form>
        <h4>User Logged In:</h4>
        {activeUser?.email}
      </Card>
    </div>
  );
};
export default Register;
