import React, { useEffect, useState } from "react";
import "./Home.scss";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Heading,
  Text,
  IconButton,
  Image,
  Button,
  Box,
  Container,
  Input,
  Divider,
} from "@chakra-ui/react";
import {
  getOtherStories,
  uploadImage,
} from "../../../../store/reducers/stories/stories.reducer";
import { BsFillPencilFill, BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { homeSocket } from "../../../../App";
import {
  getFollowing,
  getImages,
} from "../../../../store/reducers/profile/profile.reducer";
import { useDispatch, useSelector } from "react-redux";
import OthersModal from "../profileDashboard/OthersModal";
import Otherstories from "../stories/Otherstories";
import { uderData } from "../../../../store/reducers/auth/user.reducer";
import Cookies from "react-cookies";
import Mystory from "../stories/Mystory";
import { Carousel } from "react-bootstrap";
import { Search2Icon } from "@chakra-ui/icons";
import { setSearchWord } from "../../../../store/reducers/Search";
import { useNavigate } from "react-router";
import Posts from "../../../components/posts";
import "./Home.scss";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
function Home() {

  const dispatch = useDispatch();
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [imageStory, setImage] = useState(null);
  const [myStory, MystoryHandler] = useState();
  const [isdragging, setIsdragging] = useState(false);
  const story = useSelector((state) => state.stories.otherStories);
  const following = useSelector((state) => state.profile.following);
  const image = useSelector((state) => state.profile);
  const data = useSelector((state) => state.user.user);
  const baseUrl = process.env.REACT_APP_URL;

  const storyHandler = (id) => {
    setSelectedStoryId(id);
  };

  useEffect(() => {
    dispatch(getFollowing());
    const userData = Cookies.load("user");
    dispatch(getImages());
    dispatch(uderData(userData));
  }, []);

  useEffect(() => {
    if (following) {
      following.Following.map((story) => {
        dispatch(getOtherStories(story.id));
      });
    }
  }, [following]);

  useEffect(() => {
    try {
      if (imageStory !== null) {
        dispatch(uploadImage(imageStory));
      }
    } catch (e) {
      console.log(e);
    }
  }, [imageStory]);

  const [homePosts, sethomePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const Navigator = useNavigate();

  const setSearchWorldHandler = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value.trim() !== "") {
      dispatch(setSearchWord(e.target.value));
      Navigator("/search");
    }
  };

  useEffect(() => {
    try {
      const token = Cookies.load("user_session");
      setLoading(true);
      const response = axios.get(`${baseUrl}/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      response.then((data) => {
        console.log(data, "!!!!!!!!!!!!!!!");
        sethomePosts(data.data);
        setLoading(false);
      });
    } catch (e) {
      console.log("error while fetching home posts");
    }
  }, []);

  function handleMouseMove(e) {
    const tagsBox = document.querySelector(".nav-tags-st");
    if (isdragging) {
      tagsBox.classList.add("dragging");
      tagsBox.scrollLeft -= e.movementX;
    }
  }


  function stopDragging() {
    const tagsBox = document.querySelector(".nav-tags-st");
    setIsdragging(false);
    tagsBox.classList.remove("dragging");
  }

  function moveSliderOnClick(button) {
    const tagsBox = document.querySelector(".nav-tags-st");
    tagsBox.scrollLeft += button === "left" ? -350 : 350;
  }

  return (
    <>
      {
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap="40px"
          paddingLeft="10px"
        >
          {image.allImages && (
            <Box position="relative">
              <Button
                as="label"
                htmlFor="file"
                position="absolute"
                zIndex="1"
                size={["sm", "md", "md", "md"]}
                left={"71%"}
                top={"70%"}
                backgroundColor="blue"
                color="white"
                className="btn"
                rounded="30px"
                maxW="0.5"
                cursor="pointer"
                _hover={{ bg: "hoverColor" }}
              >
                <BsFillPencilFill />
              </Button>
              <Avatar
                size={["lg", "xl", "xl"]}
                src={image.allImages.profileImg}
                cursor="pointer"
                onClick={() => MystoryHandler(true)}
              />
            </Box>
          )}

          <div className="tag-navigator-cont-st">
            <div className="tag-navigator-st">
              <div className="tag-navigator-st-arrow">
                <h4
                  className="arrow-st"
                  onClick={() => moveSliderOnClick("left")}
                >
                  &#60;
                </h4>
              </div>
              <div
                className="nav-tags-st"
                onMouseMove={handleMouseMove}
                onMouseDown={() => setIsdragging(true)}
                onMouseUp={stopDragging}
              >
                {following &&
                  following.Following.map((story) => (
                    <Box className="nav-tag-st">
                      <Avatar
                        size={["lg", "xl", "xl"]}
                        src={story.img}
                        cursor="pointer"
                        onClick={() => storyHandler(story.id)}
                      />
                      <Input
                        type="file"
                        id="file"
                        display="none"
                        onChange={(event) => {
                          setImage(event.target.files[0]);
                        }}
                      />
                    </Box>
                  ))}
              </div>
              <div className="tag-navigator-st-arrow">
                <h4
                  className="arrow-st"
                  onClick={() => moveSliderOnClick("right")}
                >
                  &#62;
                </h4>
              </div>
            </div>
          </div>
          {selectedStoryId ? (
            <Otherstories
              id={selectedStoryId}
              setSelectedStoryId={setSelectedStoryId}
            />
          ) : null}
          {myStory ? <Mystory MystoryHandler={MystoryHandler} /> : null}
        </Box>
      }
      <Divider orientation="horizontal" />
      {homePosts.length !== 0 ? (
        <div className="auth-profile">
          {loading ? (
            <Spinner
              thickness="3px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <Posts posts={homePosts} />
          )}
        </div>
      ) : (
        <div className="welcome">
          <div className="welcome-container">
            <h1>Welcome</h1>
            <p>
              It looks like you are new here, press on the button below so you
              can search and discover more
            </p>
            <div>
              <button onClick={() => Navigator("/search")}>
                Discover &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Home;
