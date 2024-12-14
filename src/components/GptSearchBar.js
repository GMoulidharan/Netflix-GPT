import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageConstants"
import { useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS, OPEN_AI_KEY } from "../utils/constants";
import { addgptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const langKey =  useSelector((store) =>store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();
    const genAI = new GoogleGenerativeAI(OPEN_AI_KEY);

    //Search movie in TMDB
    const searchMovieTMDB = async(movie) =>{
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie +"&include_adult=false&language=en-US&page=1", API_OPTIONS);
        const json = await data.json();
        return json.results;//return a promises not results
    };

    const handleGptSearchClick= async() =>{
        console.log(searchText.current.value);
        //Make an API call to GPT API to get movie results 
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const gptQuery ="Act as a Movie Recommentation sytem and suggest some movies for the query : "+ searchText.current.value + ". Only give me names of 5 movies, comma seperated like the example result given ahead. Examples Results: Amaran, Vikram, Beast, Thunivu, Shershaah"
       
        const gptResults = await model.generateContent(gptQuery);
        if(!gptResults){
            //TODO: error handling
        }
        console.log(gptResults.response?.candidates[0]?.content?.parts[0]?.text);
        // Golmaal, Chupke Chupke, Hera Pheri, Angoor,  Padosan
        const gptMovies = gptResults.response?.candidates[0]?.content?.parts[0]?.text;

        const movieList = gptMovies.split(",");//Gives array of movies(comma seperated strings)
        //For each string(movie) make an API call and fetch the TMDB API
        const promiseArray = movieList.map(movie => searchMovieTMDB(movie));
        // [Promise, Promise, Promise, Promise, Promise] 
         
        const tmdbResults = await Promise.all(promiseArray);
        console.log(tmdbResults);//result is array of arrays

        dispatch(addgptMovieResult({ movieNames: movieList, movieResults: tmdbResults}));
    };

  return (
    <div className="pt-[10%] flex justify-center">
        <form 
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
        >
            <input 
                ref= {searchText}
                type="text" 
                className="p-4 m-4 col-span-9" 
                placeholder={lang[langKey].gptSearchPlaceHolder}
            />
            <button 
                className="py-2 px-4 m-5 bg-red-700 text-white rounded-lg col-span-3"
                onClick={handleGptSearchClick}
            >
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar