import { useState } from 'react';
import styles from './header.module.scss';
import { useRouter } from 'next/router';

export default function JoinRoom() {
    const router = useRouter();
    const [roomId,setRoomId] = useState('');
    const [name,setName] = useState('');
    const HandleRoom = () => {
        router.push(`/${roomId}/${name}`)
    }
    return (
        <div className = {styles.card} >
            <p>Enter Room Id !</p>
            <input value = {roomId} onChange = {(e) => setRoomId(e.target.value)} />
            <p>Enter Your Name !</p>
            <input value = {name} onChange = {e => setName(e.target.value)} />
            <button onClick = {HandleRoom} className = {styles.card_btn}>Enter</button>
        </div>
    )
}