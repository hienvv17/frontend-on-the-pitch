import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export function CardNews2(props: any) {
  return (
    <Card
      sx={{
        maxWidth: '300px',
        height: "100%",
        // margin: 4,
        pt: { xs: 2, sm: 4, md: 1 },

        borderRadius: 0,
        position: "relative",
        aspectRatio: "1/1",
        overflow: 'hidden',
        scale: 0.87,
        justifyItems: "center",
        background: "none"
      }}
    >
      <CardMedia
        component="img"
        image={props.image}
        // src="/image/image_12.png"
        // object-fit="fill"
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          // objectFit: "cover",

          // top: 0,
          // left: 0,
          zIndex: 0,
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          backgroundPosition: "center",
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          transition: "0.3s",

        }}
      />

    </Card>
  );
}