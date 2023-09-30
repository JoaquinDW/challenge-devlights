import React from "react"
import Image from "next/image" // Importa el componente Image de Next.js
import gamesImage from "../../../public/descarga.jpeg" // Importa la imagen

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center h-64 md:h-96 lg:h-128 xl:h-160"
      style={{ backgroundImage: `url(${gamesImage.src})` }}
    >
      {/* Aquí puedes agregar contenido adicional si es necesario */}
    </div>
  )
}

export default Hero
