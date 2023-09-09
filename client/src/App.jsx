import "./App.css";
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from 'react';
import Chat from "./pages/Chat";
import Register from "./pages/Register"
import Login from "./pages/Login"
import SetAvatar from "./pages/SetAvatar";

function App() {
  /* const[username, setUsername] = useState(""); 
  const [room, setRoom] = useState("");
  const [showChat, setShowChat]= useState(false);
  
  const joinRoom = () => {
    if (username !== "" && room !== ""){
      socket.emit("join_room",room)
      setShowChat(true);
    }
  };

  const JoinChat =()=>{
    return(
      !showChat ? (
        <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <input 
        type="text" 
        placeholder='John ..'
        onChange={(event)=>{
          setUsername(event.target.value)
        }}
        />
        <input 
        type="text" 
        placeholder='Room ID ..'
        onChange={(event)=>{
          setRoom(event.target.value)
        }}
        />
        <button onClick={joinRoom}>Join A Room</button>
        </div>
        )
        :
        (
        <Chat socket={socket} username={username} room={room}/>
        )
    ) 
  }*/

  return (

    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Chat/>}/>
        <Route path="/setAvatar" element={<SetAvatar/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}


  
export default App;
