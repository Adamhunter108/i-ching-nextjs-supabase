import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'

export default function about() {
  return (
    <div>
      <Head>
        <title>About the I Ching: the Book of Changes</title>
        <meta name="description" content="About the I Ching and how to consult the Book of Changes." />
      </Head>

      <Nav />

      <main>
        {/* YIN YANG SVG */}
        <div className="flex justify-center mt-4">
          <svg className="animate-spin-slow w-16 h-16" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 128C238.3 128 224 142.4 224 160S238.3 192 256 192s31.97-14.38 31.97-32S273.7 128 256 128zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 384c-17.68 0-31.97-14.38-31.97-32S238.3 320 256 320s31.97 14.38 31.97 32S273.7 384 256 384zM256 256c-53.04 0-96.03 43-96.03 96S202.1 448 256 448c-106.1 0-192.1-86-192.1-192S149.9 64 256 64c53.04 0 96.03 43 96.03 96S309 256 256 256z"/>
          </svg>
        </div>
        <div className="py-16 xl:py-36 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
        <div className="max-w-max lg:max-w-7xl mx-auto">
          <div className="relative z-10 mb-8 md:mb-2 md:px-6">
            <div className="text-base max-w-prose lg:max-w-none">
              <h2 className="leading-6 text-gray-300 font-semibold tracking-wide uppercase">About the</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200 font-carter sm:text-4xl">
                I Ching
              </p>
            </div>
          </div>
          <div className="relative">
            <svg
              className="hidden md:block absolute top-0 right-0 -mt-20 -mr-20"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-indigo-900" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)" />
            </svg>
            <svg
              className="hidden md:block absolute bottom-0 left-0 -mb-20 -ml-20"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="7a00fe67-0343-4a3c-8e81-c145097a3ce0"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-indigo-900" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#7a00fe67-0343-4a3c-8e81-c145097a3ce0)" />
            </svg>
            <div className="relative md:bg-gray-900/90 backdrop-blur-sm md:p-6 rounded-xl">
              <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                <div className="prose prose-indigo prose-lg text-gray-300 lg:max-w-none">
                  <h1 className="text-xl">What is the I Ching?</h1>
                  <p className="pt-2">
                  The I Ching, usually translated to Book of Changes, dates back to 1,000 BC. This several thousand year old book is regarded as a foundational text of eastern wisdom and philosophy.  Originally a divination manual, the I Ching is meant to provide insight and guidance for moral decision making. 
                  </p>
                  <p className="pt-2">
                  An I Ching reading comes in the form of a Hexagram which consists of six lines which are either broken (yin) or unbroken (yang). 
                  </p>
                </div>
                <div className="mt-6 prose prose-indigo prose-lg text-gray-300 lg:mt-0">
                <h1 className="text-xl">How to use this app:</h1>
                  <p className="pt-2">
                  Back in the day, people would throw yarrow stalks to calculate and construct their Hexagrams. Tossing coins, usually three at a time, is a more modern and convenient method. Those analog methods require calculations and often involve interpreting changing lines.    
                  </p>
                  <p className="pt-2">
                  To use this app, all you need to do is press the Divinate button.  We recommend doing only one reading a day and sitting with the result.
                  </p>
                  <p className="pt-2">
                    Each Hexagram is unique and has a number. Feel free to google your Hexagram number to read more about it.
                  </p>
                </div>
              </div>
                <p className="flex justify-center text-xs pt-7 text-gray-300">View source code:</p>
                <div className="flex justify-center cursor-pointer mt-1">
                  <Link href="https://github.com/Adamhunter108/i-ching-typescript" target="_blank">
                      <svg className="w-8 h-8 text-gray-300 hover:text-indigo-400" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                      </svg>
                  </Link>
                </div>
              
            </div>
          </div>
        </div>
      </div>
      </main>

    </div>
  )
}