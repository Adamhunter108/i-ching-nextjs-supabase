import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { GetServerSidePropsContext } from 'next'
import {
  createServerSupabaseClient,
  User,
} from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
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
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { isLoading, subscription, userDetails } = useUser()
    const supabaseClient = useSupabaseClient()
    const [readings, setReadings] = useState<IchingReading[]>(ichingReadings)


    const deleteHandler = async (row: any) => {
      setLoading(true)
      const { error } = await supabaseClient
        .from('iching_readings')
        .delete()
        .eq('id', row.id)
        .eq('user_id', row.user_id)
        .eq('reading_number', row.reading_number)
        .eq('created_at', row.created_at)
      setLoading(false)
      if (error) alert(error.message)
      setReadings(prevState => prevState.filter(r => r.id !== row.id))
      location.reload()
    }
    
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
        <p className="pt-4 pb-4 flex justify-center text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200 text-3xl font-thin">Consult your past</p>

        {ichingReadings.length === 0 ?
        <p className="text-gray-300 flex justify-center">your saved readings will appear here</p> :
        <div className="flex flex-col items-center">
            <p className="text-2xl text-gray-300 mb-4">your saved <span className="font-carter text-3xl text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200">I Ching</span> readings</p>
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {ichingReadings.reverse().map((reading) => (
                    <li key={reading.id} className="relative">
                      {/* <Link className="group" href={`https://divination.com/iching/lookup/${reading.reading_number}-2/`} target="_blank"> */}
                      <Link className="group" href={`interpretations/${reading.reading_number}`}>
                        <div className="group block w-full overflow-hidden rounded-sm bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-600">
                            <img src={`/images/${reading.reading_number}.png`} alt="" className="pointer-events-none object-cover group-hover:opacity-50" />
                        </div>
                        <div className="flex justify-center">
                          <p className="mt-2 block truncate text-lg font-medium text-gray-200 hover:text-cyan-200">Hexagram # {reading.reading_number}</p>
                        </div>
                        <span className="absolute bottom-3 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-cyan-100 group-hover:scale-100">
                        <span className="text-lg">🤔</span> Read more... 
                        </span>
                      </Link>
                      <div className="flex justify-center">
                        <p className="pointer-events-none block text-sm font-medium text-gray-400">{new Date(reading.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                      <div className="group pt-1 flex justify-center">
                        <button
                          type="button"
                          onClick={() => deleteHandler(reading)}
                          className="rounded-full bg-indigo-800 p-1 text-cyan-200 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                        <span className="absolute bottom-11 scale-0 transition-all rounded bg-gray-900 p-1 text-xs text-cyan-100 group-hover:scale-100">
                          <span className="text-lg">🤬</span> Hate this reading? Delete it forever <span className="text-lg">🗑️</span>
                        </span>
                      </div>
                    </li>
                ))}
            </ul>
        </div>
        }

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