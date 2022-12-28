import "./Feed.css";
import axios from "../../api/axios";
import { useContext, useState, useEffect } from "react";

import { UserContext } from "../../context/userContext/UserContext";

import Post from "../Post/Post";

function Feed() {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  //   const handleRefreshFeed = () => {
  //     setRefresh(!refresh);
  //   };

  //   const handleTop = () => {
  //     setPosts((posts) =>
  //       posts.sort((a, b) => (a.likes.length > b.likes.length ? -1 : 1))
  //     );
  //   };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`posts/feed/top`);
      // const res = await axios.get(`posts/feed/${user._id}`);
      let resPosts = res.data;
      resPosts = res.data.sort((a, b) => (a.likesCount > b.likesCount ? -1 : 1));
      setPosts(resPosts);
    };
    fetchPosts();
  }, [refresh]);

  return (
    <div className="container d-flex flex-column align-items-center mt-2 feed">
      {posts.map(function (post) {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}

export default Feed;
