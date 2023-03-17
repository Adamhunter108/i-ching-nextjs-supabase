import React, { useState} from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Nav from '@/components/Nav'
import { GetServerSidePropsContext } from 'next'
import {
  createServerSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs'
import { useUser } from '@/utils/useUser'
import LoadingDots from '@/components/ui/LoadingDots'

export interface IchingReading {
    id: number
    user_id: string
    reading_number: number
    created_at: string
}

interface Props {
    user: User;
    ichingReadings: IchingReading[];
  }
  

// export default function profile({ user }: { user: User }) {
export default function profile({ user, ichingReadings }: Props) {
    const [loading, setLoading] = useState(false)
    const { isLoading, subscription, userDetails } = useUser()

    console.log(ichingReadings)
  return (
    <div>
        <Head>
            <title>Your profile</title>
            <meta name="description" content="Consult the Book of Changes, get your daily I Ching reading and share your results." />
        </Head>

        <Nav />

        <div className="flex justify-center mt-4">
          <svg className="animate-spin-slow w-16 h-16" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 128C238.3 128 224 142.4 224 160S238.3 192 256 192s31.97-14.38 31.97-32S273.7 128 256 128zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 384c-17.68 0-31.97-14.38-31.97-32S238.3 320 256 320s31.97 14.38 31.97 32S273.7 384 256 384zM256 256c-53.04 0-96.03 43-96.03 96S202.1 448 256 448c-106.1 0-192.1-86-192.1-192S149.9 64 256 64c53.04 0 96.03 43 96.03 96S309 256 256 256z"/>
          </svg>
        </div>

        <h1 className="flex justify-center text-lg text-gray-400 mt-20">Profile for</h1>
        <h2 className="flex justify-center text-xl text-gray-300 mt-1 mb-8"><i>{user.email}</i></h2>

        {/* <div className="flex flex-col items-center mt-10">
            <h2 className="text-xl font-bold text-gray-300 mb-2">I Ching Readings</h2>
            {ichingReadings.map((reading) => (
                <div className="text-gray-400 mb-10" key={reading.id}>
                    Hexagram # {reading.reading_number} - {new Date(reading.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    <Image 
                        src={`/images/${reading.reading_number}.png`}
                        alt='Hexagram'
                        width={150}
                        height={170}
                        blurDataURL={`/images/${reading.reading_number}.png`}
                        placeholder="blur"
                    />
                </div>
            ))}
        </div> */}

        <p className="pt-4 pb-4 flex justify-center text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200 text-3xl font-thin">Consult your past</p>

        {ichingReadings.length === 0 ?
        <p className="text-gray-300 flex justify-center">your saved readings will appear here</p> :
        <div className="flex flex-col items-center">
            <p className="text-2xl text-gray-300 mb-4">your saved <span className="font-carter text-3xl text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200">I Ching</span> readings</p>
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {ichingReadings.reverse().map((reading) => (
                    <li key={reading.id} className="relative">
                    <div className="group block w-full overflow-hidden rounded-sm bg-indigo-900">
                        <img src={`/images/${reading.reading_number}.png`} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                    </div>
                    <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-200">Hexagram # {reading.reading_number}</p>
                    <p className="pointer-events-none block text-sm font-medium text-gray-300">{new Date(reading.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </li>
                ))}
            </ul>
        </div>
        }

        {/* <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-300 mb-4">your saved <span className="font-carter text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200">I Ching</span> readings</h2>
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {ichingReadings.reverse().map((reading) => (
                    <li key={reading.id} className="relative">
                    <div className="group block w-full overflow-hidden rounded-sm bg-indigo-900">
                        <img src={`/images/${reading.reading_number}.png`} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                    </div>
                    <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-200">Hexagram # {reading.reading_number}</p>
                    <p className="pointer-events-none block text-sm font-medium text-gray-300">{new Date(reading.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </li>
                ))}
            </ul>
        </div> */}

    </div>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const supabase = createServerSupabaseClient(ctx)
    const {
      data: { session }
    } = await supabase.auth.getSession()
  
    if (!session)
      return {
        redirect: {
          destination: '/signin',
          permanent: false
        }
    };
  
    // Retrieve the Iching readings from the database
    const { data: ichingReadings, error } = await supabase
    .from('iching_readings')
    .select('*')
    .eq('user_id', session.user.id)

    // if (error) {
    //     console.error(error)
    // }



    return {
      props: {
        initialSession: session,
        user: session.user,
        ichingReadings: ichingReadings ?? [],
      }
    }
  }