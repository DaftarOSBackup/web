import Image from 'next/image'
import Link from 'next/link'

interface FeatureCardProps {
  image: string
  imageAlt: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export function FeatureCard({ 
  image, 
  imageAlt, 
  title, 
  description, 
  buttonText, 
  buttonLink 
}: FeatureCardProps) {
  return (
    <div className="z-10 p-3 flex flex-col justify-center items-center h-[35rem] rounded-lg">
      <Image src={image} alt={imageAlt} height={250} width={250} />
      <div className="bg-white py-7 z-10 bg-opacity-10 p-6 rounded-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-400 mt-2">{description}</p>
      </div>
      <Link href={buttonLink}>
        <button className="mt-4 bg-white transition-all duration-500 text-black p-2 rounded hover:text-white hover:bg-blue-400">
          {buttonText}
        </button>
      </Link>
    </div>
  )
} 