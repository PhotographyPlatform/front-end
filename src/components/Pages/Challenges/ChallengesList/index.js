import React from "react";
import "./ChallengesList.scss";

function ChallengesList({challenges, setIsViewClicked, setSelectedChallenge}) {

  const onClickView = () => {
    setIsViewClicked(true);
    setSelectedChallenge(challenges);
  }

  return (
    <div class="card card-ch-li mb-3">
      <img
        src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">{challenges.title}</h5>
        <p class="card-text">
         {challenges.brief.slice(0, 100)}.....
        </p>
        <div className="card-buttons card-buttons-cl">
          <button class="btn btn-primary" onClick={onClickView}>Details</button>
        </div>
      </div>
    </div>
  );
}

export default ChallengesList;
