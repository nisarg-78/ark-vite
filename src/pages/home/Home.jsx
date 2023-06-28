import "./Home.css"

import Feed from "../../components/Feed/Feed"
import Search from "../../components/Search/Search"
import SideProfile from "../../components/SideProfile/SideProfile"
import Share from "../../components/Share/Share"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function Home() {
	const navigate = useNavigate()

	const handleChat = () => {
		navigate("/chat")
	}

	return (
		<>
			<Container fluid className='overflow-hidden min-vh-100'>
				<Row className='content justify-content-between'>
					<Col lg={3} className=''>
						<SideProfile />
						<Share />
					</Col>
					<Col lg={4} className='py-0'>
						<Feed />
					</Col>
					<Col lg={3}>
						<Container>
{/* 							<Button
								className='my-3 w-100'
								variant='outline-light'
								size='sm'
								type='submit'
								onClick={handleChat}>
								Chat
							</Button> */}
							<Search />
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Home
