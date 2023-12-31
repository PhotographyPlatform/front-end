import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SerachBox from "./SearchBox";
import Category from "./Category";
import Results from "./Results";
import "./search.scss";

function Search() {
  
  const state = useSelector((state) => state.search)

  return (
    <div className="seach-container">
      { (state.searchWord===""&&state.activeCategory==="") ?
      <><SerachBox />
      <Category /></> :
      <Results />
      }
    </div>
  );
}

export default Search;
