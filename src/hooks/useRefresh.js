import { axios } from "../api/axios"
import useAuth from "./useAuth"

export default function useRefresh() {
	const { setUser } = useAuth()

	const refresh = async () => {
		const response = await axios.get("/auth/refresh", {
			withCredentials: true,
		})
		setUser((prev) => {
			const newState = { ...prev }
			newState.apiUser.accessToken = response.data.accessToken
			return newState
		})
		return response.data.accessToken
	}

	return refresh
}
