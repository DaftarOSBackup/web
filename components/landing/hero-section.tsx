import Image from 'next/image'
import bullet from '@/public/static/landing/header_bullet.png'

export function HeroSection() {
  return (
    <header className="text-left z-1 py-5 px-5">
      <h1 className="text-4xl md:text-5xl">
        <span className='flex'>
          <Image className='scale-75' src={bullet} alt='bullet' width={50} height={50} />
          <span className='px-2'> 
            <span className='text-blue-400'>Daftar</span> Operating System
          </span>
        </span>
      </h1>
      <p className="text-gray-400 mt-4 px-16 pr-40 text-xl flex justify-start mx-auto">
        Whether you're a founder pitching your startup idea to the world or an investor scouting opportunities globally, 
        Daftar Operating System supports you in making more informed decisions with storytelling that hyper focuses on 
        intent and data-driven insights.
      </p>
    </header>
  )
} 