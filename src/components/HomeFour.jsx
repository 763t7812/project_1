import React from 'react'
import home2 from '@/images/hometwo.png'
import home4 from '@/images/home4.png'
import arrow from '@/images/arrow.png'
import { PiVideoDuotone } from "react-icons/pi";

import Image from 'next/image'
function HomeTwo() {
    return (
        <section className="bg-cover bg-center h-screen relative" style={{ backgroundImage: 'url("/src/images/Bghome4.png")' }}>
            <section className='bg-white max-w-screen-2xl mx-auto lg:px-16 md:px-10 sm:px-6 px-4 py-16 flex lg:flex-row flex-col gap-6 justify-between items-center '>
                <div className='lg:w-1/2 w-full flex md:justify-start justify-center'>
                    <Image
                        src={home4}
                        width={1000}
                        height={1000}
                    />
                </div>
                <div className='lg:w-1/2 w-full flex flex-col md:gap-4 gap-6 -mt-20 font-inter'>
                    <h1 className='text-dark md:text-5xl text-4xl font-bold flex'
                    >
                        Click and Cam
                        <p className='ps-1 text-pink md:text-5xl text-4xl font-bold'>
                            Chat
                        </p>

                    </h1>
                    <p className='md:text-lg text-base'>
                        At Camsurf we want to make meeting new people as simple as possible. Our random video chat platform uses the fastest servers to allow lightning fast connections and ultra-high-quality streams. It takes less than a second to connect with someone and you can enable sound, chat with a mic or use our in-built text chat to type while still viewing the other person’s webcam.
                    </p>
                    <button className="bg-black text-white rounded-full py-2 w-[180px] flex justify-center items-center">
                        Start Video Chat <p className='ml-2'><PiVideoDuotone /></p>
                    </button>

                </div>

            </section>
        </section>
    )
}

export default HomeTwo