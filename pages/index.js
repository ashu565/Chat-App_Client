import Header from "../Components/header";
import styles from "./main.module.scss";
import { useState } from "react";
import shortid from "shortid";
import CreateRoom from "../Components/CreateRoom";
import JoinRoom from "../Components/JoinRoom";
import Image from "next/image";

export default function Home() {
  const [createRoomPanel, setCreateRoomPanel] = useState(false);
  const [joinRoomPanel, setJoinRoomPanel] = useState(false);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Image width={90} height={80} src="/logo.png" alt="logo" />
        <h4>Lets Chat</h4>
      </div>

      <button
        onClick={() => setCreateRoomPanel(true)}
        className={styles.special}
      >
        Create Room
      </button>
      <button onClick={() => setJoinRoomPanel(true)} className={styles.special}>
        Join Room
      </button>
      <div>
        {createRoomPanel && (
          <CreateRoom roomId={shortid.generate().toLocaleLowerCase()} />
        )}
        {joinRoomPanel && <JoinRoom />}
      </div>
      <h4 className={styles.name}>Made By Ashutosh Singh 💖</h4>
    </>
  );
}
