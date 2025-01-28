import Image from 'next/image';
import Earth from '@/public/static/landing/earth.png'
import indianStreetMan from '@/public/static/landing/indian street.png'
import steveJobs from '@/public/static/landing/steve jobs placeholder 2.png'
import { NavBar } from '@/components/landing/nav-bar'
import { HeroSection } from '@/components/landing/hero-section'
import { FeatureCard } from '@/components/landing/feature-card'
import steveplace from '@/public/static/landing/steve jobs placeholder.png'
import { Footer } from '@/components/landing/footer'

export default function HomePage() {
  return (
    <div className="h-full relative px-5 text-white">
      <div className='absolute border-red-800 bottom-0   left-0'>
        <Image src={Earth} alt='earth' height={100} width={2000} />
      </div>

      <NavBar />
      <HeroSection />

      <div className="flex gap-12 z-10 px-10 pl-20 py-10">
        <div className="flex gap-5 mr-16 w-1/2">
          <FeatureCard
            image={indianStreetMan.src}
            imageAlt="man working on a laptop generated by Ai"
            title="Democratizing Startup Pitching"
            description="Pitch your startup idea to 150 investors, in the language you speak."
            buttonText="Daftar for Founders"
            buttonLink="/login/founder"
          />

          <FeatureCard
            image={steveJobs.src}
            imageAlt="man working on a laptop generated by Ai"
            title="Your Virtual Startup Incubator"
            description="Scout, understand, and build startups with founders across the world."
            buttonText="Daftar for Investors"
            buttonLink="/login/investor"
          />
        </div>

        {/* Center Column */}
        <div className="flex w-2/3 gap-20 z-10 items-center">
          <div className="relative w-full h-64 md:h-80 bg-gray-800 rounded-lg">
            <Image
              src={steveplace.src} // Replace with actual image path
              alt="Democratizing Startup Pitching"
              layout="fill"
              className="object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 px-4 py-2 rounded">
              <h3 className="text-lg font-semibold">Building a New Startup Economy</h3>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-5">
              <div className="relative w-40 h-24 bg-gray-800 rounded-lg">
                <Image
                  src={steveplace.src} // Replace with actual image path
                  alt="Thumbnail 2"
                  layout="fill"
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative w-40 h-24 bg-gray-800 rounded-lg">
              <Image
                  src={steveplace.src} // Replace with actual image path
                  alt="Thumbnail 2"
                  layout="fill"
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
