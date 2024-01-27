import React from 'react'
import camnyt from "@/images/camnyt.png"
import fb from "@/images/fb.png"
import twitter from "@/images/twitter.png"
import insta from "@/images/insta.png"
import youtube from "@/images/youtube.png"
import Image from 'next/image';

const Footer = () => {
    return (
        // <div className='bg-black h-[200px] flex'>
        //     <div className='w-[20%] items-center justify-center'>
        //         <Image src={camnyt} width={170} height={140} className='mt-20 ml-10' />
        //     </div>

        //     <div className='w-[50%] flex flex-col items-center justify-center'>
        //         <div className='flex items-center justify-center'>
        //             <p className='text-white'>Privacy policy</p> <p>Terms of use</p>
        //         </div>
        //         <div className='flex items-center justify-center gap-6 mt-7'>
        //             <p className='text-[#FF5887]'>Home</p>
        //             <p className='text-white'>About Us</p>
        //             <p className='text-white'>Guuidelines</p>
        //             <p className='text-white'>Stories</p>
        //             <p className='text-white'>Faq</p>
        //             <p className='text-white'>Press</p>
        //         </div>
        //     </div>

        //     <div className='flex gap-5 items-center justify-center'>
        //         <Image src={fb} className='h-10 w-10'/>
        //         <Image src={twitter} className='h-10 w-10'/>
        //         <Image src={insta} className='h-10 w-10'/>
        //         <Image src={youtube} className='h-10 w-10'/>
        //     </div>

        // </div>
        <div className="">
            <div className='container  w-full text-white bg-gradient-to-b from-opacity-20 from-[#1E1E1E] to-black py-10 gap-4 px-7 place-content-between place-items-center grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3'>
                <ul className="max-w-[150px]  mt-8 w-full">
                    <Image
                        src={camnyt}
                        className="pb-7"
                        alt=""
                        width={120}
                        height={71}
                    />

                </ul>
                <div className="!max-w-[800px] flex-col md:text-base text-sm gap-4 md:flex-nowrap flex-wrap flex   justify-center items-center w-full">
                    <ul className="!max-w-[800px] md:text-base text-sm gap-4 md:flex-nowrap flex-wrap flex   justify-center items-center w-full">
                        <li >Privacy policy</li>
                        <li >Terms of use </li>


                    </ul>
                    <ul className="!max-w-[800px] md:text-base text-sm gap-4 md:flex-nowrap flex-wrap flex   justify-center items-center w-full">
                        <li >Home</li>
                        <li >About </li>
                        <li >Guidelines</li>
                        <li >Stories</li>
                        <li >Faq</li>
                        <li >Press</li>

                    </ul>
                </div>
                <ul className="max-w-[250px]   w-full">

                    <div className="flex mt-3 justify-start  gap-2 items-center">
                        <Image className="w-[50px]" src={fb} alt="" />
                        <Image className="w-[50px]" src={twitter} alt="" />
                        <Image className="w-[50px]" src={insta} alt="" />
                        <Image className="w-[50px]" src={youtube} alt="" />
                    </div>
                </ul>
            </div>
            <div className='text-center text-sm py-2 text-white  w-full bg-[#FF5887]'>
                © 2024 Camsurf Website. All Rights Reserved.
            </div> 
        </div>
    )
}

export default Footer