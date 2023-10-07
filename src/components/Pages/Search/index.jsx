import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./category.scss"
import { fetchCategories, setLoading } from '../../../store/reducers/Search';
function Search() {
    const dispatch = useDispatch();
    // const state = useSelector((state) => state)

    const loading = useSelector((state) => state.search.loading);
    const categories = useSelector((state) => state.search.categories);

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch(fetchCategories())
            .then(() => {

            })
            .catch((error) => {

            });
    }, [dispatch]);

    console.log(categories[0])
    return (

        <div>
            <h1>Categories</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className='category-container'>

                    {categories.map((category) => (

                        <li key={category.id} className='category-card'>
                            {category.name}
                        </li>
                    ))}


                </ul>
            )}
        </div>
    );
}

export default Search;
