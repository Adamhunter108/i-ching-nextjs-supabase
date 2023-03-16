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




export default function profile({ user }: { user: User }) {
    const [loading, setLoading] = useState(false)
    const { isLoading, subscription, userDetails } = useUser()
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

        <h1 className="text-2xl text-gray-300 mt-20 pl-10">Profile</h1>


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
  
    return {
      props: {
        initialSession: session,
        user: session.user
      }
    }
  }