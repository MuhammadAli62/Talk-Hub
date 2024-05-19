import React, { useContext, useState } from "react";
import { InputBase, styled, Stack, Box, Button } from "@mui/material";
import { updateDoc, doc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import { AuthContext } from "../authContext";
import { ChatContext } from "../chatContext";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SearchComp = styled('div')({
  position: "relative",
  borderRadius: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  width: "100%",
  display: 'flex',
  justifyContent: "space-between",
  height: '50px',
});

const Inputbase = styled(InputBase)({
  '& .MuiInputBase-input': {
    paddingLeft: 32,
  },
});

const Inputs = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);




  const handleClick = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.log(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
            handlePostMessageUpdate(text);
          } catch (error) {
            console.log(error);
          }
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      handlePostMessageUpdate(text);
    }

    setText("");
    setImg(null);
  };

  const handlePostMessageUpdate = async (text) => {
    try {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [`${data.chatId}.lastMessage`]: {
          text,
        },
        [`${data.chatId}.date`]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [`${data.chatId}.lastMessage`]: {
          text,
        },
        [`${data.chatId}.date`]: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleClick();
    }
  };

  return (
    <Stack direction="column" alignItems="center" justifyContent="space-between">
      <SearchComp>
        <Inputbase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={text}
          onKeyDown={handleKey}
          onChange={(e) => setText(e.target.value)}
        />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
          <AttachFileIcon />
          <input
            type='file'
            name='myfile'
            id='myfile'
            style={{ display: "none" }}
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor='myfile'>
            <ImageIcon />
          </label>
          <Button variant="outlined" onClick={handleClick}>Send</Button>
        </Box>
      </SearchComp>
    </Stack>
  );
};

export default Inputs;
