import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useBankContext } from "../utils/BankContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const { bank, setLoggedInUser, assignActiveUser, setCurrentUser } = useBankContext();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setErrorMessage('');
        if (name === 'username') {
            setUsername(value);
        }else{
            setPassword(value);
         }
        }

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(bank.loggedInUser)
            setErrorMessage('');
            const user = bank.users.find(user => user.username === username);
            if (username === bank.loggedInUser) {
                setErrorMessage('Already logged in!')
                return;
            }
            if (!user) {
                setErrorMessage('Could not find user!');
                setUsername('');
                return;
            }
            if (user.password !== password) {
                setErrorMessage('Bad password!');
                return;
            }
            setLoggedInUser(username);
            assignActiveUser(username);
            // assignActiveUser(username);
            setSuccessMessage('You successfully logged in!');
         }

         const logOut = (e) =>{
            setLoggedInUser(null);
            setCurrentUser('');
            setSuccessMessage('');
            setUsername('');
            setPassword('');
         }

         if(bank.loggedInUser)
         return(
            <Card bg="light" text="dark" border="primary" style={{ width: "18rem", position: "relative", left:"100px", padding:"10px" }}>
            <Card.Header>
                <Card.Text>You are logged in as "{bank.loggedInUser}"</Card.Text>
                <button className="btn btn-danger" onClick={logOut}>Logout</button>
            </Card.Header> 
            </Card>
         )
          else
         return (
            <>
            <Card bg="light" text="dark" border="primary" style={{ width: "18rem", position: "relative", left:"100px", padding:"10px" }}>
            <Card.Header>Login</Card.Header>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputUsername" className="form-label">Username :</label>
                    <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword" className="form-label">Password :</label>
                    <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword"
                    name="password"
                    value={password}
                    onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {errorMessage && <div className="mt-2 alert alert-danger" role="alert">
                    {errorMessage}
                    </div>}
                {successMessage && <div className="mt-2 alert alert-success" role="alert">
                    {successMessage}
                    </div>}
            </form>
            </Card>
            </>

         )

    };
export default Login;