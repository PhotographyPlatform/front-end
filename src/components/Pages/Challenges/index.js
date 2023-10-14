import axios from "axios";
import React, { useEffect, useState } from "react";
import ChallengesList from "./ChallengesList";
import { Spinner } from "react-bootstrap";
import ChallengeDetails from "./ChallengeDetails";
import { ArrowBackIcon } from "@chakra-ui/icons";
import "./Challenges.scss";

function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isViewClicked, setIsViewClicked] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState({});
  // const [isNewChallengeAdded, setIsNewChallengeAdded] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const response = axios.get(
        "http://localhost:3002/v1/challenagesCollection"
      );
      response.then((data) => {
        setChallenges(data.data);
        setLoading(false);
      });
    } catch (e) {
      console.log("fetching challenges error: ", e);
    }
  }, []);

  const headerStyleMargin = !isViewClicked ? 'challenges-header' : 'challenges-cd-header';

  return (
    <>
      {isViewClicked && <div className="back-button">
        <button onClick={() => setIsViewClicked(false)}>
          <u>
            <ArrowBackIcon boxSize={10} />
          </u>
        </button>
      </div>}

      <h2 className={headerStyleMargin}>
        {!isViewClicked ? "Challenges" : selectedChallenge.title}
      </h2>

      {!isViewClicked ? (
        loading ? (
          <Spinner
            thickness="3px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <div className="challenges-container">
            {challenges.map((item) => (
              <ChallengesList
                challenges={item}
                setIsViewClicked={setIsViewClicked}
                setSelectedChallenge={setSelectedChallenge}
              />
            ))}
          </div>
        )
      ) : (
        <ChallengeDetails selectedChallenge={selectedChallenge} />
      )}
    </>
  );
}

export default Challenges;
