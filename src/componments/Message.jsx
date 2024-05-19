import React, { useContext, useEffect, useRef } from "react";
import { Stack, Box, Avatar, Typography } from "@mui/material";
import { AuthContext } from "../authContext";
import { ChatContext } from "../chatContext";

const Message = ({ message }) => {


    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const date = new Date(message.date.seconds * 1000)

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])
    return (
        <Stack direction="column" ref={ref} alignItems={`${message.senderId === currentUser.uid ? "end" : "start"}`}>
            <Stack direction="column" alignItems="start" spacing={1} sx={{backgroundColor:`${message.senderId === currentUser.uid ? "#D9FDD3" : "#ffffff"}`, borderRadius:"10px", p:1 , boxShadow: 'rgb(60 64 67 / 30%) 0px 1px 0px 0px, rgb(60 64 67 / 15%) 0px 1px 0px 0px' }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap:1, alignItems:"center" }}>
                    <Avatar src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="userIng" />
                    <Typography variant="body1" sx={{wordBreak:"break-all"}} component="p">{message.text}</Typography>
                    {message.img && <Box component="div" width="200px" height="200px"><img src={message.img} alt="mesg_img" height="100%" width="100%"/></Box>}
                </Box>
                <Typography variant="body2" component="p">{date.toLocaleString()}</Typography>
            </Stack>
        </Stack>
    )

}

export default Message