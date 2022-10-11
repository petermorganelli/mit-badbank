import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useBankContext } from "../utils/BankContext";



import "./navbar.css";
import { LinkContainer } from "react-router-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "formik";

function MyNavbar() {
  const { bank, logOutUser } = useBankContext();
function tootltip () {
    ('[data-toggle="tooltip"]').tooltip();
};
  return (
    
    <>
      <Navbar bg="light" variant="light" nav-link-active-color="red" style={{width:"1200px"}}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="#home">The BadBank</Navbar.Brand>
          </LinkContainer>
          <Nav>
            <LinkContainer to="/home">
              <Nav.Link  data-toggle="tooltip" data-placement="left" title="Goes home">Home</Nav.Link>
            </LinkContainer>
          
            <LinkContainer to="/register">
              <Nav.Link data-toggle="tooltip" title="Create a new account.">
                Create Acount
              </Nav.Link>
            </LinkContainer>
            
           

            <LinkContainer to="/login">
              <Nav.Link data-toggle="tooltip" title="Log in to your account.">Login</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/deposit">
              <Nav.Link data-toggle="tooltip" title="Go here to make a deposit..">Deposit</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/withdrawl">
              <Nav.Link data-toggle="tooltip" title="Go here to make a withdrawl.">Withdrawl</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/alldata">
              <Nav.Link data-toggle="tooltip" title="Check out everyone's data.">All Data</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
      {(bank.loggedInUser)?(<>
        <div style={{position:"absolute",top:"0px", left:"1301px" , height:"79.99px", width:"100px"}}>Logged In as: <br/>{bank.loggedInUser}</div>
        
      
     
      </>):( 
      <>  <form to="/login">
        <Button type="submit" style={{position:"absolute", top:"0px", left:"1301px" }}>Log In</Button>
        </form></>
      )}
    </>
  
  );
}

export default MyNavbar;
