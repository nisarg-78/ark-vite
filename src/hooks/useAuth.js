import { useContext } from "react"
import { UserContext } from "../context/userContext/UserContext"

const useAuth = () => {
	return useContext(UserContext)
}

export default useAuth
