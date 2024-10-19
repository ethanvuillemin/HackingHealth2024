// Home.js
import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import logo from "../assets/logo.png";

export default function Home() {
  return (
    <Stack spacing={3} className="menu-select">
      <img src={logo} alt="Logo" className="app-logo" style={{ maxWidth: "100vw" }} />

      <Button variant="contained" style={{height : 100, color:"black", background : "linear-gradient(90deg, #9ad9f9, #fa9784)", fontFamily:"Light", fontSize:"2rem", textTransform: "capitalize"}} href="/guide" fullWidth>
        Guide
      </Button>

      <Button variant="contained" style={{height : 100, color:"black", background : "linear-gradient(90deg, #ffa4dc, #a5ef86)", fontFamily:"Light", fontSize:"2rem", textTransform: "capitalize"}} href="/themes" fullWidth>
        Thèmes
      </Button>

      <Button variant="contained" style={{height : 100, color:"black", background : "linear-gradient(90deg, #ffdd8b, #c1a9f1)", fontFamily:"Light", fontSize:"2rem", textTransform: "capitalize"}} href="/stats" fullWidth>
        Statistiques
      </Button>
    </Stack>
  );
}
