import {useRouter} from 'next/router';
import socketio from 'socket.io-client';
import { useEffect, useState,useRef } from 'react';
import RenderMesseges from '../../Components/RenderMesseges';
import styles from '../../Components/header.module.scss'
import Header from '../../Components/header';

export default function nameid () {
    const router = useRouter();
    const {roomid,nameid} = router.query; 
    const [messages,setMessages]= useState([]);
    const [name,setName] = useState(nameid);
    const [text,setText] = useState('');
    const Endpoint = 'http://localhost:3000';
    const socket = socketio(Endpoint);

    useEffect(() => {
        socket.emit('create',roomid,name);
        socket.on('toClient',(message,name)=>{
                setMessages(messages => [...messages,{
                    type : 'Recieved',
                    name : name,
                    message : message
                }]);
        })
        socket.on('user-joined',name => {
            setMessages(messages => [...messages,{ 
                type : "attention",
                message : `${name} Joined`
            }])
        })
        socket.on('user-left-client',(name) => {
            setMessages(messages => [...messages,{
                type : 'attention',
                message : `${name} Left`
            }])
        })
        return function cleanup(){
            socket.emit('user-left-server',roomid,name);
        }
    },[])
    const HandleData = () => {
        router.push('/');
    }
    const HandleSendMessage = (e) => {
        e.preventDefault();
        if(!text) return;
        socket.emit('toServer',text,roomid,name);
        setMessages(messages => [...messages,{
            type : "Sent",
            message : text,
        }])
        setText('');
    }

    const chatRef = useRef();
    useEffect(() => {
        if (chatRef.current.lastElementChild) {
          const lastElement = 150;
          const visibleHeight = chatRef.current.offsetHeight;
          const containerHeight = chatRef.current.scrollHeight;
          const scrollOffset = chatRef.current.scrollTop + visibleHeight;
          if (containerHeight - lastElement <= scrollOffset) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
          }
        }
      });

    return (
        <>
        <Header/>
            <div ref = {chatRef} className = {styles.message} >
                <RenderMesseges messages = {messages} />
            </div>
            <form  className = {styles.form} onSubmit = {HandleSendMessage} >
            <input className = {styles.input_box} onChange = {(e) => setText(e.target.value)} value = {text}  />
            <button onClick = {HandleSendMessage} className = {styles.input_btn} >Send</button>
            <button className = {styles.input_btn} onClick = {HandleData}  >Exit from Room</button>
            <div className = {styles.roomid} >Room Id : <span>{roomid}</span></div>
            <p className = {styles.roomid} >Share this Room id with everybody you want to chat with</p>
            </form>
        </>
    )
} 