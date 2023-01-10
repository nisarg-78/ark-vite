//attach intercepter to axios

import { axiosPrivate } from "../api/axios"
import { useEffect } from "react"
import useRefresh from "./useRefresh"
import useAuth from "./useAuth"

const useAxiosPrivate = () => {
	const refresh = useRefresh()
	const { user } = useAuth()

	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config) => {
				if (!config.headers.authorization) {
					config.headers.authorization = `Bearer ${user?.apiUser?.accessToken}`
				}
				return config
			},
			(error) => Promise.reject(error)
		)

		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config
				if (error?.response?.status === 401 && !prevRequest?.sent) {
					prevRequest.sent = true
					const newAccessToken = await refresh()
					prevRequest.headers.authorization = `Bearer ${newAccessToken}`
					return axiosPrivate(prevRequest)
				}
				return Promise.reject(error)
			}
		)

		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept)
			axiosPrivate.interceptors.response.eject(responseIntercept)
		}
	}, [user, refresh])

	return axiosPrivate
}

export default useAxiosPrivate
