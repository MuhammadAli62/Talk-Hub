import React, { useContext } from "react";
import { Stack, Typography, Box, Avatar, IconButton } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ChatContext } from "../chatContext"
import Messages from "./Messages"
import Inputs from "./Input"
const ChatBox = ({handleBacks}) => {

    const { data } = useContext(ChatContext)

    return (

        <Stack direction="column" justifyContent="space-between">
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: "50px", backgroundColor: "white", padding: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <IconButton aria-label="back" onClick={handleBacks}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                    <Avatar src={data.user?.photoURL} alt={data.user?.displayName} />
                    <Typography variant="subtitle2" textTransform="capitalize" component="h6">{data.user?.displayName}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <VideocamIcon />
                    <PersonAddIcon />
                    <MoreHorizIcon />
                </Box>
            </Stack>
            <Messages />
            <Inputs />
        </Stack>
    )
}

export default ChatBox