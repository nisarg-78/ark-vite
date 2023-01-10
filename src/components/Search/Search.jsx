import "./Search.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import { useState, useEffect } from "react";
import SearchUser from "../SearchUser/SearchUser";

export default function Search() {
  const axios = useAxiosPrivate()
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
                        <SearchUser followee={item} />
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
