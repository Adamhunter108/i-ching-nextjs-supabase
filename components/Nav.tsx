import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/utils/useUser'

export default function Nav() {
    const router = useRouter()
    const currentRoute = router.asPath
    const supabaseClient = useSupabaseClient()
    const { user } = useUser()

    const [showSidebar, setShowSidebar] = React.useState<boolean>(false)

    return (
        <>
            {showSidebar ? (
                <button
                className="flex text-4xl text-gray-400 items-center cursor-pointer fixed right-10 top-6 z-50"
                onClick={() => setShowSidebar(!showSidebar)}
                >
                        {/* X SVG */}
                    <svg className="w-10 h-10 text-indigo-500 hover:text-gray-200" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"/>
                    </svg>
                </button>
            ) : (
                <button onClick={() => setShowSidebar(!showSidebar)} className="fixed z-30 flex items-center cursor-pointer right-4 lg:right-20 top-6">
                        {/* STAGGERED BARS SVG */}
                    <svg className="w-10 h-10 text-indigo-500 hover:text-gray-200" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM64 256C64 238.3 78.33 224 96 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H96C78.33 288 64 273.7 64 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/>
                    </svg>
                </button>
            )}

            <div
                className={`top-0 right-0 w-full sm:w-full md:w-1/2 lg:w-1/3 bg-black/40 backdrop-blur-lg p-10 pl-2 text-white fixed h-full z-40  ease-in-out duration-300 ${
                    showSidebar ? "translate-x-0 " : "translate-x-full"
                    }`}
            >
                <h3 className="font-carter mt-10 pb-5 text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-cyan-400 flex justify-center">
                    I Ching
                </h3>

                <p className="text-lg text-gray-200 flex justify-center">{user ? `Signed in as ${user.email}` : null}</p>
                
                <Link href="/">
                    <div
                        className={`${currentRoute === "/" ? "text-indigo-500" : "text-gray-300"} "justify-center grid gap-1 hover:bg-gray-700/40 hover:text-indigo-500 px-3 py-4 rounded-md text-xl font-medium"`}
                    >
                        <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M511.8 287.6L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L416 100.7V64C416 46.33 430.3 32 448 32H480C497.7 32 512 46.33 512 64V185L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6L511.8 287.6z"/>
                        </svg>
                        Home
                    </div>
                </Link>

                <div className="border-t border-white/40" />

                {user ? (
                    <div>
                    
                        <Link href="/profile">
                            <div
                                className={`${currentRoute === "/signin" ? "text-indigo-500" : "text-gray-300"} "justify-center grid gap-1 hover:bg-gray-700/40 hover:text-indigo-500 px-3 py-4 rounded-md text-xl font-medium inline-block"`}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                                <span className="inline-block">Profile</span>
                            </div>
                        </Link>
                        <div className="border-t border-white/40" />
                    </div>
                ) : null}

                {user ? (
                    <span
                        onClick={async () => {
                        await supabaseClient.auth.signOut();
                        router.push('/signin');
                        }}
                        className="cursor-pointer"
                    >
                        <div
                            className={`${currentRoute === "/signin" ? "text-indigo-500" : "text-gray-300"} "justify-center grid gap-1 hover:bg-gray-700/40 hover:text-indigo-500 px-3 py-4 rounded-md text-xl font-medium inline-block"`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>

                            <span className="inline-block">Sign out</span>
                        </div>
                    </span>
                ) : (
                    <Link href="/signin">
                        <div
                            className={`${currentRoute === "/signin" ? "text-indigo-500" : "text-gray-300"} "justify-center grid gap-1 hover:bg-gray-700/40 hover:text-indigo-500 px-3 py-4 rounded-md text-xl font-medium inline-block"`}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                            <span className="inline-block">Sign In</span>
                        </div>
                    </Link>
                )}

                <div className="border-t border-white/40" />                

                <Link href="/about">
                    <div
                        className={`${currentRoute === "/about" ? "text-indigo-500" : "text-gray-300"} "justify-center grid gap-1 hover:bg-gray-700/40 hover:text-indigo-500 px-3 py-4 rounded-md text-xl font-medium"`}
                    >
                        <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"/>
                        </svg>
                        About
                    </div>
                </Link>

                <div className="border-t border-white/40" />

                <div className="absolute bottom-4 w-full flex justify-center">
                    <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-red-500 to-teal-400">Made with ❤️ in NYC</p>
                </div>

            </div>
            
        </>
    )
}