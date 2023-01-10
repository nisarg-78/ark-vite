import "./Login.css"

import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import { Lock, Mail } from "react-feather"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"

import { axiosPrivate as axios } from "../../api/axios"
import useAlert from "../../hooks/useAlert"
import useAuth from "../../hooks/useAuth"

function Login() {

  const navigate = useNavigate()
  const { setAlert } = useAlert()
  const { user, setUser } = useAuth()

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      //api login
      const res = await axios.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      })
      const apiUser = res.data.user
      axios.defaults.headers.common = {
        Authorization: `Bearer ${apiUser.accessToken}`,
      };

      //firebase login
      const firebaseUser = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )

      if (firebaseUser && apiUser) {
        setUser({ firebaseUser, apiUser })
        return navigate("/")
      }
    } catch (error) {
      setUser(null)
      setAlert("Something's wrong", "danger")
      console.log(error)
    }
  }

  return (
    <>
      <Container className="overflow-hidden">
        <Row
          md="auto"
          className="min-vh-100 bg-dark justify-content-center align-items-center"
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

            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" onClick={handleLogin}>
                Login
              </Button>

              <Link to="/signup">
                <Button variant="outline-primary" type="submit">
                  Signup
                </Button>
              </Link>
            </div>

          </Form>
        </Row>
      </Container>
    </>
  )
}

export default Login
