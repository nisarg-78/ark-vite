import "./Topbar.css"

import Search from "../Search/Search"

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import { Form } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { axiosPrivate as axios } from "../../api/axios"

import useAuth from "../../hooks/useAuth"

function Topbar() {
	const { user, setUser } = useAuth()
	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			await signOut(auth)
			await axios("/auth/logout")
			setUser({ apiUser: null, firebaseUser: null })
			navigate("/login")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Navbar bg='dark' variant='dark' expand='lg'>
				<Container fluid>
					<Navbar.Brand href='#'>Ark</Navbar.Brand>

					<Navbar.Toggle aria-controls='navbarScroll' />

					<Navbar.Collapse id='navbarScroll'>
						<Nav
							className='m-auto my-2 my-lg-0'
							style={{ maxHeight: "100px" }}
							navbarScroll></Nav>

						<Navbar.Brand href='#'>
							{user.apiUser.apiUsername}
							<Image
								src={`${user.apiUser.profilePicture}`}
								className='topbarProfilePicture'
								roundedCircle
								width='50'
								height='50'
							/>
						</Navbar.Brand>

						<Button
							variant='outline-light'
							size='sm'
							type='submit'
							onClick={handleLogout}>
							Logout
						</Button>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Topbar
