import { useEffect, useRef } from 'react';
import shortid from 'shortid';
import styles from './header.module.scss';
export default function RenderMesseges({messages}) {
    return (
        <>
        <div className = {styles.attention} >Welcome To Let's Chat</div>
        {messages.map((message) => {
            const {type} = message;
            if(type === 'attention') {
                return (
                    <div key = {shortid.generate()} className = {styles.attention} >{message.message}</div>
                )
            }
            else if(type === 'Recieved') {
                return (
                    <div key = {shortid.generate()} className = {styles.recieved} ><span>{message.message}</span><small>{message.name}</small></div>
                )
            }
            else {
                return (
                    <div key = {shortid.generate()} className = {styles.sent} ><span>{message.message}</span></div>
                )
            }
        })}
        </>
        )
}