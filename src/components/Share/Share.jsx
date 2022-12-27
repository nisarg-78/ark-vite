import "./Share.css";
import axios from "../../api/axios";
import { UserContext } from "../../context/userContext/UserContext";

import { useState, useContext, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { X, Image } from "react-feather";

function Share() {
  const { user } = useContext(UserContext);

  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleSubmit = async (e) => {
    try {
      console.log(postDescription);
      setIsSharing(true);
      e.preventDefault();

      if (!postDescription && !postImage) return;

      const newPost = {
        description: "",
        image: "",
      };

      if (postDescription) newPost.description = postDescription;
      //   if (postImage) newPost.image = await uploadToFirebase(postImage)

      try {
        console.log("before post");
        await axios.post(
          "/posts",
          {
            userId: user.apiUser._id,
            post: newPost,
          },
        );
        console.log("after post");
      } catch {
        // if (newPost.image) {
        //   const desertRef = ref(storage, newPost.post.image);
        //   deleteObject(desertRef);
        //   return;
        // }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPostDescription("");
      setPostImage(null);
      //   setRefresh(!refresh);
    }
  };

  return (
    <div className="m-3">
      <Form.Control
        type="text"
        style={{ border: "none" }}
        className="bg-dark text-light"
        placeholder="Create Post"
        onChange={(e) => setPostDescription(e.target.value)}
      />

      <label htmlFor="postImage" className="shareOption my-2">
        <Image color="white" />
        <span className="imageAdd p-1">Photo/GIF</span>
        <input
          type="file"
          id="postImage"
          accept=".png, .jpeg, .jpg, .gif, .tiff, .webm, "
          onChange={(event) => {
            setPostImage(event.target.files[0]);
          }}
          style={{ display: "none" }}
        />
      </label>

      {postImage && (
        <div className="imagePreview">
          <X className="imageClose" onClick={() => setPostImage(null)} />

          <Card.Img
            variant="top"
            height={250}
            style={{ objectFit: "cover" }}
            src={postImage ? URL.createObjectURL(postImage) : null}
          />
        </div>
      )}
      <div className="d-grid gap-2 my-1">
        <Button variant="light" onClick={handleSubmit}>
          Post
        </Button>
      </div>
    </div>
  );
}

export default Share;
