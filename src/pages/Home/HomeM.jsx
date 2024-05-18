import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import Search from "../../componments/Search"
import Navbar from "../../componments/Navbar"
import ChatBox from "../../componments/Chatbox"
import Chats from "../../componments/Chats"
import bg from "../../images/bg.png"
import { ChatContext } from "../../chatContext"
const Home = () => {
    const { data } = useContext(ChatContext)
    const [toggle, setToggle] = useState(false)
    console.log(toggle)


    const handleBack = ()=>{
       setToggle(!toggle)
    }

    useEffect(()=>{
        data.chatId === "null" ? setToggle(false) : setToggle(true) 
    },[data.chatId])

    return (
        <Grid container width="100%" margin="auto" height="100vh">
            
            {toggle ?  
           <Grid item xs={12} sm={8}  sx={{ backgroundColor: "#EFEAE2", backgroundImage: `url(${bg})`, backgroundSize: "cover", }}>
              {data.chatId === "null" ? <Typography variant="h6" component="h6">No User Select</Typography> : <ChatBox handleBacks={handleBack}/>}
            </Grid>: <Grid item xs={12} sm={4} p={1} sx={{ backgroundColor: "#EFEAE2" }}>
                <Stack direction="column" spacing={2}>
                    <Navbar />
                    <Search />
                    <Chats />
                </Stack>
            </Grid>}

        </Grid>)
}

export default Home