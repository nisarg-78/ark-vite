import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequireAuth = () => {
	const { user } = useAuth()
	const location = useLocation()

	return (user.apiUser && user.firebaseUser) ? (
		<Outlet />
	) : (
		<Navigate to='/unauthorized' state={{ from: location }} replace />
	)
}

export default RequireAuth
