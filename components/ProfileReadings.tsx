import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    createServerSupabaseClient,
    User,
} from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'
import { Session } from '@supabase/gotrue-js';


export interface IchingReading {
    id: number
    user_id: string
    reading_number: number
    created_at: string
}

interface Props {
    user: User;
    ichingReadings: IchingReading[];
    session: Session
}

export default function ProfileReadings({ session, user }: Props) {
    const supabaseClient = useSupabaseClient()
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    
    const [readings, setReadings] = useState<IchingReading[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        async function fetchReadings() {
          const {
            data: { session }
          } = await supabase.auth.getSession()
    
          try {
            const { data, error } = await supabase
              .from('iching_readings')
              .select('*')
              .eq('user_id', session?.user.id)
    
            if (error) {
              console.error(error)
            } else {
            const readingsData = data.map((item: any) => ({
                id: item.id,
                user_id: item.user_id,
                reading_number: item.reading_number,
                created_at: item.created_at
                }))
              setReadings(readingsData ?? [])
            }
          } finally {
            setIsLoading(false)
          }
        }
    
        fetchReadings()
      }, [user, supabase])

    const deleteHandler = async (row: any) => {
        // setLoading(true)
        const { error } = await supabaseClient
          .from('iching_readings')
          .delete()
          .eq('id', row.id)
          .eq('user_id', row.user_id)
          .eq('reading_number', row.reading_number)
          .eq('created_at', row.created_at)
        // setLoading(false)
        if (error) alert(error.message)
        setReadings(prevState => prevState.filter(r => r.id !== row.id))
        // location.reload()
      }

      console.log(readings)

  return (
    <div>
        <div className="relative md:bg-gray-900/90 backdrop-blur-sm md:p-6 rounded-xl">

            {readings.length === 0 ?
            <p className="text-gray-300 flex justify-center">your saved readings will appear here</p> :
            <div className="flex flex-col items-center">
                <p className="pb-2 text-2xl text-gray-300 mb-4">your saved <span className="font-carter text-3xl text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-teal-200">I Ching</span> readings</p>
                <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {readings.reverse().map((reading) => (
                        <li key={reading.id} className="relative">
                        <Link className="group" href={`interpretations/${reading.reading_number}`}>
                            <div className="group block w-full overflow-hidden rounded-sm bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-600">
                                <img src={`/images/${reading.reading_number}.png`} alt="" className="pointer-events-none object-cover group-hover:opacity-50" />
                            </div>
                            <div className="flex justify-center">
                            <p className="mt-2 block truncate text-lg font-medium text-gray-200 hover:text-cyan-200">Hexagram # {reading.reading_number}</p>
                            </div>
                            <span className="absolute bottom-3 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-cyan-100 group-hover:scale-100">
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
                            <span className="absolute bottom-11 scale-0 transition-all rounded bg-gray-800 p-1 text-xs text-cyan-100 group-hover:scale-100">
                            <span className="text-lg">🤬</span> Hate this reading? Delete it forever <span className="text-lg">🗑️</span>
                            </span>
                        </div>
                        </li>
                    ))}
                </ul>
            </div>
            }

      </div>
    </div>
  )
}
