import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveCategory,
  setSearchWord,
} from "../../../../store/reducers/Search";
import Posts from "../../../components/posts";
import Users from "./Users";
import Cookies from "react-cookies";
import { useNavigate } from "react-router-dom";
import "./Results.scss";
import { Box, CircularProgress, Spinner } from "@chakra-ui/react";
import { decodeToken } from "react-jwt";
import { ArrowBackIcon } from "@chakra-ui/icons";



function Results() {
  const navigate = useNavigate();
  const state = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const [searchresults, setSearchresults] = useState({});
  const [searchCategoryresults, setSearchCategoryresults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isdragging, setIsdragging] = useState(false);
  const URL = process.env.REACT_APP_URL;

  // handle the user profile
  const profileHandler = (id) => {
    Cookies.remove("id");
    Cookies.save("id", id);
    const token = Cookies.load("user_session");
    const parsed = decodeToken(token);
    if (id === parsed.userId) {
      navigate("/profile");
    } else {
      navigate("/userProfile");
    }
  };

  useEffect(() => {
    const obj = {
      searchWord: state.searchWord,
    };

    try {
      if (state.searchWord !== "") {
        setLoading(true);
        const response = axios.post(`${URL}/search`, obj);
        response.then((data) => {
          const searchUsers = data.data.users;
          const searchPosts = data.data.posts.filter(
            (item) => !item.challengeID && !item.challengeName
          );
          const searchResult = {
            users: searchUsers,
            posts: searchPosts,
          };
          setSearchresults(searchResult);
          setLoading(false);
        });
      }
    } catch (e) {
      console.log("search by users and posts results error", e);
    }
  }, [state.searchWord]);

  useEffect(() => {
    const searchCtegory = state.activeCategory;

    try {
      if (state.activeCategory !== "") {
        setLoading(true);
        const response = axios.get(
          `${URL}/searchCategory/${searchCtegory}`
        );
        response.then((data) => {
          setSearchCategoryresults(data.data.searchResults);
        });
        setLoading(false);
      }
    } catch (e) {
      console.log("search by category results error", e);
    }
  }, [state.activeCategory]);

  const backHandler = () => {
    dispatch(setSearchWord(""));
    dispatch(setActiveCategory(""));
  };

  function handleMouseMove(e) {
    const tagsBox = document.querySelector(".nav-tags");
    if (isdragging) {
      tagsBox.classList.add("dragging");
      tagsBox.scrollLeft -= e.movementX;
    }
  }

  function stopDragging() {
    const tagsBox = document.querySelector(".nav-tags");
    setIsdragging(false);
    tagsBox.classList.remove("dragging");
  }

  function moveSliderOnClick(button) {
    const tagsBox = document.querySelector(".nav-tags");
    tagsBox.scrollLeft += button === "left" ? -350 : 350;
  }

  return (
    <div className="result-container">
      <div className="top-flex">
        <div>
          <button onClick={backHandler}>
            <u>
              <ArrowBackIcon boxSize={8} />
            </u>
          </button>
        </div>
        <div>
          {state.searchWord !== "" && state.activeCategory === "" && (
            <div className="result-flex">
              <p>total results: </p>
              <p>
                {searchresults.users && searchresults.posts
                  ? searchresults.users.length + searchresults.posts.length
                  : 0}
              </p>
            </div>
          )}
          {state.searchWord === "" && state.activeCategory !== "" && (
            <p>
              results:{" "}
              {searchCategoryresults ? searchCategoryresults.length : 0}
            </p>
          )}
        </div>
      </div>

      {state.searchWord !== "" && state.activeCategory === "" && (
        <div className="search-results">
          <div className="users-section">
            <b>
              Users:{" "}
              <b>{searchresults.users ? searchresults.users.length : 0}</b>
            </b>
            <small>
              <i>
                {searchresults.users ? searchresults.users.length : 0} users
                found for the search word '{state.searchWord}'
              </i>
            </small>

            <div className="all-users-flex">
              {!loading ? (
                searchresults.users &&
                searchresults.users.map((item) => (
                  <Users
                    handler={profileHandler}
                    id={item.id}
                    key={item.id}
                    username={item.username}
                    profilePic={item.img}
                  />
                ))
              ) : (
                <Spinner
                  thickness="3px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              )}
            </div>
          </div>

          <div className="posts-section">
            <b>
              Posts:{" "}
              <b>{searchresults.posts ? searchresults.posts.length : 0}</b>
            </b>
            <small>
              <i>
                {searchresults.posts ? searchresults.posts.length : 0} posts
                found for the search word '{state.searchWord}'
              </i>
            </small>

            {!loading ? (
              searchresults.posts && <Posts posts={searchresults.posts} />
            ) : (
              <Spinner
                thickness="3px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
          </div>
        </div>
      )}

      {state.searchWord === "" && state.activeCategory !== "" && (
        <div>
          <div className="tag-navigator-cont">
            <div className="tag-navigator">
              <div className="tag-navigator-arrow">
                <h4 className="arrow" onClick={() => moveSliderOnClick("left")}>
                  &#60;
                </h4>
              </div>
              <ul
                className="nav-tags"
                onMouseMove={handleMouseMove}
                onMouseDown={() => setIsdragging(true)}
                onMouseUp={stopDragging}
              >
                {state.categories.map((item) => (
                  <li
                    className="nav-tag"
                    onClick={() => dispatch(setActiveCategory(item.name))}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
              <div className="tag-navigator-arrow">
                <h4
                  className="arrow"
                  onClick={() => moveSliderOnClick("right")}
                >
                  &#62;
                </h4>
              </div>
            </div>
          </div>

          <div className="posts-section">
            <small>
              <i>
                {searchCategoryresults ? searchCategoryresults.length : 0} posts
                found containing the category '{state.activeCategory}'
              </i>
            </small>

            {/* <p className="active-category">{state.activeCategory}</p> */}

            {!loading ? (
              <Posts posts={searchCategoryresults} />
            ) : (
              <Spinner
                thickness="3px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
