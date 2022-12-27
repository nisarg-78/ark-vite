import "./Post.css";
import axios from "../../api/axios";
import { UserContext } from "../../context/userContext/UserContext";

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Heart } from "react-feather";

import { useState, useEffect, useContext } from "react";

function Post({ post }) {
  const { user } = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(post.likes.includes(user.apiUser._id));
  const [likes, setLikes] = useState(post.likes.length);
  const [postUser, setPostUser] = useState({});

  
  const handleLike = async () => {
    const res = await axios.put(`/posts/${post._id}/like`, {
      userId: user.apiUser._id,
    });
    if (res.data.liked) {
      setIsLiked(true);
      setLikes((likes) => likes + 1);
    } else {
      setIsLiked(false);
      setLikes((likes) => likes - 1);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(`users/${post.userId}`);
      setPostUser(res.data);
    })();
  }, [post._id]);

  return (
    <Container>
      <Card className="my-3 text-white bg-dark">
        <div className="card-header d-flex align-items-center">
          <Image
            src={`${postUser.profilePicture}`}
            height="40"
            width="40"
            roundedCircle
            className="mx-2"
            style={{ objectFit: "cover" }}
          />
          <b>{postUser.username}</b>
        </div>
        <Card.Body className="p-0">
          <Card.Text className="px-4 py-1 m-0">{post.description}</Card.Text>
          <Card.Img
            className="mt-1"
            variant="top"
            style={{ width: "100%" }}
            src={`${post.image}`}
          />
          <Heart
            className="my-3 ms-3"
            onClick={handleLike}
            fill={`${isLiked ? "white" : "transparent"}`}
          />{" "}
          <span> {likes} Likes</span>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Post;
