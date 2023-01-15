import "./App.css"

import Layout from "./components/Layout"
import Home from "./pages/home/Home"
import Chat from "./pages/chat/Chat"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Error from "./pages/error/Error"
import RequireAuth from "./components/RequireAuth"
import Unauthorized from "./pages/Unauthorized/Unauthorized"
import Topbar from "./components/Navbar/Topbar"

import { auth } from "./firebase"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import useAxiosPrivate from "./hooks/useAxiosPrivate"
import useAuth from "./hooks/useAuth"

function App() {
	const { setUser } = useAuth()
	const axios = useAxiosPrivate()

	useEffect(() => {
		;(async () => {
			try {
				const res = await axios.get("/auth/islogged")
				const apiUser = res.data

				if (apiUser) {
					setUser((prev) => {
						return { ...prev, apiUser }
					})
				}

				auth.onAuthStateChanged((firebaseUser) => {
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
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route element={<RequireAuth />}>
							<Route index element={<Home />} />
							<Route path='chat' element={<Chat />} />
						</Route>
						<Route path='login' element={<Login />} />
						<Route path='signup' element={<Signup />} />
						<Route path='unauthorized' element={<Unauthorized />} />
						<Route path='*' element={<Error />} />
					</Route>
				</Routes>
			</Router>
		</>
	)
}

export default App
