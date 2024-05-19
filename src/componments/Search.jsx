import React, { useContext, useState } from "react"
import { InputBase, styled, Stack, Avatar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { collection, query, where, getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"
import {AuthContext} from "../authContext"

const SearchComp = styled('div')({
    position: "relative",
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    width: "100%",
    display: 'flex',
    height: '50px',
})
const SearchIconWrapper = styled('div')({
    padding: (0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const Inputbase = styled(InputBase)({
    '& .MuiInputBase-input': {
        paddingLeft: 32
    }

})

const Search = ({handleBacks}) => {

    const [userName, setUserName] = useState("")
    const [user, setUser] = useState(null)
    const [error, setError] = useState()

    const {currentUser} = useContext(AuthContext)

    const handleSearch = async () => {
        try {
            const q = query(collection(db, "users"), where("displayName", "==", userName));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (error) {
            setError(error)
        }
    }

    const handleKey = (e) => {
        console.log(user)
        e.code === "Enter" && handleSearch()
    }


    const handleSelect = async()=>{
        
        const combineId = 
        currentUser.uid > user.uid ? 
        currentUser.uid + user.uid : 
        user.uid + currentUser.uid

        try{
            const res = await getDoc(doc(db, "chats", combineId))
            if(!res.exists()){
                await setDoc(doc(db,"chats", combineId),{messages : []})

                await updateDoc(doc(db, "userChats", currentUser.uid),{
                    [combineId+ '.userInfo']:{
                        uid : user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combineId + '.date']: serverTimestamp()
                })

                await updateDoc(doc(db, "userChats", user.uid),{
                    [combineId+ '.userInfo']:{
                        uid : currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combineId + '.date']: serverTimestamp()
                })
            }
        }catch(error){
            console.log(error)
        }
        setUserName("")
        setUser(null)
    }

    console.log(error)
    return (
        <Stack direction="column">
            <SearchComp>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <Inputbase placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }} value={userName} onKeyDown={handleKey} onChange={(e) => setUserName(e.target.value)} />
            </SearchComp>
            {user && <Stack  direction="row" spacing={2} alignItems="center" onClick={handleSelect}>
                <Avatar src={user.photoURL} alt={user.displayName} />
                <Typography variant="body2" component="h6">{user.displayName}</Typography>
            </Stack>
            }
        </Stack>
    )
}

export default Search