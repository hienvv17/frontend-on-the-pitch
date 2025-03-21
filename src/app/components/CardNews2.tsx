import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export function CardNews2(props) {
  return (
    <Card
      sx={{
        maxWidth: '50vh',
        maxHeight: 300,
        margin: 2,
        borderRadius: 0,
        position: "relative",
      }}
    >
      <CardMedia
        image={props.image}
        // src="/image/image_12.png"
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          backgroundPosition: "center",
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          transition: "0.3s",
        }}
      />
      <CardActionArea>
        <CardContent sx={{ p: "auto" }}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            minHeight={70}
            color={"common.white"}
            textAlign={"center"}
            sx={{
              height: "auto",
              "& h2": {
                color: "#fff",
                letterSpacing: "2px",
                fontSize: "2.15rem",
                fontWeight: 700,
                lineHeight: 1.45,
                fontFamily: "'Playfair Display',serif",
                // mb: "1.275rem",
              },
            }}
          >
            {/* <h2>Space</h2>
            <p>The space between the stars and galaxies is largely empty.</p> */}
          </Box>
          <Typography
            variant={"overline"}
            sx={{
              display: "block",
              textAlign: "center",
              color: "#fff",
              letterSpacing: "3px",
              fontWeight: 200,
              fontSize: 12,
            }}
          >
            {props?.title ? props.title : '\u00A0'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}