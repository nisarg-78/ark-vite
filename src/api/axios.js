import { default as Axios } from "axios"
import { apiUrl } from "./urls"

export const axios = Axios.create({
	"Content-Type": "application/json",
	Accept: "application/json",
	withCredentials: true,
	baseURL: apiUrl,
})

export const axiosPrivate = Axios.create({
	"Content-Type": "application/json",
	Accept: "application/json",
	withCredentials: true,
	baseURL: apiUrl,
})
