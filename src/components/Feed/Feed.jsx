import "./Feed.css"

import { Home, TrendingUp } from "react-feather"
import InfiniteScroll from "react-infinite-scroll-component"

import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useState, useEffect, useContext } from "react"

import Post from "../Post/Post"
import { UserContext } from "../../context/userContext/UserContext"

function Feed() {
	const { user } = useContext(UserContext)
	const axios = useAxiosPrivate()
	const [refresh, setRefresh] = useState(false)
	const [homePosts, setHomePosts] = useState([])
	const [topPosts, setTopPosts] = useState([])
	const [allHomePostsFetched, setAllHomePostsFetched] = useState(false)
	const [allTopPostsFetched, setAllTopPostsFetched] = useState(false)

	const [pageSize, setPageSize] = useState(15)
	const [homePageNum, setHomePageNum] = useState(1)
	const [topPageNum, setTopPageNum] = useState(1)

	const [feedState, setFeedState] = useState("home")

	useEffect(() => {
		const fetchPosts = async () => {
			if (feedState === "home") {
				setHomePageNum(0)
				fetchHomeFeed()
			}
			if (feedState === "top") {
				setTopPageNum(0)
				fetchTopFeed()
			}
		}
		fetchPosts()
	}, [feedState])

	const fetchHomeFeed = async () => {
		if (allHomePostsFetched) return
		const res = await axios.get(`posts/feed/${user.apiUser._id}`, {
			params: { page: homePageNum, pageSize },
		})
		if (res.data.length < pageSize) setAllHomePostsFetched(true)
		setHomePosts((posts) => posts.concat(res.data))
		setHomePageNum(homePageNum + 1)
	}
	
	const fetchTopFeed = async () => {
		if (allTopPostsFetched) return
		const res = await axios.get(`posts/top`, {
			params: { page: topPageNum, pageSize },
		})
		if (res.data.length < pageSize) setAllTopPostsFetched(true)
		setTopPosts((posts) => posts.concat(res.data))
		setTopPageNum(topPageNum + 1)
	}

	return (
		<>
			<div className='feedContainer'>
				<div className='feedButtons'>
					<Home
						className='feedButton'
						size={24}
						color={feedState === "home" ? "white" : "gray"}
						onClick={() => {
							setFeedState("home")
						}}>
						Home
					</Home>
					<TrendingUp
						className='feedButton'
						size={24}
						color={feedState === "top" ? "white" : "gray"}
						onClick={() => {
							setFeedState("top")
						}}>
						Top
					</TrendingUp>
				</div>
				<div className='container d-flex flex-column p-0 align-items-center mt-0 pb-3 feed'>
					<InfiniteScroll
						dataLength={feedState === "home" ? homePosts.length : topPosts.length}
						next={
							feedState === "home" ? fetchHomeFeed : fetchTopFeed
						}
						hasMore={
							feedState === "home"
								? !allHomePostsFetched
								: !allTopPostsFetched
						}>
						{feedState === "home"
							? homePosts.map(function (post) {
									return <Post key={post._id} post={post} />
							  })
							: topPosts.map(function (post) {
									return <Post key={post._id} post={post} />
							  })}
					</InfiniteScroll>
				</div>
			</div>
		</>
	)
}

export default Feed
