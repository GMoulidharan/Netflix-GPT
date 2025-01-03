import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer =() =>{
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    if(!movies) return;//early return. if(movies == null)

    const mainMovie = movies[0];//consider main as 1st movie.
    // console.log(mainMovie);

    const {original_title, overview, id} = mainMovie;
    return (
        <div className="pt-[30%] md:pt-0 bg-black">
            <VideoTitle title={original_title}overview={overview}/>
            <VideoBackground movieId={id}/>
        </div>
    )
};
export default MainContainer;