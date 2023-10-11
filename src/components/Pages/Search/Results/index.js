import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveCategory,
  setSearchWord,
} from "../../../../store/reducers/Search";
import "./Results.scss";
import Posts from "../../../components/posts";
import Users from "./Users";
import Cookies from "react-cookies";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Spinner } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

function Results() {
  const navigate = useNavigate();
  const state = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const [searchresults, setSearchresults] = useState({});
  const [searchCategoryresults, setSearchCategoryresults] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(searchresults);

  // handle the user profile 
  const profileHandler = (id) => {
    Cookies.remove('id')
    Cookies.save('id', id)
    if (id) {
      navigate('/userProfile')
    }
  }

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

  // function clickHandler(id){
  //   Cookies.remove('id');
  //   Cookies.save('id', id);
  //   if(id){
  //     navigate('/userProfile');
  //   }
  // }

  return (
    <div className="result-container">
      <div className="top-flex">
        <div>
          <button onClick={backHandler}>
            <u>
              <ArrowBackIcon boxSize={10} />
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
          <b>
            Users: <b>{searchresults.users ? searchresults.users.length : 0}</b>
          </b>
          <small>
            <i>
              {searchresults.users ? searchresults.users.length : 0} users found
              for the search word '{state.searchWord}'
            </i>
          </small>
          {/* {!loading ? (
            <ul>
              {searchresults.users &&
                searchresults.users.map((item) => (
                  <li key={item.id}>{item.username}</li>
                ))}
            </ul>
          ) : (
            <Spinner thickness='3px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
          )} */}

          <div className="all-users-flex" >
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

          <b>
            Posts: <b>{searchresults.posts ? searchresults.posts.length : 0}</b>
          </b>
          <small>
            <i>
              {searchresults.posts ? searchresults.posts.length : 0} posts found
              for the search word '{state.searchWord}'
            </i>
          </small>
          {/* { !loading ? <ul>
          {searchresults.posts &&
            searchresults.posts.map((item) => <li key={item.id}>{item.title}</li>)}
        </ul> : 'Loading...'} */}

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
      )}

      {state.searchWord === "" && state.activeCategory !== "" && (
        <div>
          {/* <p>category result: </p>
        { !loading ? <ul>
          {searchCategoryresults &&
            searchCategoryresults.map((item) => <li key={item.id}>{item.title}</li>)}
        </ul> : 'Loading...'} */}

          {/* <p>category result: </p> */}
          <small>
            <i>
              {searchCategoryresults ? searchCategoryresults.length : 0} posts
              found containing the category '{state.activeCategory}'
            </i>
          </small>
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
          {/* { !loading ? <Posts posts={test}/> : 'Loading...'} */}
        </div>
      )}
    </div>
  );
}

export default Results;
