import { useState } from 'react';
import { Card } from 'react-bootstrap';

import { useBankContext } from "../utils/BankContext";

const Register = () => {
    const { bank, addNewUser } = useBankContext();

    const [errorMessage, setErrorMessage]     = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [username, setUsername]             = useState('');
    const [password, setPassword]             = useState('');
    const [email, setEmail]                   = useState('');
    const [balance, setBalance]               = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        }else if(name === 'password') {
            setPassword(value);
         } else if(name === 'email') {
            setEmail(value);
         }
         else{
            setBalance(value);
         }
        };

        const handleSubmit = (event) => {
            event.preventDefault();

            setErrorMessage('');
            if (!username || !password || !email) {
                setErrorMessage('You need to provide a value for username, password and email!')
                return;
            }
            const user = bank.users.find(user => user.username === username);
            if (user) {
                setErrorMessage('User alreadyy exists!')
                return;
            } else if (password.length < 8) {
                setErrorMessage(`Password must be at least 8 characters long.`)
                return;
            } else{
            addNewUser(username, password, email, balance);
            // setLoggedInUser(username);
            // assignActiveUser(event.target.value);

            setSuccessMessage('You have successfully created an account!')
         }};

         return (

            <div>
                <Card bg="light" text="dark" border="primary" style={{ width: "18rem", position: "relative", left:"100px", padding:"10px" }}>
                <Card.Header>Register</Card.Header>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUsername" className="form-label">Username</label>
                        <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                        <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword"
                        name="password"
                        value={password}
                        onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                        <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail"
                        name="email"
                        value={email}
                        onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputBalance" className="form-label">Starting Balance</label>
                        <input
                        type="text"
                        className="form-control"
                        id="exampleInputBalance"
                        name="balance"
                        value={balance}
                        onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Create Account</button>
                    {errorMessage && <div className="mt-2 alert alert-danger" role="alert">
                        {errorMessage}
                        </div>}
                    {successMessage && <div className="mt-2 alert alert-success" role="alert">
                        {successMessage}
                        </div>}
            
                </form>
                </Card>
            </div>

         )

    };
export default Register;