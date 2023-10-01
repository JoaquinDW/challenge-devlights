import gamesImage from "../../../public/descarga.jpeg"

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center h-64 md:h-96 lg:h-128 xl:h-160"
      style={{ backgroundImage: `url(${gamesImage.src})` }}
    ></div>
  )
}

export default Hero
