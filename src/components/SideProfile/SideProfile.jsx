import "./SideProfile.css"

import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import { X, Image } from "react-feather"
import { useContext, useState } from "react"
import { ref, deleteObject } from "firebase/storage"
import { storage } from "../../firebase"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { UserContext } from "../../context/userContext/UserContext"
import useAlert from "../../hooks/useAlert"
import uploadImage from "../../api/uploadImage"

function SideProfile() {
	const { user } = useContext(UserContext)
	const axios = useAxiosPrivate()
	const { setAlert } = useAlert()

	const [selectedImage, setSelectedImage] = useState(null)

	const [description, setDescription] = useState(
		user.apiUser.description || ""
	)
	const [profileChangeButtonDisable, setProfileChangeButtonDisable] =
		useState(false)
	const [profileModal, setProfileModal] = useState(false)
	const handleClose = () => setProfileModal()
	const handleShow = () => setProfileModal(true)

	const handleProfileEdit = async () => {
		if (!description && selectedImage === user.apiUser.profilePicture)
			return
		setProfileChangeButtonDisable(true)

		const profileUpdates = {}

		if (description) profileUpdates.description = description

		//upload image to firebase
		try {
			if (selectedImage !== user.apiUser.profilePicture)
				profileUpdates.profilePicture = await uploadImage(selectedImage)
		} catch (error) {
			console.log(error)
			return
		}

		//update profile in api
		try {
			await axios.patch(
				`/users/${user.apiUser._id}`,
				profileUpdates
			)
			setAlert("Profile changed, refresh to see changes", "success")
			setProfileChangeButtonDisable(false)
		} catch (error) {
			//remove image from firebase
			const desertRef = ref(storage, profileUpdates.selectedImage)
			deleteObject(desertRef)
			setAlert("Something went wrong. Please try again.", "danger")
			setProfileChangeButtonDisable(false)
		}
	}

	return (
		<>
			<Card className='my-3 bg-dark text-light'>
				<Card.Img
					variant='top'
					height={250}
					style={{ objectFit: "cover" }}
					src={`${user.apiUser.profilePicture}`}
				/>
				<Card.Body>
					<Card.Title>{user.apiUser.username}</Card.Title>
					<Card.Text>{user.apiUser.description}</Card.Text>
					<Button
						size='sm'
						variant='outline-light'
						onClick={handleShow}>
						Edit Profile
					</Button>
				</Card.Body>
			</Card>

			<Modal
				show={profileModal}
				onHide={handleClose}
				centered
				className='text-light modalCustom'
				backdrop='static'
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{user.apiUser.profilePicture && (
						<>
							<div className='userImagePreview'>
								<X
									className='imageClose'
									color='white'
									onClick={() => setSelectedImage(null)}
								/>
								<Card.Img
									variant='top'
									height={250}
									style={{ objectFit: "contain" }}
									src={
										selectedImage
											? URL.createObjectURL(selectedImage)
											: user.apiUser.profilePicture
									}
								/>
							</div>
						</>
					)}

					<label htmlFor='userImage' className='shareOption my-2'>
						<Image color='white' />
						<span className='p-1'>Change</span>
						<input
							type='file'
							id='userImage'
							accept='.png, .jpeg, .jpg, .gif, .tiff, .webm, '
							onChange={(event) => {
								setSelectedImage(event.target.files[0])
							}}
							style={{ display: "none" }}
						/>
					</label>

					<InputGroup className='mb-3'>
						<InputGroup.Text id='basic-addon1'>
							Name
						</InputGroup.Text>
						<Form.Control
							disabled
							defaultValue={user.apiUser.username}
							placeholder='Username'
							aria-label='Username'
							aria-describedby='basic-addon1'
						/>
					</InputGroup>

					<InputGroup className='mb-3'>
						<InputGroup.Text id='inputGroup-sizing-default'>
							Status
						</InputGroup.Text>
						<Form.Control
							defaultValue={description}
							aria-label='Default'
							aria-describedby='inputGroup-sizing-default'
							onChange={(e) => setDescription(e.target.value)}
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer className=''>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={handleProfileEdit}
						disabled={profileChangeButtonDisable}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default SideProfile
