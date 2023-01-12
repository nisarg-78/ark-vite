import "./Signup.css"

import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { Lock, Mail, User } from "react-feather"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"

import { UserContext } from "../../context/userContext/UserContext"
import { axiosPrivate as axios } from "../../api/axios"
import useAlert from "../../hooks/useAlert"

import { useNavigate } from "react-router-dom"

function Signup() {
	const { setUser } = useContext(UserContext)
	const { setAlert } = useAlert()
	const [signupUsername, setSignupUsername] = useState("")
	const [signupEmail, setSignupEmail] = useState("")
	const [signupPassword, setSignupPassword] = useState("")
	const [isRegistering, setIsRegistering] = useState(false)

	const navigate = useNavigate()

	const handleSignup = async (e) => {
		e.preventDefault()
		setIsRegistering(true)
		try {
			//api signup
			const res = await axios.post("/auth/register", {
				username: signupUsername,
				email: signupEmail,
				password: signupPassword,
			})

			const apiUser = res.data
			console.log(apiUser)
			axios.defaults.headers.common = {
				Authorization: `Bearer ${apiUser.accessToken}`,
			}
			setUser((prev) => {
				return { ...prev, apiUser }
			})

			//firebase signup
			try {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					signupEmail,
					signupPassword
				)
				setUser((prev) => {
					return { ...prev, firebaseUser: userCredential.user }
				})
				navigate("/")
			} catch (error) {
				setIsRegistering(false)
				console.log(error.message)
				setUser((prev) => {
					return { ...prev, firebaseUser: null }
				})
				useAlert("Some error occured, please try again", "danger")
			}
		} catch (error) {
			setIsRegistering(false)
			console.log(error)
			setAlert(error?.response?.data?.error, "danger")
			setUser(null)
			console.log(error)
		}
	}

	return (
		<>
			<Container className='overflow-hidden'>
				<Row
					md='auto'
					className='min-vh-100 justify-content-center align-items-center'>
					<Form className='customForm'>
						<InputGroup className='mb-3'>
							<InputGroup.Text id='basic-addon1'>
								<User color='black' width='18' height='18' />
							</InputGroup.Text>
							<Form.Control
								placeholder='username'
								aria-label='username'
								aria-describedby='basic-addon1'
								onChange={(e) =>
									setSignupUsername(e.target.value)
								}
							/>
						</InputGroup>

						<InputGroup className='mb-3'>
							<InputGroup.Text id='basic-addon1'>
								<Mail color='black' width='18' height='18' />
							</InputGroup.Text>
							<Form.Control
								placeholder='email'
								aria-label='Email'
								aria-describedby='basic-addon1'
								onChange={(e) => setSignupEmail(e.target.value)}
							/>
						</InputGroup>

						<InputGroup className='mb-3'>
							<InputGroup.Text id='basic-addon1'>
								<Lock color='black' width='18' height='18' />
							</InputGroup.Text>
							<Form.Control
								placeholder='password'
								aria-label='Password'
								aria-describedby='basic-addon1'
								onChange={(e) =>
									setSignupPassword(e.target.value)
								}
							/>
						</InputGroup>

						<div className='d-flex justify-content-between'>
							<Button
								variant='primary'
								type='submit'
								onClick={handleSignup}>
								{isRegistering ? (
									<Spinner animation='border' size='sm' />
								) : (
									`Signup`
								)}
							</Button>

							<Link to='/login'>
								<Button variant='outline-primary' type='submit'>
									Login
								</Button>
							</Link>
						</div>
					</Form>
				</Row>
			</Container>
		</>
	)
}

export default Signup
