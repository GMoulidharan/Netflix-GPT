import { IMG_CDN_URL } from "../utils/constants"

const MovieCard = ({posterPath}) => {
  //error handling
  if(!posterPath) return null;
  
  return (
    <div className="w-36 md:w-48 pr-4">
        <img 
            alt="Movie name"
            src={IMG_CDN_URL + posterPath}
        />
    </div>
  )
}

export default MovieCard