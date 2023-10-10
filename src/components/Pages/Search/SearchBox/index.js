import React from "react";
import './SearchBox.scss';
import { Search2Icon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchWord } from "../../../../store/reducers/Search";

function SerachBox() {

  const dispatch = useDispatch();

  const addTagHandler = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value.trim() !== "") {
      dispatch(setSearchWord(e.target.value));
    }
  };
  
  return (
    <div className="searchbox-container">
      <div className="search-des">
        <p className="search-des_first-paragraph"><span className="search-des_span">Search for anything you want</span> it can be any word.. a username, a category</p> 
        <p className="search-des_second-paragraph"> type or anything</p>
      </div>
      <div className="search-bar">
        <Search2Icon className="search-icon"/>
        <input
          type="search"
          placeholder="Type your search.."
          maxLength={30}
          onKeyDown={addTagHandler}
        />
      </div>
    </div>
  );
}

export default SerachBox;
