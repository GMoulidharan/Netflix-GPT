import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'

const Browse = () => {
  //Fetch data from TMDB API & update the store
  useNowPlayingMovies();
  
  return (
    <div>
    <Header /> 
    
    </div>
  )
}

export default Browse