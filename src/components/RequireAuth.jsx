import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Topbar from "./Navbar/Topbar"
import Unauthorized from "../pages/Unauthorized/Unauthorized"

const RequireAuth = ({ children }) => {
	const { user } = useAuth()
	const location = useLocation()

	return user.apiUser && user.firebaseUser ? (
		<>
			<Topbar />
			<Outlet />
		</>
	) : (
		children
		// <Navigate to='/unauthorized' state={{ from: location }} replace />
	)
}

export default RequireAuth
