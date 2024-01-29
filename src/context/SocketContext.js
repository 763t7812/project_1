"use client"
import React, { useEffect, useRef, useState } from "react"
import { io } from 'socket.io-client'
import axios from 'axios'
import Peer from 'simple-peer'

const SocketContext = React.createContext()

const socket = io('https://server-kf7t.onrender.com/')


const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null)
  const [oncall, setOncall] = useState(false)
  const [me, setMe] = useState('')
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([])
  const [writing, setWriting] = useState(false)
  const [callid, setCallid] = useState(null)
  const [calling, setCalling] = useState(false)
  const [online, setOnline] = useState(0)

  const myVideo = useRef()
  const userVideo = useRef()
  const connectonRef = useRef()
  const textarea = useRef()

  useEffect(() => {
    localStorage.setItem('from', null)
    localStorage.setItem('oncall', 'false')
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentstream) => {
        setStream(currentstream)
      })
    socket.on('calluser', ({ from, name: callername, signal }) => {
      setCall({ isReceivedCall: true, from, callername, signal })
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentstream) => {
          if (localStorage.getItem('oncall') == 'false') {
            setOncall(true)
            ansercall({ isReceivedCall: true, from, callername, signal }, currentstream)
          }
        })
    })
  }, [])

  socket.on('me', (id) => {
    setMe(String(id))
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('id', id);
    } else {
      // Handle the case when localStorage is not available
      console.error('localStorage is not available');
    }
  })


  socket.on('message', (data) => {
    newmsg(data)
  })

  const addstream = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentstream) => {
        myVideo.current.srcObject = currentstream
      })
  }

  const newmsg = (msg) => {
    if (msg.msg == 'kydwn@typing') return setWriting(true)
    if (msg.msg == 'kydwn@stoped') return setWriting(false)
    let d = [...messages, ...[msg]]
    setMessages(d)
  }
  // answer user
  const ansercall = (call, stream) => {
    setCallAccepted(true)
    const peer = new Peer({ initiator: false, trickle: false, stream })
    peer.on('signal', (data) => {
      socket.emit('answercall', { signal: data, to: call.from })
      localStorage.setItem('from', call.from)
    })

    try {
      peer.on('stream', (currentstream) => {
        localStorage.setItem('oncall', true)
        userVideo.current.srcObject = currentstream
      })
    } catch (error) {
      console.log(error, 'two')
    }

    peer.signal(call.signal)
    connectonRef.current = peer
    axios.get('https://api-t3gj.onrender.com/api/call/' + localStorage.getItem('id')).then(data => { })
  }
  // call user
  const calluser = async (id, setFailed) => {
    socket.emit('isConnected', id, function (result) {
      if (result) {
        localStorage.setItem('from', id)
        const peer = new Peer({ initiator: true, trickle: false, stream })
        peer.on('signal', (data) => {
          socket.emit('calluser', { userToCall: id, name: Math.floor(Math.random() * 10000), signalData: data, from: me })
        })


        try {
          peer.on('stream', (currentstream) => {
            userVideo.current.srcObject = currentstream
            localStorage.setItem('oncall', true)
          })
        } catch (error) {
          console.log(error, 'one')
        }


        socket.on('callaccepted', (signal) => {
          localStorage.setItem('oncall', true)
          setCallAccepted(true)
          peer.signal(signal)
          axios.get('https://api-t3gj.onrender.com/api/call/' + localStorage.getItem('id')).then(data => { })

        })

        try {
          connectonRef.current = peer
        } catch (error) {
          console.log(error, 'one')
        }

        setFailed(false)
      } else {
        setFailed(true)
      }
    })
    // return false
  }
  const callUserid = (me) => {
    const alreadyConnectedUsers = []; // Define the array to keep track of connected users
    setCalling(true);
    addstream();
  
    axios.get('https://api-t3gj.onrender.com/api/call/' + localStorage.getItem('id')).then(data => { });
    console.log("me: ", me);
    axios.get('https://api-t3gj.onrender.com/api/getids')
      .then(data => {
        console.log(typeof (localStorage.getItem('oncall')));
        console.log(data);
        if (data.data.data.length === 0) {
          if (localStorage.getItem('oncall') === 'false') {
            keeplive();
          }
        } else {
          let u_id = 0;
          let allusers = data.data.data;
          socket.emit('total', me, (result) => {
            let users = allusers.filter(usr => result.includes(usr.uid));
            setOnline(users.length);
  
            // Filter out users that you have already connected to and those who are not the current user (me)
            const usersNotConnected = users.filter(user => !alreadyConnectedUsers.includes(user.uid) && user.uid !== me);
            
            if (usersNotConnected.length > 0) {
              const randomUser = usersNotConnected[Math.floor(Math.random() * usersNotConnected.length)];
              setCallid(randomUser.uid);
              alreadyConnectedUsers.push(randomUser.uid); // Add the user to the list of already connected users
            } else {
              // If all available users are already connected or the same as the current user, do something else or handle this case.
            }
  
            if (u_id === 0 && localStorage.getItem('oncall') === 'false') {
              keeplive();
            }
          });
        }
      });
  };
  


  const leavecall = () => {
    // Clean up existing RTCPeerConnection
    // if (connectonRef?.current) {
    // connectonRef.current.destroy(); // Destroy the peer connection
    // callUserid(localStorage.getItem('id'));
    // }

    // Other cleanup actions
    localStorage.setItem('from', null);
    localStorage.setItem('oncall', 'false');
    // setCallEnded(true);
    socket.emit('leavecall');
    // window.location.reload()
    callUserid(localStorage.getItem('id'));

    // Ab signal bhejne ki koshish karein

  };
  // const leavecall = ()=>{
  //   window.localStorage.setItem('from',null)
  //   window.localStorage.setItem('oncall','false')
  //   setCallEnded(true)
  //   if(connectonRef.current) connectonRef.current.destroy()
  //   window.location.reload()
  // }



  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  };
  const sendMessage = (msg, setMsg) => {
    if (msg.trim() == '') return
    let message = {
      to: localStorage.getItem('from'),
      msg: msg
    }
    socket.emit('message', message)
    setMessages([...messages, ...[message]])
    scrollToBottom()
    setMsg('')
    textarea.value = ''
  }
  const settyping = (state) => {
    let message = {
      to: localStorage.getItem('from'),
      msg: state
    }
    socket.emit('message', message)
  }
  const keeplive = () => {

    let tm = setInterval(() => {
      if (localStorage.getItem('oncall') === 'false') {
        setCalling(true)
        axios.get('https://api-t3gj.onrender.com/api/getids')
          .then(dat => {
            if (dat.data.data.length > 0) {
              let allusers = dat.data.data
              let ids = []
              socket.emit('total', me, (result) => {
                let users = allusers.filter(urs => result.includes(urs.uid)).reverse()
                setOnline(users.length)
                for (let i = 0; i < users.length; i++) {
                  if (users[i].uid != localStorage.getItem('id') && !ids.includes(users[i].uid)) {
                    ids.push(users[i].uid)
                    if (localStorage.getItem('oncall') === 'true') return clearInterval(tm)
                    if (localStorage.getItem('oncall') !== 'false') return console.log('clear')
                    setCallid(users[i].uid)
                    break
                  }

                }
              })

            }
          })
      } else {
        clearInterval(tm)
      }
    }, 3000);
  }
  return (
    <SocketContext.Provider value={{
      messages,
      me,
      calling,
      setCalling,
      callid,
      setCallid,
      callUserid,
      setOnline,
      online,
      keeplive,
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
      ansercall,
      sendMessage,
      settyping,
      writing,
      socket,
      messagesContainerRef,
      addstream, oncall, setOncall
    }}>
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext } 