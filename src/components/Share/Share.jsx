import "./Share.css"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { UserContext } from "../../context/userContext/UserContext"

import { useState, useContext } from "react"

import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import InputGroup from "react-bootstrap/InputGroup"
import { X, Image } from "react-feather"
import uploadImage from "../../api/uploadImage"

function Share() {
	const { user } = useContext(UserContext)
	const axios = useAxiosPrivate()

	const [postDescription, setPostDescription] = useState("")
	const [postImage, setPostImage] = useState(null)
	const [isSharing, setIsSharing] = useState(false)
	const [shareModal, setShareModal] = useState(false)
	const handleClose = () => {
    setPostImage(null)
    setPostDescription("")
    setShareModal(false) 
  }
	const handleShow = () => setShareModal(true)

	const handleSubmit = async (e) => {
		try {
			setIsSharing(true)
			e.preventDefault()
			if (!postDescription && !postImage) return

			const newPost = {
				description: "",
				image: "",
			}

			if (postDescription) {
				newPost.description = postDescription
			}
			if (postImage) {
				newPost.image = await uploadImage(postImage)
			}

			await axios.post("/posts", {
				userId: user.apiUser._id,
				post: newPost,
			})
		} catch (error) {
			console.log(error)
		} finally {
			setPostDescription("")
			setPostImage(null)
      setIsSharing(false)
      setShareModal(false)
		}
	}

	return (
		<div className="text-center">
			<Modal
				show={shareModal}
				onHide={handleClose}
				centered
				className='text-light modalCustom'
				backdrop='static'
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Create Post</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{user.apiUser.profilePicture && (
						<>
							<div className='shareImagePreview'>
								<Card.Img
									variant='top'
									height={250}
									style={{ objectFit: "contain" }}
									src={postImage ? URL.createObjectURL(postImage) : ''}
								/>
							</div>
						</>
					)}

					<label htmlFor='shareImage' className='shareOption my-2'>
						<Image color='white' />
						<span className='p-1'>Change</span>
						<input
							type='file'
							id='shareImage'
							accept='.png, .jpeg, .jpg, .gif, .tiff, .webm, '
							onChange={(event) => {
								setPostImage(event.target.files[0])
							}}
							style={{ display: "none" }}
						/>
					</label>

					<InputGroup className='mb-3'>
						<InputGroup.Text id='inputGroup-sizing-default'>
							Description
						</InputGroup.Text>
						<Form.Control
							defaultValue={postDescription}
							aria-label='Default'
							aria-describedby='inputGroup-sizing-default'
							onChange={(e) => setPostDescription(e.target.value)}
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer className=''>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={handleSubmit}
						disabled={isSharing}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			<Button size='sm' variant='light' className="w-100" onClick={handleShow}>
				Create Post
			</Button>
		</div>
	)
}

export default Share
