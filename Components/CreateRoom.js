import styles from './header.module.scss';
import Link from 'next/link'
import { useRef, useState } from 'react';


export default function createRoom({roomId}) {
    const [text,setText] = useState("");
    const [copytext,setCopyText] = useState("Copy ID"); 
    const HandleCopy = () => {
        const copy_text = roomId;
        navigator.clipboard.writeText(copy_text).then(function() {
            setCopyText('Copied!!');
            setTimeout(() => {
                setCopyText('Copy');
            },4000)
        }).catch(err => {
            alert('Some Error Occurred on Copying ! Try Again After Sometime')
        })
    }
    return (
        <div className = {styles.card} >
            <p>Share Room Id with your Friends !!</p>
            <h4>{roomId}</h4>
            <p>Enter Your Name :</p>
            <input onChange = {(e) => setText(e.target.value)} type = "text" />
            <div>
                <Link href = {`/${roomId}/${text}`}><button className = {styles.card_btn} >Enter</button></Link>
                <button onClick = {HandleCopy} className = {styles.card_btn} >{copytext}</button>
            </div>
            <p>*Room id is case-senstive</p>
        </div>
    )
}