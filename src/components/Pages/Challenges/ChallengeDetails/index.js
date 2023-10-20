import { useDisclosure } from "@chakra-ui/react";
import ChallengePost from "../../../components/ChallengePost";
import "./ChallengeDetails.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Posts from "../../../components/posts";
import Report from "../../../components/Report";
import NewChallenge from "../../../components/NewChallenge";

function ChallengeDetails({ selectedChallenge }) {
  const {
    isOpen: isOpenNewPost,
    onOpen: onOpenNewPost,
    onClose: onCloseNewPost,
  } = useDisclosure();
  const [isViewParticipationsClicked, setIsViewParticipationsClicked] =
    useState(false);
  const [isNewPostAdded, setIsNewPostAdded] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    try {
      const response = axios.get("http://localhost:3002/v1/newPostCOll");
      response.then((data) => {
        const posts = data.data.filter(
          (item) => item.challengeID === selectedChallenge.id
        );
        setAllPosts(posts);
      });
    } catch (e) {
      console.log("error while fetching challenges posts");
    }
  }, [isNewPostAdded]);

  const readableDate = (datefromdb) => {

    const date = new Date(datefromdb);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
  };

  return (
    <>
      {!isViewParticipationsClicked ? (
        <div className="challenge-details card-ch-li">
          <div class="card card-cd mb-3">
            <img
              src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="card-img-top card-img-top-cd"
              alt="..."
            />
            <div class="card-body card-body-cd">
              <div className="card-item">
                <h5 class="card-title">Description</h5>
                <p class="card-text">{selectedChallenge.brief}</p>
              </div>

              <div className="card-item">
                <h5 class="card-title">Rules</h5>
                <p class="card-text">{selectedChallenge.rules}</p>
              </div>

              <div className="card-item">
                <h5 class="card-title">Prize</h5>
                <p class="card-text">{selectedChallenge.prize}</p>
              </div>

              <div className="card-item">
                <h5 class="card-title">Start and End date</h5>
                <ul class="card-text">
                  <li>{readableDate(selectedChallenge.startDate)}</li>
                  <li>{readableDate(selectedChallenge.endDate)}</li>
                </ul>
              </div>

              <div className="card-buttons card-buttons-cd">
                {/* <button class="btn btn-primary">View images</button> */}
                <button
                  class="btn btn-primary"
                  onClick={() => setIsViewParticipationsClicked(true)}
                >
                  View participations
                </button>
                <button class="btn btn-primary" onClick={onOpenNewPost}>
                  participate
                </button>

                <ChallengePost
                  onCloseNewPost={onCloseNewPost}
                  isOpenNewPost={isOpenNewPost}
                  ChallengeName={selectedChallenge.title}
                  challengeId={selectedChallenge.id}
                  setIsNewPostAdded={setIsNewPostAdded}
                />
              </div>
            </div>
          </div>
        </div>
      ) : allPosts.length === 0 ? (
        <i>
          there are no posts for the challenge '{selectedChallenge.title}' yet
        </i>
      ) : (
        <Posts posts={allPosts} />
      )}
    </>
  );
}

export default ChallengeDetails;
