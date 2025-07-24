import { stylesComponets } from '@/types/style'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/assets/logo.png'

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-900 to-blue-900/20 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:flex md:items-start md:gap-8 lg:gap-16">
        <div className="md:w-1/3 mb-8 md:mb-0">
          <div className="relative group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-blue-500/20 rounded-xl lg:rounded-2xl transform rotate-2 group-hover:rotate-1 transition-all" />
            <Image
              src={Logo}
              alt="Logo Photo"
              width={600}
              height={800}
              className="rounded-xl lg:rounded-2xl relative z-10 object-cover shadow-lg lg:shadow-2xl w-full h-auto"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-3">
              Social media:
            </h3>
            <div className="flex justify-center gap-3 sm:gap-4">
              <Link
                href="https://github.com/m4rc3l04ugu2t0"
                target="_blank"
                rel="noopener noreferrer"
                replace
                className={`${stylesComponets.socialLink} px-4 py-2 text-sm sm:text-base`}
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 space-y-6 lg:space-y-8">
          <h1
            className={`${stylesComponets.headingStyle} text-3xl sm:text-4xl lg:text-5xl`}
          >
            Hi, I'm <span className="text-blue-400">Marcelo Augusto</span>
          </h1>

          <div className="space-y-4 lg:space-y-6">
            <p
              className={`${stylesComponets.baseStyleP} text-base sm:text-lg lg:text-xl`}
            >
              With over a year immersed in technology, my passion grows
              alongside rapid evolution in the field. Understanding the inner
              workings of software has become essential in our increasingly
              digital-dependent world.
            </p>

            <div className={`${stylesComponets.highlightCard} p-4 sm:p-6`}>
              <h2
                className={`${stylesComponets.subheadingStyle} text-xl sm:text-2xl`}
              >
                Main Focus
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                {[
                  'Bitcoin',
                  'Mathematics',
                  'Cryptography',
                  'Linux',
                  'AI',
                  'System Development',
                ].map((item, index) => (
                  <li
                    key={index}
                    className={`${stylesComponets.listItemStyle} text-sm sm:text-base p-2 sm:p-3`}
                  >
                    <span className="text-blue-400 mr-2">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3
                className={`${stylesComponets.subheadingStyle} text-lg sm:text-xl`}
              >
                Professional Timeline
              </h3>
              <div className="space-y-4">
                <div className="pl-3 sm:pl-4 border-l-2 sm:border-l-4 border-blue-500">
                  <p className="text-blue-400 font-mono text-sm sm:text-base">
                    2025 - Current
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base mt-1">
                    Focused on Rust and low-level programming
                  </p>
                </div>
                <div className="pl-3 sm:pl-4 border-l-2 sm:border-l-4 border-blue-500">
                  <p className="text-blue-400 font-mono text-sm sm:text-base">
                    Dec 2023 - 2024
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base mt-1">
                    Studied full-stack development: JavaScript/TypeScript,
                    Node.js, React, Next.js, Ruby, and systems programming in
                    C/C++
                  </p>
                </div>
              </div>
            </div>

            <div className={`${stylesComponets.highlightCard} p-4 sm:p-6`}>
              <blockquote
                className={`${stylesComponets.quoteStyle} text-sm sm:text-base`}
              >
                "For wisdom is better than rubies; and all the things that may
                be desired are not to be compared to it. I wisdom dwell with
                prudence, and find out knowledge of witty inventions."
                <span className="block mt-2 text-xs sm:text-sm font-semibold text-blue-300">
                  - Proverbs 8:11-12
                </span>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
