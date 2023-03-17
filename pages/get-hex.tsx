import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import HexInterpretations from '../data/HexInterpretations'
import Nav from '../components/Nav'
import ParticleBackGround from '@/components/ParticleBackground'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/utils/useUser'

export default function GetHex() {
    const supabaseClient = useSupabaseClient()
    const { user } = useUser()

    // I CHING HAS 64 POSSIBLE OUTCOMES
    const randomValue: number = Math.floor(Math.random() * 64) + 1

    const [value, setValue] = React.useState<number>()
    
    const handleDivinateClick = () => {
        setValue(randomValue)
    }

    // STATE FOR SHARE BUTTON
    const [isCopied, setIsCopied] = React.useState<boolean>(false)

    const handleCopyClick = () => {
        setIsCopied(true);
        setTimeout(() => {
        setIsCopied(false);
        }, 2500);
    }

    // SAVE BUTTON
    const handleSaveClick = async () => {
        if (!user) {
          alert('You must be logged in to save a reading.')
          return
        }
        if (!value) {
          alert('You must first perform a divination.')
          return
        }
      
        const { data, error } = await supabaseClient
          .from('iching_readings')
          .insert([{ user_id: user.id, reading_number: value, created_at: new Date().toISOString() }])
      
        if (error) {
          console.error(error)
          alert('An error occurred while saving the reading.')
          return
        }
      
        alert('Reading saved to your profile.')
    }
      

  return (
    <div>
        <Head>
            <title>Consult the I Ching: the Book of Changes</title>
            <meta name="description" content="Consult the Book of Changes, get your daily I Ching reading and share your results." />
        </Head>

        <ParticleBackGround />

        <Nav />

        <main>
        {/* <ParticleBackGround /> */}

            {/* YIN YANG SVG */}
        <div className="flex justify-center mt-4 pb-10">
            <svg className="animate-spin-slow w-16 h-16" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 128C238.3 128 224 142.4 224 160S238.3 192 256 192s31.97-14.38 31.97-32S273.7 128 256 128zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 384c-17.68 0-31.97-14.38-31.97-32S238.3 320 256 320s31.97 14.38 31.97 32S273.7 384 256 384zM256 256c-53.04 0-96.03 43-96.03 96S202.1 448 256 448c-106.1 0-192.1-86-192.1-192S149.9 64 256 64c53.04 0 96.03 43 96.03 96S309 256 256 256z"/>
            </svg>
        </div>

        <div className="flex justify-center">
            {value ? null : <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200">kill the noise</p>}
        </div>


        <ul className="">
            {HexInterpretations.map((data) => (
                <li key={data.id} className="">

                        {/* UPPER & LOWER TRIGRAMS */}
                    <div className="flex justify-center">
                        <p className="">{value === data.id ? `${data.upper} over ${data.lower}` : null}</p>
                    </div>

                        {/* IMAGE */}
                    <span className="flex justify-center">{value === data.id ? 
                        <Image 
                            src={data.image}
                            alt='Hexagram'
                            width={150}
                            height={170}
                            blurDataURL={data.image}
                            placeholder="blur"
                        /> : null}
                    </span>

                        {/* HEXAGRAM NUMBER */}
                    <p className="flex justify-center text-sm">{value === data.id ? `Hexagram # ${value}` : null}</p>

                        {/* TITLE */}
                    <div className="flex justify-center">
                        <p className="text-center font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200">{value === data.id ? data.title : null}</p>
                    </div>
                        {/* DESCRIPTION */}
                    <div className="flex justify-center">
                        <p className="w-4/5 lg:w-2/4 text-center">{value === data.id ? data.description : null}</p>
                    </div>

                </li>
            ))}
        </ul>


        {value ? null :
            <div className="flex justify-center pt-56">
                <button
                    type="button"
                    className="animate-pulse inline-flex items-center px-5 py-2 border border-transparent text-xl rounded-full shadow-sm text-indigo-600 bg-white/90 hover:text-gray-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleDivinateClick}
                >
                    🌘 Divinate 🌒
                </button>
            </div>
        }


            {/* SHARE BUTTON */}
        <div className="flex justify-center pt-10">
        {HexInterpretations.map((data) => (
            value === data.id ? 
                <CopyToClipboard text={`My Daily I Ching reading is 
    Hexagram ${data.id} 
    ${data.title}
☯️ ☯️ ☯️ ☯️ ☯️ ☯️ ☯️ 
bookofchanges.app`}>
                {isCopied ?
                    <button
                        type="button"
                        className="inline-flex items-center px-5 py-2 border border-transparent text-base rounded-full shadow-sm text-indigo-600 bg-white/70 hover:text-gray-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
                        onClick={handleCopyClick}>
                            Copied! Paste anywhere
                    </button> 
                    : <button 
                        type="button"
                        className="inline-flex items-center px-5 py-2 border border-transparent text-base rounded-full shadow-sm text-indigo-600 bg-white/70 hover:text-gray-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
                        onClick={handleCopyClick}>
                            Share reading
                            <svg className="pl-2 w-6 h-5" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M285.4 197.1L191.3 244.1C191.8 248 191.1 251.1 191.1 256C191.1 260 191.8 263.1 191.3 267.9L285.4 314.9C302.6 298.2 326.1 288 352 288C405 288 448 330.1 448 384C448 437 405 480 352 480C298.1 480 256 437 256 384C256 379.1 256.2 376 256.7 372.1L162.6 325.1C145.4 341.8 121.9 352 96 352C42.98 352 0 309 0 256C0 202.1 42.98 160 96 160C121.9 160 145.4 170.2 162.6 186.9L256.7 139.9C256.2 135.1 256 132 256 128C256 74.98 298.1 32 352 32C405 32 448 74.98 448 128C448 181 405 224 352 224C326.1 224 302.6 213.8 285.4 197.1L285.4 197.1z"/>
                            </svg> 
                        </button>}
                </CopyToClipboard> : null
        ))}
        </div>

            {/* SAVE BUTTON */}
            {user ? 
                <div className="flex justify-center pt-4">
                    {HexInterpretations.map((data) => (
                        value === data.id ? 
                            <button 
                                type="button"
                                className="inline-flex items-center px-5 py-2 border border-transparent text-base rounded-full shadow-sm text-indigo-600 bg-white/70 hover:text-gray-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
                                onClick={handleSaveClick}
                            >
                                    Save reading
                                    <svg className="pl-2 w-6 h-5" aria-hidden="true" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                                    </svg>
                            </button>
                        : null
                    ))}
                </div>
            : null}

        </main>
    </div>
  )
}