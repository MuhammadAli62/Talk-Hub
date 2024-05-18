import React, { useState, useEffect, useContext } from "react";
import { Stack } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore"
import { ChatContext } from "../chatContext"
import { db } from "../firebase";
import Message from "./Message"
const Messages = ()=>{

    const [messages, setMessages] = useState([])

    const {data} = useContext(ChatContext)

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), async(doc) => {
          doc.exists() && setMessages(doc.data().messages);
        });
    
        return () => {
          unSub();
        };
      }, [data.chatId]);
    
      console.log(messages)



    return( 
        <Stack  sx={{
            padding: '10px',
            height: 'calc(100vh - 136px)',
            overflowY:"scroll",
            borderRadius:"10px"
        }} direction="column" spacing={2}>
            {messages.map((m)=> <Message message={m} key={m.id}/> )}
        </Stack>
    )

}

export default Messages
