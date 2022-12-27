import "./SideProfile.css";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { X, Image } from "react-feather";
import { useContext, useState } from "react";

import axios from "../../api/axios";
import { UserContext } from "../../context/userContext/UserContext";

function SideProfile() {
  const { user } = useContext(UserContext);

  const [alertType, setAlertType] = useState("success");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const [userImage, setUserImage] = useState(user.apiUser.profilePicture);
  const [description, setDescription] = useState(
    user.apiUser.description || ""
  );
  const [profileChangeButtonDisable, setProfileChangeButtonDisable] =
    useState(false);

  const [profileModal, setProfileModal] = useState(false);
  const handleClose = () => setProfileModal();
  const handleShow = () => setProfileModal(true);

  const bootstrapAlert = (type, msg, time = 4000) => {
    setAlertType(type);
    setAlertMsg(msg);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertType("");
      setAlertMsg("");
      setAlertVisible(false);
    }, time);
  };

  const handleProfileEdit = async () => {
    if (!description) return;
    setProfileChangeButtonDisable(true);

    try {
      const res = await axios.patch(`/users/action/${user.apiUser._id}`, {
        description,
      });
      setProfileChangeButtonDisable(false);

      bootstrapAlert(
        "success",
        "Profile has been updated. Refresh to see changes."
      );
    } catch (error) {
      setProfileChangeButtonDisable(false);
      bootstrapAlert("danger", "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Card className="m-3 bg-dark text-light">
        <Card.Img
          variant="top"
          height={250}
          style={{ objectFit: "cover" }}
          src={`${user.apiUser.profilePicture}`}
        />
        <Card.Body>
          <Card.Title>{user.apiUser.username}</Card.Title>
          <Card.Text>{user.apiUser.description}</Card.Text>
          <Button size="sm" variant="outline-light" onClick={handleShow}>
            Edit Profile
          </Button>
        </Card.Body>
      </Card>

      <Modal
        show={profileModal}
        onHide={handleClose}
        centered
        className="text-light modalCustom"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userImage && (
            <>
              <div className="userImagePreview">
                <X
                  className="imageClose"
                  color="white"
                  onClick={() => setUserImage(user.apiUser.profilePicture)}
                />
                <Card.Img
                  variant="top"
                  height={250}
                  style={{ objectFit: "contain" }}
                  src={userImage || null}
                />
              </div>
            </>
          )}

          <label htmlFor="userImage" className="shareOption my-2">
            <Image color="white" />
            <span className="p-1">Change</span>
            <input
              type="file"
              id="userImage"
              accept=".png, .jpeg, .jpg, .gif, .tiff, .webm, "
              onChange={(event) => {
                setUserImage(URL.createObjectURL(event.target.files[0]));
              }}
              style={{ display: "none" }}
            />
          </label>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
            <Form.Control
              disabled
              defaultValue={user.apiUser.username}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Status
            </InputGroup.Text>
            <Form.Control
              defaultValue={description}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer className="">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleProfileEdit}
            disabled={profileChangeButtonDisable}
          >
            Save Changes
          </Button>
        </Modal.Footer>
        ;
      </Modal>
      <Alert
        className="bootstrapAlert position-fixed position-absolute bottom-0 start-50 translate-middle"
        variant={alertType}
        show={alertVisible}
      >
        {alertMsg}
      </Alert>
    </>
  );
}

export default SideProfile;
