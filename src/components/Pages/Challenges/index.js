import axios from "axios";
import React, { useEffect, useState } from "react";
import ChallengesList from "./ChallengesList";
import { Spinner } from "react-bootstrap";
import ChallengeDetails from "./ChallengeDetails";
import { ArrowBackIcon } from "@chakra-ui/icons";
import "./Challenges.scss";
import MainFooter from "../Footer";
function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isViewClicked, setIsViewClicked] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState({});
  // const [isNewChallengeAdded, setIsNewChallengeAdded] = useState(false);
  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    try {
      setLoading(true);
      const response = axios.get(
        `${URL}/v1/challenagesCollection`
      );
      response.then((data) => {
        setChallenges(data.data);
        setLoading(false);
      });
    } catch (e) {
      console.log("fetching challenges error: ", e);
    }
  }, []);

  return (
    <div>
      <>
        {isViewClicked && (
          <div className="back-button">
            <button onClick={() => setIsViewClicked(false)}>
              <u>
                <ArrowBackIcon boxSize={8} />
              </u>
            </button>
          </div>
        )}


        {!isViewClicked ? <div className="challenges-header"><h2>Challenges</h2><p>Here you can browse the available challenges, see the users participations or participate by yourself</p></div> : <h2 className="challenges-cd-header">{selectedChallenge.title}</h2>}


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
      <MainFooter />
    </div>
  );
}

export default Challenges;
