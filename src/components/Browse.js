import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
const Browse = () => {
  //Fetch data from TMDB API & update the store
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
    <Header /> 
    <MainContainer />
    <SecondaryContainer />
    {/*
        MainConatiner
          - VideoBackground
          - VideoTitle
        SecondaryConatiner
          - MovieList * n 
            - cards * n
     */}
    </div>
  )
}

export default Browse