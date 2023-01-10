import "./Feed.css"

import { Home, TrendingUp } from "react-feather"

import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useState, useEffect, useContext } from "react"

import Post from "../Post/Post"
import { UserContext } from "../../context/userContext/UserContext"

function Feed() {
	const { user } = useContext(UserContext)
	const axios = useAxiosPrivate()
	const [refresh, setRefresh] = useState(false)
	const [posts, setPosts] = useState([])

	const [feedState, setFeedState] = useState()

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get(`posts/feed/${user.apiUser._id}`)
			let resPosts = res.data
			resPosts = res.data.sort((a, b) =>
				a.createdAt > b.createdAt ? -1 : 1
			)
			setPosts(resPosts)
			setFeedState("home")
		}
		fetchPosts()
	}, [refresh])

	const fetchHomeFeed = async () => {
		const res = await axios.get(`posts/feed/${user.apiUser._id}`)
		let resPosts = res.data
		resPosts = res.data.sort((a, b) =>
			a.likesCount > b.likesCount ? -1 : 1
		)
		setPosts(resPosts)
		setFeedState("home")
	}
	const fetchTopFeed = async () => {
		const res = await axios.get(`posts/top`)
		let resPosts = res.data
		resPosts = res.data.sort((a, b) =>
			a.likesCount > b.likesCount ? -1 : 1
		)
		setPosts(resPosts)
		setFeedState("top")
	}

	return (
		<>
			<div className='feedContainer'>
				<div className='feedButtons'>
					<Home
						className='feedButton'
						size={24}
						color={feedState === "home" ? "white" : "gray"}
						onClick={fetchHomeFeed}>
						Home
					</Home>
					<TrendingUp
						className='feedButton'
						size={24}
						color={feedState === "top" ? "white" : "gray"}
						onClick={fetchTopFeed}>
						Top
					</TrendingUp>
				</div>
				<div className='container d-flex flex-column p-0 align-items-center mt-0 pb-3 feed'>
					{posts.map(function (post) {
						return <Post key={post._id} post={post} />
					})}
				</div>
			</div>
		</>
	)
}

export default Feed
