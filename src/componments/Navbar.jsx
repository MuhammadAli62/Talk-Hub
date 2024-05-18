import React, { useContext } from "react"
import { Stack, Avatar, Typography, Button, Box } from "@mui/material"
import { AuthContext } from "../authContext"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"

const Navbar = () => {

    const {currentUser} = useContext(AuthContext)
    console.log(currentUser)
    return (
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Box component="div" sx={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <Avatar src={currentUser.photoURL} alt={currentUser.displayName} />
            <Typography variant="body2" component="h6" textTransform="capitalize">{currentUser.displayName}</Typography>
            </Box>
            <Button onClick={() => signOut(auth)} variant="outlined">Log out</Button>
        </Stack>
    )
}

export default Navbar