import "./chat.css"
import socketIOClient from "socket.io-client"
const ENDPOINT = "http://127.0.0.1:8100"
import {
	Container,
	Row,
	Col,
	InputGroup,
	Button,
	Placeholder,
} from "react-bootstrap"
import Form from "react-bootstrap/Form"
import ListGroup from "react-bootstrap/ListGroup"
import Spinner from "react-bootstrap/Spinner"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useState, useEffect } from "react"
import { Plus } from "react-feather"

export default function Chat() {
	const axios = useAxiosPrivate()

	const [message, setMessage] = useState()
	const [reply, setReply] = useState("Send a message to GPT")
	const [waiting, setWaiting] = useState(false)

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT)
		socket.on("connect", () => {
			console.log("connect")
		})

		socket.on("disconnect", () => {
			console.log("disconnect")
		})

		socket.on("pong", () => {
			setLastPong(new Date().toISOString())
		})

		return () => {
			socket.off("connect")
			socket.off("disconnect")
			socket.off("pong")
		}
	}, [])

	const handleSendMessage = async (e) => {
		setWaiting(true)
		e.preventDefault()
		const query = {
			prompt: message,
			max_tokens: 1024,
		}
		setMessage("")
		setReply("")
		const gptReply = await axios.post("/gpt/message", query)
		setReply(gptReply.data)
		setWaiting(false)
	}

	return (
		<main className='chat-container'>
			<Container className='p-5 overflow-hidden vh-100 text-white'>
				<Row className='h-100'>
					<Col>
						<Button variant='dark' className='my-2 w-100'>
							Add Conversation <Plus />
						</Button>
						<ListGroup>
							<ListGroup.Item action active>
								GPT
							</ListGroup.Item>
							<ListGroup.Item action variant='dark'>
								dummy
							</ListGroup.Item>
							<ListGroup.Item action variant='dark'>
								dummy
							</ListGroup.Item>
							<ListGroup.Item action variant='dark'>
								dummy
							</ListGroup.Item>
							<ListGroup.Item action variant='dark'>
								dummy
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col
						md={8}
						className='d-flex justify-content-between flex-column chat-box'>
						<Row className='my-2'>
							{/* <span>max: {maxTokens}</span> */}
							{/* <hr /> */}
							<span>
								{reply || (
									<Placeholder animation='glow'>
										<Placeholder xs={7} />{" "}
										<Placeholder xs={4} />{" "}
										<Placeholder xs={8} />
									</Placeholder>
								)}
							</span>
						</Row>
						<Row>
							<Form onSubmit={handleSendMessage} className='p-2'>
								<Form.Control
									autoFocus={true}
									className='bg-dark text-light'
									type='text'
									onChange={(e) => {
										setMessage(e.target.value)
									}}
									value={message}
									as='textarea'
									rows={3}
								/>
								{/* <Form.Range onChange={(e) => {setMaxtokens(e.target.value*10)}} /> */}
								<Button
									style={{ width: "10ch" }}
									className='my-2'
									type='submit'
									variant='outline-light'
									disabled={waiting}>
									{waiting ? (
										<Spinner animation='grow' size='sm' />
									) : (
										"Send"
									)}
								</Button>
							</Form>
						</Row>
					</Col>
				</Row>
			</Container>
		</main>
	)
}
