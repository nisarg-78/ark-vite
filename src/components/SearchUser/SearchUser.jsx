import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { UserContext } from "../../context/userContext/UserContext";
import { useState, useContext } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

export default function SearchUser({ followee }) {
  const { user } = useContext(UserContext);
  const axios = useAxiosPrivate()
  const [isFollowing, setIsFollowing] = useState(
    user.apiUser.following.includes(followee._id)
  );

  const handleFollow = () => {
    setIsFollowing((isFollowing => !isFollowing))
    axios
      .put(`/users/${followee._id}/follow`, { userId: user.apiUser._id })
      .then((res) => setIsFollowing(res.data.follow))
      .catch(setIsFollowing((isFollowing => !isFollowing)))
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <Image
            src={followee.profilePicture}
            height="40"
            width="40"
            roundedCircle
            className="me-2"
            style={{ objectFit: "cover" }}
          />
          <b>{followee.username}</b>
        </div>

        {user.apiUser._id === followee._id ? (
          <></>
        ) : (
          <Button onClick={handleFollow} variant={isFollowing ? "outline-light" : "light"}>
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
      </div>
    </>
  );
}
