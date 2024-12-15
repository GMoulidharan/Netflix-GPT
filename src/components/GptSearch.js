import { BG_URL, GEMINI_LOGO } from "../utils/constants"
import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"

const GptSearch = () => {
  return (
    <>
      <div className='fixed -z-10 w-screen h-screen bg-gradient-to-b from-black'>
        <img 
        className="h-screen object-cover md:w-screen"
        src={BG_URL}
        alt='bg img'></img>
      </div>
      <div className="">    
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
    <div className="flex justify-center items-center gap-2">
        <h1 className="text-white">powered by</h1>
        <img
          className="w-24 object-cover"
          src= {GEMINI_LOGO}
          alt="google-gemini"
        />
      </div>
    </>
    
  )
}

export default GptSearch