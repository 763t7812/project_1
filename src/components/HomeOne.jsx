"use client"
import React, { useContext, useState, useEffect, useRef } from 'react';
import home1 from '@/images/home1.png';
import cam from '@/images/camnyt.png';
import male from '@/images/male.png';
import video from '@/images/video.png';
import lock from '@/images/lock.png';
import apple from '@/images/apple.png';
import google from '@/images/google.png';
import star from '@/images/star.png';
import setting from '@/images/setting.png';
import { Share2 } from 'lucide-react';
import Image from 'next/image';
import { AlignJustify } from 'lucide-react';
import { MoveRight } from 'lucide-react';
import { SocketContext } from '../context/SocketContext'

function HomeOne() {
    const [media, setMedia] = useState(false)
    const [failed, setFailed] = useState(false)


    const [msg, setMsg] = useState('')
    const {
        messages,
        me,
        calling,
        setCalling,
        callid,
        keeplive,
        setCallid,
        setOnline,
        online,
        callUserid,
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        calluser,
        leavecall,
        textarea,
        sendMessage,
        settyping,
        writing,
        socket,
        messagesContainerRef,
        addstream, oncall, setOncall,
        ansercall } = useContext(SocketContext)

    useEffect(() => {
        socket.emit('total', me, (result) => {
            setOnline(result.length)
            // console.log(result,'<=== ye hay user count wala')
        })
    }, [])

    // const callUserid = (me) => {
    //     setCalling(true);
    //     addstream();

    //     axios.get('https://api-t3gj.onrender.com/api/call/' + localStorage.getItem('id')).then(data => {});
    //     console.log("me: ", me);
    //     axios.get('https://api-t3gj.onrender.com/api/getids')
    //       .then(data => {
    //         console.log(typeof (localStorage.getItem('oncall')));
    //         console.log(data);
    //         if (data.data.data.length == 0) {
    //           if (localStorage.getItem('oncall') === 'false') {
    //             keeplive();
    //           }
    //         } else {
    //           let u_id = 0;
    //           let allusers = data.data.data;
    //           socket.emit('total', me, (result) => {
    //             let users = allusers.filter(usr => result.includes(usr.uid));
    //             setOnline(users.length);
    //             const shuffledUsers = users.slice().sort(() => Math.random() - 0.5);

    //             // **Call leavecall() here to disconnect from any existing call:**
    //              // Disconnect from existing call before starting a new one

    //             for (let i = 0; i < shuffledUsers.length; i++) {
    //               if (users[i].uid != localStorage.getItem('id')) {
    //                 setCallid(users[i].uid);
    //                 u_id = users[i].uid;
    //                 break;
    //               }
    //             }

    //             if (u_id == 0 && localStorage.getItem('oncall') === 'false') {
    //               keeplive();
    //             } else {
    //             }
    //           });
    //         }
    //       });
    //   };


    useEffect(() => {
        if (!callid) return
        const callru = async () => {
            setCalling(true)
            calluser(callid, setFailed)

        }
        callru()
    }, [callid])

    useEffect(() => {
        if (failed) {
            keeplive()
        }
    }, [failed])



    return (
        <section className='flex max-w-screen-2xl mx-auto justify-center items-start w-full'>
            <div className='w-1/2 relative'>
                <Image src={home1} className='relative w-full lg:h-full h-full  flex justify-center items-center' width={1000} height={1000} alt='' />

                {calling ?
                    <div className='text-white absolute top-0  h-full w-full    flex-col  '>
                        <video playsInline={true} autoPlay={true} className="uservideo" ref={userVideo} style={{ display: callAccepted && !callEnded ? 'inline' : 'inline' }}></video>
                        <div className='flex justify-between items-center gap-1 '>
                            {/* <Image src={google} width={150} height={100} />
                            <Image src={apple} width={150} height={100} /> */}
                            <button className='flex justify-center items-center h-[100px] w-[400px] bg-slate-400'>start</button>
                            <button className='flex justify-center items-center h-[100px] w-full bg-slate-400'>stop</button>
                            <button
                                className='flex justify-center items-center h-[100px] w-full bg-slate-400'
                                onClick={() => {
                                    leavecall(); // Disconnect the current call
                                    // callUserid(localStorage.getItem('id')); // Initiate a new call
                                }}
                            >Next</button>
                            <button className='flex justify-center items-center h-[100px] w-full bg-slate-400'>I am</button>
                        </div>
                    </div>
                    : <div className='text-white absolute top-0 lg:left-14 pr-2 md:left-6    max-w-xl  lg:h-[85vh] 2xl:h-[70vh] max-h-[950px] h-[65vh] flex justify-center   flex-col gap-6 '>
                        <div className='flex justify-between'>
                            <Image src={cam} width={250} height={200} />
                            <Image src={star} width={50} height={10} />
                        </div>
                        <h4 className='font-inter font-semibold lg:text-2xl text-1xl  '>9,851,548 joined Camsurf</h4>
                        <div className='flex gap-2'>
                            <button className='bg-pink px-3 flex items-center gap-1 text-white text-xs  py-3 bg-gradient-to-b from-[#FF5887] to-[#FF0E52] rounded-3xl '>Select Your Gender <Image src={male} width={10} height={10} /></button>
                            <button className='px-3 py-3 bg-gradient-to-b flex text-white text-xs   items-center gap-1 from-[#0197F5] to-[#62C2FF] rounded-3xl '>Select Your Gender <Image src={video} width={10} height={10} /> </button>
                        </div>
                        <button
                            onClick={() => {
                                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                                    .then((currentstream) => {
                                        setMedia(false)
                                        callUserid(localStorage.getItem('id'))
                                    })
                                    .catch((error) => {
                                        setMedia(true)
                                        console.log(error)
                                    })
                            }}
                            className='px-3 max-w-[330px] py-3 bg-gradient-to-b flex text-white text-xs   items-center gap-1 from-[#525252] to-[#161616]  rounded-3xl text-center  justify-center '>Start Video Chat <Image src={lock} width={10} height={10} /> </button>

                        <div className='flex text-sm gap-2'>
                            <input type="checkbox" className='bg-pink ' />
                            <p className='lg:text-base text-sm	'>I certify I have read and agree to the Terms of Use and Cookie Notice. I certify I am at least 18-years old and have reached the age of majority where I live.</p>
                        </div>
                        <div className='flex gap-3'>
                            <Image src={google} width={150} height={100} />
                            <Image src={apple} width={150} height={100} />
                        </div>
                    </div>}
            </div>
            <div className='w-1/2 relative'>
                {calling ?
                    <video playsInline={true} className="myvideo" autoPlay={true} ref={myVideo} style={{ display: stream ? 'inline' : 'none' }}></video>
                    : <video autoPlay muted className='bg-black w-full  2xl:h-[60vh] max-h-[950px] lg:h-[60vh] h-[65vh] '>
                        <source src={video} type="video/mp4" className='hero-video' />
                    </video>
                }
                <div className='absolute top-0 right-0 p-10 flex gap-6'>
                    <Share2 className='text-white cursor-pointer' />
                    <AlignJustify className='text-white cursor-pointer' />
                </div>
                <div className='bg-[#EDEDED] px-6  flex gap-3 items-end'>
                    <div className='items-baseline'>
                        <Image src={setting} width={30} height={30} />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className={`flex flex-col gap-3 h-[150px] overflow-y-auto ${messages && messages.length > 0 && 'pb-10'}`} ref={messagesContainerRef}>
                            <span className="live">{online > 0 ? `${online}+` : online} users {calling ? 'active' : 'online'}</span>
                            <h2 className='underline text-xl text-dark font-semibold'>Report Bugs and Issue
                            </h2>
                            <p> 9,851,548 joined Camsurf <span>Special Offer, Get Plus Today!</span></p>
                            {messages.map((msg, i) => (
                                <div key={i} className="me">
                                    <span><strong>{msg.to == me ? 'Stranger:' : 'Me:'}</strong></span>
                                    <span className="msg">{msg.msg}</span>
                                </div>
                            ))}
                        </div>

                        {writing &&
                            <div className="usertyping">
                                <svg height="40" width="40" className="loader">
                                    <circle className="dot" cx="10" cy="20" r="3" />
                                    <circle className="dot" cx="20" cy="20" r="3" />
                                    <circle className="dot" cx="30" cy="20" r="3" />
                                </svg>
                            </div>

                        }
                        <span className='bg-[#1C1C1C] w-full py-2 flex justify-between pe-2 rounded-md'>
                            {/* typing */}
                            <input type="text" onKeyDown={(event) => {
                                event.keyCode == 13 ? sendMessage(msg, setMsg) : settyping('kydwn@typing')
                                if (event.keyCode == 13) settyping('kydwn@stoped')
                            }} ref={textarea} onBlur={() => settyping('kydwn@stoped')} onChange={(e) => setMsg(e.target.value)} value={msg} placeholder='Type Your Massege Here and Press Enter' className='outline-none ps-3 text-sm w-full bg-[#1C1C1C]' />
                            <MoveRight className='text-[#1CA5FC] cursor-pointer ' onClick={() => (sendMessage(msg, setMsg), scrollToBottom())} />
                        </span>
                    </div>

                </div>
                {/* <div className="message">
                <div className="header"><a onClick={()=>leavecall()} style={{cursor:'pointer'}}>Escape</a>
                <span><strong>Chating With a Stranger</strong></span>
                </div>
              <div className="messages">
                {messages.map((msg,i)=>(
                      <div key={i} className="me">
                      <span><strong>{msg.to==me?'Stranger:':'Me:'}</strong></span>
                      <span className="msg">{msg.msg}</span>
                  </div>
                ))}
               
              
                
               
                  
               
               {writing  &&
                 <div className="usertyping">
                  <svg height="40" width="40" className="loader">
                  <circle className="dot" cx="10" cy="20" r="3"  />
                  <circle className="dot" cx="20" cy="20" r="3"  />
                  <circle className="dot" cx="30" cy="20" r="3" />
                  </svg>
                  </div>
               
               }
                
              </div>
              <div className="text">
               
                <input type="text" onKeyDown={(event)=>{
                  event.keyCode==13?sendMessage(msg,setMsg):settyping('kydwn@typing')
                  if(event.keyCode==13)settyping('kydwn@stoped')
                  }} ref={textarea} onBlur={()=>settyping('kydwn@stoped')} onChange={(e)=>setMsg(e.target.value)} value={msg} placeholder="Type a message..." />
                <button style={{backgroundColor:msg.trim()?'rgb(71, 149, 250)':'#242323',color:msg.trim()?'whitesmoke':'#242323',width:'70px'}} disabled={!msg.trim()} className="send" onClick={()=>sendMessage(msg,setMsg)}>Send</button>
              </div>
            </div> */}

            </div>
        </section>
    );
}

export default HomeOne;
