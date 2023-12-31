import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setActiveCategory, setLoading } from "../../../../store/reducers/Search";
import "./Category.scss";
import { CircularProgress, Spinner } from "@chakra-ui/react";

function Category() {

    const state = useSelector((state) => state.search)
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.search.loading);
    const categories = useSelector((state) => state.search.categories);

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch(fetchCategories())
            .then(() => { })
            .catch((error) => { });
    }, [dispatch]);
    console.log("sSsssssssssssssssssssssssssssssssssssssss", categories);
    return (
        <div className="search-category-container">
            <p>You can browse all the available categories to discover and find more</p>
            <div className="categories">
                {loading ? (
                    <Spinner thickness='3px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
                ) : (
                    <ul className='category-container'>

                        {categories.map((category) => (

                            <li style={{
                                backgroundImage: `url(${category.imgurl})`
                            }} key={category.id} className='category-card' onClick={() => dispatch(setActiveCategory(category.name))}>
                                <p>{category.name}</p>
                            </li>
                        ))}


                    </ul>
                )}
            </div>
        </div>
    )
}

export default Category