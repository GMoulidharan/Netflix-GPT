import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
const Browse = () => {
  //Fetch data from TMDB API & update the store
  useNowPlayingMovies();
  
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