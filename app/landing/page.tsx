import Image from 'next/image';
import bullet from '@/public/static/landing/header_bullet.png'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black px-5 text-white">
      {/* Navbar */}
      <nav className="flex justify-end items-center px-10 pt-10  border-gray-700">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Our Story</button>
      </nav>

      {/* Hero Section */}
      <header className="text-left py-16 px-5 ">
        <h1 className="text-4xl md:text-5xl ">
          <span className='flex'>
            <Image className='scale-75' src={bullet} alt='bullet' width={50} height={50} />
            <span className='px-2'> <span className='text-blue-400'>Daftar</span> Operating System</span>
          </span>
        </h1>
        <p className="text-gray-400 mt-4 px-16 pr-40 text-xl flex justify-start mx-auto">
          Whether you're a founder pitching your startup idea to the world or an investor scouting opportunities globally, Daftar Operating System supports you in making more informed decisions with storytelling that hyper focuses on intent and data-driven insights.
        </p>
      </header>

      {/* Content Section */}
      <div className="flex gap-12 px-10 pl-20  py-12">
        {/* Left Column */}
        <div className="flex gap-5 mr-10 w-1/2">
          <div className="bg-gray-800 bg-opacity-55 p-6 rounded-lg">
            <h2 className="text-xl font-bold">Democratizing Startup Pitching</h2>
            <p className="text-gray-400 mt-2">Pitch your startup idea to 150 investors, in the language you speak.</p>
            <button className="mt-4 bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">Daftar for Founders</button>
          </div>
          <div className="bg-gray-800 bg-opacity-55 p-6 rounded-lg">
            <h2 className="text-xl font-bold">Your Virtual Startup Incubator</h2>
            <p className="text-gray-400 mt-2">Scout, understand, and build startups with founders across the world.</p>
            <button className="mt-4 bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">Daftar for Investors</button>
          </div>
        </div>

        {/* Center Column */}
        <div className="flex w-2/3 gap-20  items-center">
          <div className="relative w-full h-64 md:h-80 bg-gray-800 rounded-lg">
            <Image
              src="/steve-jobs.jpg" // Replace with actual image path
              alt="Democratizing Startup Pitching"
              layout="fill"
              className="object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 px-4 py-2 rounded">
              <h3 className="text-lg font-semibold">Democratizing Startup Pitching</h3>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-5">
              <div className="relative w-24 h-24 bg-gray-800 rounded-lg">
                <Image
                  src="/thumbnail2.jpg" // Replace with actual image path
                  alt="Thumbnail 2"
                  layout="fill"
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative w-24 h-24 bg-gray-800 rounded-lg">
                <Image
                  src="/thumbnail3.jpg" // Replace with actual image path
                  alt="Thumbnail 3"
                  layout="fill"
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-gray-700 text-gray-500">
        <p>Beta version 1.1 Meo | Last Update May 24, 2025</p>
      </footer>
    </div>
  );
}
