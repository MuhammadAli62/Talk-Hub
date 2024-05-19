import React, { useContext, useState, useEffect } from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import { AuthContext } from "../authContext";
import { ChatContext } from "../chatContext";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      if (currentUser?.uid) {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data() || {});
        });

        return () => {
          unsub();
        };
      }
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      <Typography variant="subtitle1" component="h6">Your Friends</Typography>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
        return (
          <Stack
            direction="column"
            spacing={1}
            alignItems="start"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar src={chat[1].userInfo.photoURL} alt={chat[1].userInfo.displayName} />
              <Typography variant="body2" textTransform="capitalize" component="h6">
                {chat[1].userInfo.displayName}
              </Typography>
            </Stack>
            <Typography variant="body2" component="h6" sx={{wordBreak:"break-all"}} >
              {chat[1].lastMessage?.text}
            </Typography>
          </Stack>
        );
      })}
    </>
  );
};

export default Chats;
