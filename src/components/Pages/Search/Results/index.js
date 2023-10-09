import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveCategory,
  setSearchWord,
} from "../../../../store/reducers/Search";
import "./Results.scss";
import Post from "../../../components/posts/Post";
import Posts from "../../../components/posts";
import Users from "./Users";

function Results() {
  const state = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const [searchresults, setSearchresults] = useState({});
  const [searchCategoryresults, setSearchCategoryresults] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(searchresults);

  useEffect(() => {
    const obj = {
      searchWord: state.searchWord,
    };

    try {
      if (state.searchWord !== "") {
        setLoading(true);
        const response = axios.post("http://localhost:3002/search", obj);
        response.then((data) => {
          setSearchresults(data.data);
          // console.log(obj, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          // console.log(data.data, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
          // console.log(data, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
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
          `http://localhost:3002/searchCategory/${searchCtegory}`
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

  // const test = [
  //   {
  //     id: 1,
  //     imgurl: "https://images.pexels.com/photos/2760519/pexels-photo-2760519.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     userid: 2,
  //     title: "rome at sunset",
  //     contant: "i took this photo yesterday when i was in Rome at sunset, it was so beautiful",
  //     challengeName: null,
  //     challengeID: null,
  //     category: [
  //       "colors",
  //       "nature",
  //       "colors"
  //     ],
  //     createdAt: "2023-10-07T17:04:16.288Z",
  //     updatedAt: "2023-10-07T17:04:16.288Z"
  //   },
  //   {
  //     id: 1,
  //     imgurl: "https://images.pexels.com/photos/2760519/pexels-photo-2760519.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     userid: 2,
  //     title: "rome at sunset",
  //     contant: "i took this photo yesterday when i was in Rome at sunset, it was so beautiful",
  //     challengeName: null,
  //     challengeID: null,
  //     category: [
  //       "colors",
  //       "nature",
  //       "colors"
  //     ],
  //     createdAt: "2023-10-07T17:04:16.288Z",
  //     updatedAt: "2023-10-07T17:04:16.288Z"
  //   },
  //   {
  //     id: 1,
  //     imgurl: "https://images.pexels.com/photos/2760519/pexels-photo-2760519.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     userid: 2,
  //     title: "rome at sunset",
  //     contant: "i took this photo yesterday when i was in Rome at sunset, it was so beautiful",
  //     challengeName: null,
  //     challengeID: null,
  //     category: [
  //       "colors",
  //       "nature",
  //       "colors"
  //     ],
  //     createdAt: "2023-10-07T17:04:16.288Z",
  //     updatedAt: "2023-10-07T17:04:16.288Z"
  //   },
  //   {
  //     id: 1,
  //     imgurl: "https://images.pexels.com/photos/2760519/pexels-photo-2760519.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     userid: 2,
  //     title: "rome at sunset",
  //     contant: "i took this photo yesterday when i was in Rome at sunset, it was so beautiful",
  //     challengeName: null,
  //     challengeID: null,
  //     category: [
  //       "colors",
  //       "nature",
  //       "colors"
  //     ],
  //     createdAt: "2023-10-07T17:04:16.288Z",
  //     updatedAt: "2023-10-07T17:04:16.288Z"
  //   },
  //   {
  //     id: 1,
  //     imgurl: "https://images.pexels.com/photos/2760519/pexels-photo-2760519.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     userid: 2,
  //     title: "rome at sunset",
  //     contant: "i took this photo yesterday when i was in Rome at sunset, it was so beautiful",
  //     challengeName: null,
  //     challengeID: null,
  //     category: [
  //       "colors",
  //       "nature",
  //       "colors"
  //     ],
  //     createdAt: "2023-10-07T17:04:16.288Z",
  //     updatedAt: "2023-10-07T17:04:16.288Z"
  //   },
  // ];

  return (
    <div className="result-container">
      <div className="top-flex">
        <div>
          <button onClick={backHandler}>
            <u>back</u>
          </button>
        </div>
        <div>
          {state.searchWord !== "" && state.activeCategory === "" && (
            <p>
              results:{" "}
              {searchresults.users && searchresults.posts
                ? searchresults.users.length + searchresults.posts.length
                : 0}
            </p>
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
          <b>users:</b>
          {/* {!loading ? (
            <ul>
              {searchresults.users &&
                searchresults.users.map((item) => (
                  <li key={item.id}>{item.username}</li>
                ))}
            </ul>
          ) : (
            "Loading..."
          )} */}
          <div className="all-users-outer-flex">
            <div className="all-users-inner-flex">
              {!loading
                ? searchresults.users &&
                  searchresults.users.map((item) => (
                    <Users
                      key={item.id}
                      username={item.username}
                      profilePic={item.img}
                    />
                  ))
                : "Loading..."}
            </div>
          </div>

          <b>posts:</b>
          {/* { !loading ? <ul>
          {searchresults.posts &&
            searchresults.posts.map((item) => <li key={item.id}>{item.title}</li>)}
        </ul> : 'Loading...'} */}

          {!loading
            ? searchresults.posts && <Posts posts={searchresults.posts} />
            : "Loading..."}
        </div>
      )}

      {state.searchWord === "" && state.activeCategory !== "" && (
        <div>
          {/* <p>category result: </p>
        { !loading ? <ul>
          {searchCategoryresults &&
            searchCategoryresults.map((item) => <li key={item.id}>{item.title}</li>)}
        </ul> : 'Loading...'} */}

          <p>category result: </p>
          {!loading ? <Posts posts={searchCategoryresults} /> : "Loading..."}
          {/* { !loading ? <Posts posts={test}/> : 'Loading...'} */}
        </div>
      )}
    </div>
  );
}

export default Results;
