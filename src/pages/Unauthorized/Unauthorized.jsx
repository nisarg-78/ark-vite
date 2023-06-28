import "./Unauthorized.css"

import { Button, Container } from "react-bootstrap"
import { Link, Navigate } from "react-router-dom"

import useAuth from "../../hooks/useAuth"

function Unauthorized() {
	const { user } = useAuth()

	return user?.apiUser?.accessToken && user?.firebaseUser?.accessToken ? (
		<Navigate to='/' replace />
	) : (
		<div className='d-flex min-vh-100 align-items-center text-center justify-content-center'>
			<div className='errorDiv'>
				<p>Unauthorized</p>
						<Link to={`/login`}>
							<Button variant='outline-light'>Login</Button>
						</Link>
						{" "}
						<Link to={`/signup`}>
							<Button variant='outline-light'>Signup</Button>
						</Link>
			</div>
		</div>
	)
}

export default Unauthorized
