import React from 'react'
import home2 from '@/images/hometwo.png'
import arrow from '@/images/arrow.png'

import Image from 'next/image'
function HomeTwo() {
    return (
        <section className='bg-light-white relative font-inter'>
            <section className='bg-white max-w-screen-2xl mx-auto lg:px-16 md:px-10 sm:px-6 px-4 py-16 flex lg:flex-row flex-col gap-4 justify-between items-center '>
                <div className='lg:w-1/2 w-full flex flex-col md:gap-4 gap-6'>
                    <h1 className='text-dark md:text-5xl text-4xl font-bold'
                    >
                        Free Random
                        <div>
                            video Chat
                            <span className='ps-1 text-pink md:text-5xl text-4xl  font-bold'>

                                App!
                            </span>
                        </div>
                    </h1>
                    <p className='md:text-lg text-base'>
                        Welcome to Camsurf’s random video chat app!
                    </p>
                    <p className='md:text-lg text-base'>
                        On Camsurf you can connect with thousands of people from all over the world in a fun environment. Our community reporting system helps make sure that people chatting on Camsurf are following our terms of use. Chat with confidence and meet interesting people just like you instantly.                    </p>
                    <p className='md:text-lg text-base'>
                        Our lightweight chat platform makes video chat easy without sacrificing great features. You’ll feel like a pro in seconds. Simply agree with our terms of use and privacy policy, allow access to your webcam and then click on the large ‘start’ button to be instantly connected to a new and interesting person. You can even filter connections by location or language.
                    </p>
                    <p className='md:text-lg text-base'>
                        Camsurf has thousands of users online at all times. If you want to meet someone new, simply click the ‘next’ button and you will be connected with a new stranger right away. It’s so simple to make hundreds of new friends, maybe you will even find that special someone.
                    </p>
                </div>
                <div className='hidden absolute top-0 left-0 right-0 lg:flex justify-center items-center'>
                    <Image
                        src={arrow}
                        width={200}
                        height={200}
                    />
                </div>
                <div className='lg:w-1/2 w-full flex md:justify-end justify-center'>
                    <Image
                        src={home2}
                        width={1000}
                        height={1000}
                    />
                </div>
            </section>
        </section>
    )
}

export default HomeTwo