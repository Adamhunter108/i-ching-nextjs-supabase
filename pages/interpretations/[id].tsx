import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import HexInterpretations from '@/data/HexInterpretations'
import Nav from '@/components/Nav'

export default function Interpretations() {
    const router = useRouter()
    const routerID = router.query.id
    const routerIDNum = parseInt(routerID as string, 10)

  return (
    <div>
        <Head>
            <title>Hexagram # {routerID}</title>
            <meta name="description" content="Consult the Book of Changes, get an I Ching reading, save and share your results." />
        </Head>
        <Nav />

        <div className="flex justify-center mt-4 pb-10">
            <svg className="animate-spin-slow w-16 h-16" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 128C238.3 128 224 142.4 224 160S238.3 192 256 192s31.97-14.38 31.97-32S273.7 128 256 128zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 384c-17.68 0-31.97-14.38-31.97-32S238.3 320 256 320s31.97 14.38 31.97 32S273.7 384 256 384zM256 256c-53.04 0-96.03 43-96.03 96S202.1 448 256 448c-106.1 0-192.1-86-192.1-192S149.9 64 256 64c53.04 0 96.03 43 96.03 96S309 256 256 256z"/>
            </svg>
        </div>

        <div className="pt-2 lg:pt-5 pl-3 lg:pl-72">
        <Link href="/profile">
            <button
                className="lg:fixed lg:z-50 px-3.5 mt-8 py-2 bg-gradient-to-b from-indigo-800 via-indigo-600 to-indigo-400 text-cyan-100 hover:bg-gradient-to-t from-indigo-800 via-indigo-600 to-indigo-400 font-light rounded-md text-lg flex flex-row items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                <span className="pl-1">Back</span>
            </button>
        </Link>
        </div>


        <ul className="">
            {HexInterpretations.map((data) => (
                <li key={data.id} className="">

                    <div className="flex justify-center">
                        <p className="">{routerIDNum === data.id ? `${data.upper} over ${data.lower}` : null}</p>
                    </div>

                    <span className="flex justify-center">{routerIDNum === data.id ? 
                        <Image 
                            src={data.image}
                            alt='Hexagram'
                            width={150}
                            height={170}
                            blurDataURL={data.image}
                            placeholder="blur"
                        /> : null}
                    </span>

                    <p className="flex justify-center text-lg">{routerIDNum === data.id ? `Hexagram # ${routerIDNum}` : null}</p>

                    <div className="flex justify-center">
                        <p className="text-center font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200">{routerIDNum === data.id ? data.title : null}</p>
                    </div>

                    <div className="flex justify-center">
                        <p className="w-4/5 lg:w-2/4 text-center">{routerIDNum === data.id ? data.description : null}</p>
                    </div>

                </li>
            ))}
        </ul>

        <div className="group mt-10 flex justify-center">
            {/* <Link href={`https://www.google.com/search?q=i+ching+hexagram+${routerID}`} target="_blank"> */}
            <Link href={`https://letmegooglethat.com/?q=i+ching+hexagram+${routerID}`} target="_blank">
                <p className="text-cyan-200 hover:underline">Deep dive...</p>
                <span className="absolute scale-0 transition-all rounded bg-gray-900 p-1 text-xs text-cyan-100 group-hover:scale-100">
                    Let me Google that for you <span className="text-lg">😎</span>
                </span>
            </Link>
        </div>

    </div>
  )
}
