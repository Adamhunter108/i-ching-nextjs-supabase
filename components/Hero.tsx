import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ParticleBackGround from './ParticleBackground'
import { useUser } from '@/utils/useUser'

export default function Hero() {
    const { user } = useUser()

    return (
        <div>
            <main>
                <ParticleBackGround />
                <div className="flex justify-center mt-10 animate-spin-slow">
                <Image
                    src="/images/yinyang.png"
                    width={270}
                    height={275}
                    alt="Yin Yang"
                />
                </div>

                <div className="">
                {/* <p className="pt-3 flex justify-center text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200 text-3xl font-thin">Welcome{user ? `, ${user.email}` : null} to the</p> */}
                <p className="pt-3 flex justify-center text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200 text-3xl font-thin">Welcome to the</p>
                <h1 className="pt-2 flex justify-center font-carter text-7xl lg:text-8xl">I Ching</h1>
                <p className="pt-4 flex justify-center text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200 text-3xl font-thin">Consult with</p>
                <h2 className="pt-2 flex justify-center font-thin text-4xl lg:text-5xl">The Book of Changes</h2>
                </div>

                <div className="flex justify-center pt-10">
                <Link href="/get-hex">
                    <button
                        type="button"
                        className="animate-pulse inline-flex items-center px-5 py-2 border border-transparent text-xl rounded-full shadow-sm text-indigo-600 bg-white hover:text-gray-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        🌘 Digital Divination 🌒
                    </button>
                </Link>
                </div>
        </main>
        </div>
    )
}