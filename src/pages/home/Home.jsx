import "./Home.css";

import Feed from "../../components/Feed/Feed";
import Topbar from "../../components/Navbar/Topbar";
import Search from "../../components/Search/Search"
import SideProfile from "../../components/SideProfile/SideProfile";
import Share from "../../components/Share/Share";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
  return (
    <>
      <Container fluid className="overflow-hidden min-vh-100">
        <Row>
          <Topbar />
        </Row>
        <Row className="content justify-content-between">
          <Col lg={3} className="">
            <SideProfile/>
            <Share />
          </Col>
          <Col lg={4} className='py-0'>
            <Feed/>
          </Col>
          <Col lg={3}>
            <Search />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
