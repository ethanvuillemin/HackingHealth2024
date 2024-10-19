import React from "react";
import Button from '@mui/material/Button';
import logo from "../assets/logo.png";
import Stack from '@mui/material/Stack';


export default function Home(){

    return(
        <Stack spacing={3} className="menu-select">
            <img src={logo} alt="Logo" className="app-logo" style={{maxWidth:'100vw'}} />
            <Button variant="contained" href="guide">Guide</Button>
            <Button variant="contained" href="quiz">Quiz</Button>
            <Button variant="contained" href="statistiques">Statistiques</Button>
        </Stack>
    )
};
