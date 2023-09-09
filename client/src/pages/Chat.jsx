import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import axios from "axios"; 

export default function Chat() {
  
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  async function setCurrentUserf() {
    try{
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
      const data = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      const userdata = await JSON.parse(data);
      //console.log(userdata)
      setCurrentUser(userdata);      
    }
  }catch(e){
    console.log(e)
  }
  }

  async function setContactsf(){
    try{
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        // console.log(currentUser._id)
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        
        setContacts(data.data);
        // console.log(data.data)
      } else {
        navigate("/setAvatar");
      }
    }
  }catch(e){
    console.log(e)
  }
  }


  useEffect(()=>{
    setCurrentUserf();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(()=>{
    setContactsf();
  }  , [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;