import "./Login.css";

import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Lock, Mail } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import { UserContext } from "../../context/userContext/UserContext";
import axios from "../../api/axios";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      //firebase login
      const firebaseUser = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      //api login
      const res = await axios.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });
      const apiUser = res.data.user;
      axios.defaults.headers.common = {
        Authorization: `Bearer ${apiUser.accessToken}`,
      };

      if (firebaseUser && apiUser) {
        setUser({ firebaseUser, apiUser });
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="overflow-hidden">
        <Row
          md="auto"
          className="min-vh-100 justify-content-center align-items-center"
        >
          <Form className="customForm">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Mail color="black" width="18" height="18" />
              </InputGroup.Text>
              <Form.Control
                placeholder="email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Lock color="black" width="18" height="18" />
              </InputGroup.Text>
              <Form.Control
                placeholder="password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </InputGroup>

            <Button variant="primary" type="submit" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default Login;