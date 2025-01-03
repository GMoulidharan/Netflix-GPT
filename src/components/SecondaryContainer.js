import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {

  const movies = useSelector((store) =>store.movies)

  return (
    movies.nowPlayingMovies && (
    <div className="bg-black">
      <div className="lg:-mt-80 md:mt-0 pl-1 md:pl-3 relative z-20">
      <MovieList title={"Now playing"} movies ={movies.nowPlayingMovies}/>
      <MovieList title={"Top Rated"} movies ={movies.topRatedMovies}/>
      <MovieList title={"Upcoming Movies"} movies ={movies.upComingMovies}/>
      <MovieList title={"Popular"} movies ={movies.popularMovies}/>
      <MovieList title={"Horror"} movies ={movies.nowPlayingMovies}/>
      </div>
      
    </div>)
  )
}

export default SecondaryContainer;