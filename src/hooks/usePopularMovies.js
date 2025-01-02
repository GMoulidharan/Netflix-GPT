import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
    //Fetch data from TMDB API & update the store
    const popularMovies = useSelector((store) => store.movies.popularMovies);
    const dispatch = useDispatch();
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)

        const json = await data.json();
        dispatch(addPopularMovies(json.results));
    };
    useEffect(() => {
        !popularMovies && getPopularMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default usePopularMovies;