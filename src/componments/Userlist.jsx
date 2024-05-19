import React, { useContext, useEffect, useState } from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import { collection, getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../authContext";

const Userlist = () => {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersList = querySnapshot.docs.map(doc => ({
                    ...doc.data()
                  }));
                  setUser(usersList);

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        currentUser?.uid && fetchUsers();
    }, [currentUser?.uid]);

    const handleSelect = async (uid,photourl,displayname ) => {
       
        const combineId =
            currentUser.uid > uid ?
                currentUser.uid + uid :
                uid + currentUser.uid

        try {
            const res = await getDoc(doc(db, "chats", combineId))
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combineId), { messages: [] })

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combineId + '.userInfo']: {
                        uid: uid,
                        displayName: displayname,
                        photoURL: photourl
                    },
                    [combineId + '.date']: serverTimestamp()
                })

                await updateDoc(doc(db, "userChats", uid), {
                    [combineId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combineId + '.date']: serverTimestamp()
                })
            }
        } catch (error) {

        }
    }
    return (
        <Stack direction="column" spacing={2} height="100%" overflowY="scroll">
            <Typography variant="subtitle2" component="h6">
            Members of the chat app can be added to your friend list by clicking on their names</Typography>
            {user && user?.map((user) =>
                <Stack key={user.uid} direction="row" spacing={2} alignItems="center"   sx={{cursor:"pointer"}} onClick={()=> handleSelect(user.uid,user.photoURL, user.displayName)}>
                    <Avatar src={user.photoURL} alt={user.displayName} />
                    <Typography variant="body2" component="h6">{user.displayName}</Typography>
                </Stack>)
            }
        </Stack>
    );
};

export default Userlist;
