import { useSelector } from "react-redux"
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const {movieResults, movieNames} = useSelector((store) => store.gpt);
 
  if(!movieNames) return null;

  return (
    <div className="p-4 m-2 rounded-2xl shadow-2xl bg-opacity-90 text-white bg-black">
      <div>
        {movieNames.map((movieName, index) => 
          <MovieList 
          key={movieName}
          title={movieName} 
          movies={movieResults[index]}
          />)
        }
      </div>
    </div>
  )
}

export default GptMovieSuggestions