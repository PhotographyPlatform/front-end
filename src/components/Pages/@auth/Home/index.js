import React, { useEffect, useState } from "react";
import { homeSocket } from "../../../../App";
import { Search2Icon } from "@chakra-ui/icons";
import { setSearchWord } from "../../../../store/reducers/Search";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Posts from "../../../components/posts";
import "./Home.scss";
import { decodeToken } from "react-jwt";
import cookies from "react-cookies";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

function Home() {
  const [homePosts, sethomePosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const Navigator = useNavigate();

  const setSearchWorldHandler = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value.trim() !== "") {
      dispatch(setSearchWord(e.target.value));
      Navigator("/search");
    }
  };

  const token = cookies.load("user_session");
  const parsedToken = decodeToken(token);

  console.log(parsedToken.userId);

  useEffect(() => {
    try {
      const token = cookies.load('user_session');
      setLoading(true);
      const response = axios.get(
        `http://localhost:3002/home`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      response.then((data) => {
        console.log(data, "!!!!!!!!!!!!!!!");
        sethomePosts(data.data);
        setLoading(false);
      });
    } catch (e) {
      console.log("error while fetching home posts");
    }
  }, []);

  return homePosts.length===0 ? (
    <div className="auth-profile">
      <div className="search-bar-home">
        <Search2Icon className="search-icon-home" />
        <input
          type="search"
          placeholder="Type your search.."
          maxLength={30}
          onKeyDown={setSearchWorldHandler}
        />
      </div>
      {loading?  (<Spinner
            thickness="3px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />) : (<Posts posts={homePosts} />)}
    </div>
  ) : (
    <div className="welcome">
      <div className="welcome-container">
        <h1>Welcome</h1>
        <p>
          It looks like you are new here, press on the button below so
          you can search and discover more
        </p>
        <div>
          <button onClick={()=>Navigator("/search")}>Discover &rarr;</button>
        </div>
      </div>
    </div>
  );

}

export default Home;