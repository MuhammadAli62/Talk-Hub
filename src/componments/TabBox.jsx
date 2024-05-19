import React, { useState } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Userlist from "./Userlist";
import Chats from "./Chats";

const TabBox = ({handleBacks}) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleToggle = () => {
        setSelectedTab(!selectedTab);
    };

    return (
        <Stack direction="column" component="main">
            <Box component="div" >
                <IconButton onClick={handleToggle}>
                    <PeopleIcon />
                </IconButton>
                <IconButton onClick={handleToggle}>
                    <GroupAddIcon />
                </IconButton>
            </Box>
            {selectedTab ? <Userlist /> : <Chats handleBacks={handleBacks}/>}
        </Stack>
    );
};

export default TabBox;
