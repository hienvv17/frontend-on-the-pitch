'use client';

import { Typography, Box, ThemeProvider, createTheme, Divider, Chip, Stack, Grid2, Paper } from "@mui/material";
import UserLayout from "./components/UserLayout";
import Footer from "./components/Footer";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { blue, grey, red } from "@mui/material/colors";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CommentIcon from '@mui/icons-material/Comment';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, { use, useEffect } from "react";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from "./components/Carousel.module.css";


import { CardNews2 } from "./components/CardNews2";

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
  }

  interface PaletteOptions {
    white?: PaletteOptions['primary'];
  }
}

// Update the Chip's color options to include an ochre option
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    white: true;
  }
}

const stadiums = [
  { name: "Sân ABC", image: "/image/image_12.png", location: "Quận 10", price: "250.000 VND/h", rating: 4.5 },
  { name: "Sân XYZ", image: "/image/image_12.png", location: "Quận 9", price: "220.000 VND/h", rating: 4.0 },
];

const style = {
  button: {
    // width: 127,
    // height: '100%',
    textTransform: 'none',
    fontSize: 14,
    fontWeight: 700,
    radius: '4px',
    padding: '6px 10px 6px 10px',
    gap: '6px',
    lineHeight: '24px',
    align: 'center',
    // backgroundColor: '#2962FF',
  },
  listItemText: { color: "white", },

} as const;

const theme = createTheme({
  palette: {
    white: {
      main: '#fff',
      light: '#fff',
      dark: '#272727',
      contrastText: '#041426',
    },
  },
});

type SportType = "soccer" | "badminton" | "tennis";
type ChipType = "chip1" | "chip2" | "chip3";



export default function HomePage() {
  const [chipSelected, setChipSelected] = React.useState({
    soccer: {
      chip1: true,
      chip2: false,
      chip3: false,
    },
    badminton: {
      chip1: true,
      chip2: false,
      chip3: false,
    },
    tennis: {
      chip1: true,
      chip2: false,
      chip3: false,
    }
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 650, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const handleChipClick = (sport: SportType, chipKey: ChipType) => {
    setChipSelected((prevState) => ({
      ...prevState,
      [sport]: {
        chip1: chipKey === "chip1",
        chip2: chipKey === "chip2",
        chip3: chipKey === "chip3",
      },
    }));
  };

  useEffect(() => {
    console.log("chipSelected", chipSelected);
  }
    , [chipSelected]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "relative",
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.87)),url('/image/image_01.png')", // Đường dẫn ảnh
          backgroundSize: "cover", // Tỷ lệ ảnh
          backgroundRepeat: "no-repeat", // Không lặp lại ảnh
          backgroundPosition: "center", // Căn giữa ảnh
          // width: "100vw",
          height: "fit-content",
        }}
      >

        <ResponsiveAppBar />

        <Grid2 container direction="column"
          sx={{
            // display: "flex",
            // flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            // gap: 4,
            // mt: "-10vh"
          }}
        >
          <Grid2 container direction="column" size={12} sx={{
            flex: 1, justifyContent: "center",
            alignItems: "center", gap: 4
          }} >
            <Grid2>

              <Typography variant="h4" color="var(--Primary-50)" fontWeight="bold">Đặt sân nhanh chóng, thanh toán thuận tiện</Typography>
              <Typography variant="h4" color="var(--Primary-50)" fontWeight="bold">Sẵn sàng ra sân mọi lúc</Typography>
            </Grid2>
            <Grid2 size={12}>
              <Divider orientation="horizontal" flexItem className="hover-divider"
                sx={{
                  bgcolor: grey[500],
                  borderBottomWidth: '3px',
                  width: '20%',
                  mx: "auto"
                }}
              >
              </Divider>
            </Grid2>
            <Grid2 size={12}>
              <Typography color="var(--Primary-50)" sx={{ fontStyle: "italic" }} >"Không gì là không thể, chỉ cần bạn bắt đầu!"</Typography>
            </Grid2>
          </Grid2>



          <Grid2 container direction="column"
            sx={{
              height: "30%", justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid2>
              <ArrowDownwardIcon sx={{ color: grey[500], fontSize: 40, }} />
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: " fit-content",
          textAlign: "center",
          gap: 4,
          my: 10
        }}
      >
        <Box>
          <Typography variant="h4" color="var(--Primary-500)" fontWeight="bold">Đa dạng sân với</Typography>
          {/* <Typography variant="h4" color="var(--Primary-50)" fontWeight="bold">Sẵn sàng ra sân mọi lúc</Typography> */}
        </Box>
        <Divider orientation="horizontal" flexItem className="hover-divider"
          sx={{
            bgcolor: grey[500],
            borderBottomWidth: '3px',
            width: '20%',
            mx: "auto"
          }}
        >
        </Divider>
        {/* <Typography color="var(--Primary-50)" sx={{ fontStyle: "italic" }} >"Không gì là không thể, chỉ cần bạn bắt đầu!"</Typography> */}
        <Box sx={{ width: "90vw", textAlign: "center", }}>
          <Grid2 container columnSpacing={{ xs: 1, sm: 2, md: 6 }} direction="row" sx={{ alignItems: "center", mx: "5vw" }}>
            <Grid2 size={4} sx={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%"
              // background: "transparent", backdropFilter: "blur(10px)"
            }}>
              <Box sx={{
                backgroundColor: "var(--Primary-50)",
                borderRadius: 8,
                height: "fit-content",
                // width: "100%",
                display: "flex",
                flexDirection: "column", // Sắp xếp nội dung theo cột
                alignItems: "center", // Căn giữa theo chiều ngang
                justifyContent: "center", // Căn giữa theo chiều dọc
                // background: "rgba(255, 255, 255, 0.75)",
                background: "var(--Primary-500)",
                py: 3
              }}>
                <Grid2 container direction="row" sx={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}>
                  <Typography variant="h4" color="var(--Primary-50)" fontWeight="bold">20</Typography>
                  <Typography variant="h6" color="var(--Primary-50)" fontWeight="bold">+</Typography>
                </Grid2>
                <Typography color="var(--Primary-50)" fontWeight="bold">Sân</Typography>
              </Box>
            </Grid2>

            <Grid2 size={4} sx={{
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Box sx={{
                backgroundColor: "var(--Primary-50)",
                borderRadius: 8,
                height: "fit-content",
                // width: "100%",
                display: "flex",
                flexDirection: "column", // Sắp xếp nội dung theo cột
                alignItems: "center", // Căn giữa theo chiều ngang
                justifyContent: "center", // Căn giữa theo chiều dọc
                background: "var(--Primary-500)",
                py: 3
              }}>
                <Grid2 container direction="row" sx={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}>
                  <Typography variant="h4" color="var(--Primary-50)" fontWeight="bold">3</Typography>
                  <Typography variant="h6" color="var(--Primary-50)" fontWeight="bold">+</Typography>
                </Grid2>
                <Typography color="var(--Primary-50)" fontWeight="bold">Cụm sân</Typography>
              </Box>
            </Grid2>

            <Grid2 size={4} sx={{
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Box sx={{
                backgroundColor: "var(--Primary-50)",
                borderRadius: 8,
                height: "fit-content",
                // width: "100%",
                display: "flex",
                flexDirection: "column", // Sắp xếp nội dung theo cột
                alignItems: "center", // Căn giữa theo chiều ngang
                justifyContent: "center", // Căn giữa theo chiều dọc
                background: "var(--Primary-500)",
                py: 3
              }}>
                <Grid2 container direction="row" sx={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}>
                  <Typography variant="h4" color="var(--Primary-50)" fontWeight="bold">3</Typography>
                  <Typography variant="h6" color="var(--Primary-50)" fontWeight="bold">+</Typography>
                </Grid2>
                <Typography color="var(--Primary-50)" fontWeight="bold">Môn thể thao</Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Box>



      {/* SÂN ĐÁ BANH */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.87)),url('/image/green-soccer-field.png')", // Đường dẫn ảnh
          backgroundSize: "cover", // Tỷ lệ ảnh
          backgroundRepeat: "no-repeat", // Không lặp lại ảnh
          backgroundPosition: "center", // Căn giữa ảnh
          // width: "100vw",
          height: "fit-content",
          // borderRadius: 8
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            height: "100%", // Căn giữa theo chiều dọc toàn bộ viewport
            textAlign: "center",
            gap: 4,
          }}
        >
          <Box sx={{ mt: 6 }}>
            <Typography variant="h4" color="var(--Primary-50)" fontWeight="bold">Sân bóng đá</Typography>
          </Box>
          <Divider orientation="horizontal" flexItem className="hover-divider"
            sx={{
              bgcolor: grey[500],
              borderBottomWidth: '3px',
              width: '20%',
              mx: "auto"
            }}
          >
          </Divider>
          <Box sx={{ maxWidth: "60vw", textAlign: "center" }}>
            <Typography color="var(--Primary-50)" sx={{ fontStyle: "italic" }} >Nơi diễn ra các trận đấu bóng đá, từ những trận giao hữu cho đến các giải đấu chuyên nghiệp.
              Một trận bóng hấp dẫn không thể thiếu sân bóng đá đạt chuẩn, tạo điều kiện tốt nhất để cầu thủ thể hiện kỹ năng, chiến thuật và tinh thần đồng đội.
            </Typography>
          </Box>
          <Divider orientation="horizontal" flexItem className="hover-divider"
            sx={{
              bgcolor: grey[500],
              borderBottomWidth: '3px',
              width: '20%',
              mx: "auto"
            }}
          >
          </Divider>
          <Box sx={{ maxWidth: "fit-content", textAlign: "center" }}>
            <Stack direction="row" spacing={4} sx={{ width: "60vw" }}>
              {/* Chip 1 */}
              <Chip
                label="Hình ảnh thực tế"
                color={chipSelected.soccer.chip1 ? "primary" : "default"}
                variant={chipSelected.soccer.chip1 ? "filled" : "outlined"}
                icon={
                  <PhotoLibraryIcon
                    sx={{ color: chipSelected.soccer.chip1 ? "white" : grey[400] }}
                  />
                }
                sx={{
                  width: "100%",
                  "& .MuiChip-label": {
                    color: chipSelected.soccer.chip1 ? "white" : grey[400],
                  },
                }}
                onClick={() => handleChipClick("soccer", "chip1")}
              />

              {/* Chip 2 */}
              <Chip
                label="Sân hàng đầu"
                color={chipSelected.soccer.chip2 ? "primary" : "default"}
                variant={chipSelected.soccer.chip2 ? "filled" : "outlined"}
                icon={
                  <WhatshotIcon
                    sx={{ color: chipSelected.soccer.chip2 ? "white" : grey[400] }}
                  />
                }
                sx={{
                  width: "100%",
                  "& .MuiChip-label": {
                    color: chipSelected.soccer.chip2 ? "white" : grey[400],
                  },
                }}
                onClick={() => handleChipClick("soccer", "chip2")}
              />

              {/* Chip 3 */}
              <Chip
                label="Đánh giá của khách hàng"
                color={chipSelected.soccer.chip3 ? "primary" : "default"}
                variant={chipSelected.soccer.chip3 ? "filled" : "outlined"}
                icon={
                  <CommentIcon
                    sx={{ color: chipSelected.soccer.chip3 ? "white" : grey[400] }}
                  />
                }
                sx={{
                  width: "100%",
                  "& .MuiChip-label": {
                    color: chipSelected.soccer.chip3 ? "white" : grey[400],
                  },
                }}
                onClick={() => handleChipClick("soccer", "chip3")}
              />
            </Stack>
          </Box>

          <Paper sx={{
            // elevation: 24,
            width: "80vw",
            height: "200px",
            // border: 2,              // Độ dày viền
            // borderColor: blue[900], // Màu viền
            // borderStyle: "solid",   // Đảm bảo hiển thị viền
            borderRadius: "8px",
            mb: 4,
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",

            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              padding: "1px",
              background: "linear-gradient(to right, transparent, var(--Primary-500), transparent)", // Gradient viền
              WebkitMask: "linear-gradient(white, white) content-box, linear-gradient(white, white)", // Giữ nội dung không bị ảnh hưởng
              WebkitMaskComposite: "destination-out",
              maskComposite: "exclude",
            },
          }}>
            <Grid2 container direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center", height: "inherit" }} >
              <Grid2 size={12} sx={{ height: "100%", width: "80%" }}>
                <Carousel
                  responsive={responsive}

                  slidesToSlide={1}
                  swipeable={true}
                  showDots={true}
                  centerMode={true}
                  ssr={true} // means to render carousel on server-side.
                  containerClass={styles.customCarousel}
                  // itemClass="height-100-px"
                  dotListClass={styles.customDotList}
                  renderDotsOutside={false}
                  focusOnSelect={true}
                  infinite={true}
                >
                  <CardNews2 image="/image/green-soccer-field.png" />
                  <CardNews2 image="/image/image_01.png" />
                  <CardNews2 image="/image/image_11.png" />
                  <CardNews2 image="/image/image_12.png" />
                </Carousel>
              </Grid2>
            </Grid2>
          </Paper>
        </Box>


      </Box>


      <Footer />
    </ThemeProvider>
  );
}
