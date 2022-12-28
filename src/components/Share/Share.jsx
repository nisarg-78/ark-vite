import "./Share.css";
import axios from "../../api/axios";
import { UserContext } from "../../context/userContext/UserContext";

import { useState, useContext } from "react";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { X, Image } from "react-feather";
import uploadImage from "../../api/uploadImage";

function Share() {
  const { user } = useContext(UserContext);

  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setIsSharing(true);
      e.preventDefault();
      if (!postDescription && !postImage) return;

      const newPost = {
        description: "",
        image: "",
      };

      if (postDescription) {
        newPost.description = postDescription;
      }
      if (postImage) {
        newPost.image = await uploadImage(postImage);
      }

      await axios.post("/posts", {
        userId: user.apiUser._id,
        post: newPost,
      });

    } catch (error) {
      console.log(error);
    } finally {
      setPostDescription("");
      setPostImage(null);
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
        <Button disabled={isSharing} variant="light" onClick={handleSubmit}>
          Post
        </Button>
      </div>
    </div>
  );
}

export default Share;
