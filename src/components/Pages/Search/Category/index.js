import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setActiveCategory, setLoading } from "../../../../store/reducers/Search";
import "./Category.scss";

function Category() {

    const state = useSelector((state) => state.search)
    const dispatch = useDispatch();
  
    const loading = useSelector((state) => state.search.loading);
    const categories = useSelector((state) => state.search.categories);

    useEffect(() => {
      dispatch(setLoading(true));
      dispatch(fetchCategories())
        .then(() => {})
        .catch((error) => {});
    }, [dispatch]);
    
  return (
    <div className="search-category-container">
        <p>Or, you can browse the available categories to discover and find more</p>
        <div className="categories">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className='category-container'>

                    {categories.map((category) => (

                        <li key={category.id} className='category-card' onClick={()=>dispatch(setActiveCategory(category.name))}>
                            {category.name}
                        </li>
                    ))}


                </ul>
            )}
        </div>
    </div>
  )
}

export default Category