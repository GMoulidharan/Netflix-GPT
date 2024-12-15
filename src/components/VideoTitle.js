
const VideoTitle = ({title, overview}) => {
  return (
    <div 
      className="w-screen aspect-video pt-[20%]  px-6 md:px-24 absolute text-white bg-gradient-to-r from-black"
    >
        <h1 
          className="text-3xl lg:text-4xl md:text-6xl font-bold">
          {title}
        </h1>
        <p 
          className="hidden lg:inline-block text-lg w-1/4">
          {overview}
        </p>
        <div className="my-4 md:my-6">
            <button 
              className="bg-white text-black  py-1 md:py-4 px-4 md:px-12 text-xl rounded-md hover:bg-opacity-80">
              ▶️Play
            </button>
            <button 
              className=" hidden lg:inline-block md:inline-block bg-white text-black p-4 px-12 mx-2 text-xl rounded-md hover:bg-opacity-80"
            >
              More Info
            </button>
        </div>
    </div>
  )
}

export default VideoTitle