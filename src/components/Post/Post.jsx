import "./Post.css"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { UserContext } from "../../context/userContext/UserContext"

import Image from "react-bootstrap/Image"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import { Heart, Trash2 } from "react-feather"

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import { ref, deleteObject } from "firebase/storage"
import { storage } from "../../firebase"

import { useState, useEffect, useContext } from "react"

function Post({ post }) {
	TimeAgo.addLocale(en)
	const timeAgo = new TimeAgo('en-US')

	const { user } = useContext(UserContext)
	const axios = useAxiosPrivate()

	const [isLiked, setIsLiked] = useState(post.likes.includes(user.apiUser._id))
	const [likes, setLikes] = useState(post.likes.length)
	const [postUser, setPostUser] = useState({})

	const [IsDeleting, setIsDeleting] = useState(false)

	const handleDelete = () => {
		setIsDeleting(true)
		axios
			.delete(`/posts/${post._id}`, {
				headers: { Authorization: "Bearer " + user.apiUser.accessToken },
				data: {
					userId: user.apiUser._id,
				},
			})
			.then(() => {
				if (post.image) {
					const desertRef = ref(storage, post.image)
					return deleteObject(desertRef)
				}
			})
			.then(() => {
				setRefresh(!refresh)
			})
			.catch((err) => {
				console.log(err)
				setIsDeleting(false)
			})
	}

	const handleLike = async () => {
		const res = await axios.put(`/posts/${post._id}/like`, {
			userId: user.apiUser._id,
		})
		if (res.data.liked) {
			setIsLiked(true)
			setLikes((likes) => likes + 1)
		} else {
			setIsLiked(false)
			setLikes((likes) => likes - 1)
		}
	}

	useEffect(() => {
		;(async () => {
			const res = await axios.get(`users/${post.userId}`)
			setPostUser(res.data)
		})()
	}, [post._id])

	const formatter = new Intl.RelativeTimeFormat('en')
	const diff = new Date() - new Date(`${post.createdAt}`)
	const date = formatter.format(-diff / (1000*60*60*24), 'days')

	return (
		<Container className='m-0 p-0 mt-2'>
			<Card className='mt-2 text-white bg-dark card'>
				
				<div className='card-header d-flex align-items-center justify-content-between'>

					<div>
						<Image
							src={`${postUser.profilePicture}`}
							height='40'
							width='40'
							roundedCircle
							className=''
							style={{ objectFit: "cover" }}
						/>
						<b className='px-2'>{postUser.username}</b>
					</div>
					{post.userId === user.apiUser._id && (
						<Trash2 className='deletePost' onClick={handleDelete} />
					)}
				</div>

				<Card.Body className='cardBody d-flex flex-column '>
					{post.image && (
						<Card.Img style={{ width: "100%" }} src={`${post.image}`} />
					)}
					{post.description && (
						<Card.Text className={`m-2`}>{post.description}</Card.Text>
					)}
				</Card.Body>

				<Card.Footer>
					<div
						onClick={handleLike}
						className='d-flex my-1 likeButton align-items-center'>
						<Heart
							className='svg me-1'
							fill={`${isLiked ? "white" : "transparent"}`}
						/>{" "}
						<span> {likes} Likes</span>

						<span className="ms-auto text-muted"> {`${timeAgo.format(new Date(post.createdAt))}`}</span>
					</div>
				</Card.Footer>
        
			</Card>
		</Container>
	)
}

export default Post
