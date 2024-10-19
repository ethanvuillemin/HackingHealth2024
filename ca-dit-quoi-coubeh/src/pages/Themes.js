import React from "react";
import { Button, Grid2, Box, Container } from "@mui/material";

export default function themes() {
  return (
    <Container maxWidth="sm">
      {/* Button Grid2 */}
      <Grid2 container spacing={3}>
        {/* Column 1 */}
        <Grid2 item size={6}>
          <Button variant="contained" style={{height : 100, color:"black", backgroundColor : "#9ad9f9", fontFamily:"Light", fontSize:"2rem", textTransform: "capitalize" }} href="/acceuil" fullWidth>
            Acceuil
          </Button>
        </Grid2>
        <Grid2 item size={6}>
          <Button variant="contained" style={{height : 100, color:"black", backgroundColor : "#fa9784", fontFamily:"Light", fontSize:"2rem", textTransform: "capitalize"}} href="/lieu" fullWidth>
            Lieu de vie
          </Button>
        </Grid2>
        <Grid2 item size={6}>
          <Button variant="contained" style={{height : 100, color:"black", backgroundColor : "#ffa4dc", fontFamily:"Light", fontSize:"2rem", textTransform: "capitalize"}} href="/experience" fullWidth>
            Expérience
          </Button>
        </Grid2>
        <Grid2 item size={6}>
          <Button variant="contained" style={{height : 100, color:"black", backgroundColor : "#a5ef86", fontFamily:"Light", fontSize:"2rem", textTransform: "capitalize", textAlign:"justify"}} href="/prise" fullWidth>
            Prise en charge
          </Button>
        </Grid2>
        <Grid2 item size={6}>
          <Button variant="contained" style={{height : 100, color:"black", backgroundColor : "#ffdd8b", fontFamily:"Light", fontSize:"2rem", textTransform: "capitalize"}} href="/collectif" fullWidth>
            Collectif
          </Button>
        </Grid2>
        <Grid2 item size={6}>
          <Button variant="contained" style={{height : 100, color:"black", backgroundColor : "#c1a9f1", fontFamily:"Light", fontSize:"2rem", textTransform: "capitalize"}} href="/sortie" fullWidth>
            Sortie
          </Button>
        </Grid2>
      </Grid2>
      <Box mt={4}>
        <Button variant="contained" style={{height : 100, color:"black", background : "linear-gradient(90deg, #4dc8e8, #ff637f)", fontFamily:"Light", fontSize:"2rem", textTransform: "capitalize"}} href="/avis" fullWidth>
          Avis général
        </Button>
      </Box>
    </Container>
  );
}
