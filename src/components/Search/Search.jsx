import './Search.css'
import axios from "../../api/axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";

import { useState, useEffect } from "react";

export default function Search() {
  const [searchInput, setSearchInput] = useState();
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (e) => {
    try {
      if (!searchInput) return;
      let result = await axios.post(`/search/?text=${searchInput}`);
      // 0 for user, 1 for post
      result = result.data[0].concat(result.data[1]);
      setSearchResult(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchInput]);

  return (
    <Container fluid className="my-3">
      <Row>
        <Col>
          <Form.Control
            type="text"
            className="bg-dark text-light"
            style={{ border: "1px solid black" }}
            placeholder="Search Users or Posts"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup className="my-2">
            {searchInput && (
              <>
                {searchResult.map((item) => {
                  return (
                    <ListGroup.Item
                      key={item._id}
                      className="bg-dark text-light searchItem"
                    >
                      {item.username ? (
                        <div className="">
                          <Image
                            src={item.profilePicture}
                            height="40"
                            width="40"
                            roundedCircle
                            className="me-2"
                            style={{ objectFit: "cover" }}
                          />
                          {/* <Link to={`/profile/${item.username}`}> */}{" "}
                          <b>{item.username}</b>  {/* </Link> */}
                        </div>
                      ) : (
                        item.description
                      )}
                    </ListGroup.Item>
                  );
                })}
              </>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
