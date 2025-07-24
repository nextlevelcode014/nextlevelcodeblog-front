import Link from 'next/link'
import Image from 'next/image'
import { stylesComponets } from '@/types/style'
import HomeLogo from '../../public/assets/home-logo.png'

export default function Description() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-950 to-blue-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 md:flex md:items-center md:gap-8 lg:gap-12">
        <div className="md:w-1/2 space-y-6 lg:space-y-8 mb-12 md:mb-0">
          <h1
            className={`${stylesComponets.headingStyle} text-4xl sm:text-5xl lg:text-6xl`}
          >
            Learning...
          </h1>

          <div className="space-y-4 lg:space-y-6">
            <p
              className={`${stylesComponets.baseStyleP} text-base sm:text-lg lg:text-xl`}
            >
              Develop critical and analytical thinking on a variety of topics by
              sharing research and studies.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                'Mathematical calculations',
                'Book talk',
                'Brainstorming',
                'Geopolitics',
              ].map((item, index) => (
                <li
                  key={index}
                  className={`${stylesComponets.listItemStyle} text-sm sm:text-base p-3 sm:p-4`}
                >
                  <span className="text-blue-400 mr-2">⟁</span>
                  {item}
                </li>
              ))}
            </ul>

            <p
              className={`${stylesComponets.baseStyleP} text-sm sm:text-base lg:text-lg`}
            >
              Content published for study, learning and writing purposes.
            </p>
          </div>

          <div className={`${stylesComponets.highlightCard} p-4 sm:p-6`}>
            <blockquote
              className={`${stylesComponets.quoteStyle} text-sm sm:text-base`}
            >
              "Blessed are those who find wisdom, those who gain understanding."
              <span className="block mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-blue-300">
                - Proverbs 3:13
              </span>
            </blockquote>
          </div>

          <Link
            href="/news/posts"
            className="inline-block w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Explore
          </Link>
        </div>

        <div className="md:w-1/2 relative group mt-12 md:mt-0">
          <div className="relative overflow-hidden rounded-xl lg:rounded-2xl border-2 sm:border-4 border-blue-500/30 shadow-xl lg:shadow-2xl">
            <Image
              src={HomeLogo}
              alt="Ilustração de tecnologia blockchain"
              width={800}
              height={800}
              className="object-cover w-full h-auto aspect-video transform group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-center">
              <span className="text-[10px] sm:text-xs font-mono text-blue-300 tracking-widest">
                // NextLevelCode //
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-white mt-1 sm:mt-2">
                Decentralized Knowledge
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
