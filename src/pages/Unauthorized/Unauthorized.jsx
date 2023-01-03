import "./Unauthorized.css"

import { Button } from "react-bootstrap"
import { Link, Navigate } from "react-router-dom"

import useAuth from "../../hooks/useAuth"

function Unauthorized() {
	const { user } = useAuth()

	return (

    (user.apiUser && user.firebaseUser) ? 

    <Navigate to="/" replace/>
    
    :

		<div className='d-flex min-vh-100 align-items-center text-center justify-content-center'>
			<div className='errorDiv'>
				<p>Unauthorized</p>
				<Link to={`/login`}>
					<Button variant='dark'>Login</Button>
				</Link>
			</div>
		</div>
	)
}

export default Unauthorized
