import "./App.css"

import Layout from "./components/Layout"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Error from "./pages/error/Error"
import RequireAuth from "./components/RequireAuth"
import Unauthorized from "./pages/Unauthorized/Unauthorized"
import Protected from "./components/Protected/Protected"

import { auth } from "./firebase"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "./api/axios"
import useAuth from "./hooks/useAuth"

function App() {
	const { setUser } = useAuth()

	useEffect(() => {
		;(async () => {
			try {
				const res = await axios.get("/auth/islogged")
				const apiUser = res.data

				if (apiUser) {
					setUser((prev) => {
						return { ...prev, apiUser }
					})
					axios.defaults.headers.common = {
						Authorization: `Bearer ${apiUser.accessToken}`,
					}
				}

				auth.onAuthStateChanged((firebaseUser) => {
					console.log(firebaseUser)

					if (firebaseUser) {
						setUser((prev) => {
							return { ...prev, firebaseUser }
						})
					} else {
						setUser((prev) => {
							return { ...prev, firebaseUser: null }
						})
					}
				})
			} catch (error) {
				setUser(null)
				console.log(error)
			}
		})()
	}, [])

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route element={<RequireAuth />}>
						<Route index element={<Home />} />
					</Route>
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Signup />} />
					<Route path='unauthorized' element={<Unauthorized />} />
					<Route path='*' element={<Error />} />
				</Route>
			</Routes>
		</Router>
	)
}

export default App
