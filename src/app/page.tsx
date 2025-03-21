'use client';

import { Typography, Box, ThemeProvider, createTheme, Divider, Chip, Stack, Grid2, Paper } from "@mui/material";
import Footer from "./components/Footer";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { grey } from "@mui/material/colors";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import WhatshotIcon from '@mui/icons-material/Whatshot';
// import CommentIcon from '@mui/icons-material/Comment';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, { useEffect, useRef, useState } from "react";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from "./components/Carousel.module.css";

import { CardNews2 } from "./components/CardNews2";
import CardV1 from "./components/CardV1";



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

//demo data
const stadiumList = {
  soccer: {
    title: "Sân bóng đá",
    intro: "Nơi diễn ra các trận đấu bóng đá, từ những trận giao hữu cho đến các giải đấu chuyên nghiệp. Một trận bóng hấp dẫn không thể thiếu sân bóng đá đạt chuẩn, tạo điều kiện tốt nhất để cầu thủ thể hiện kỹ năng, chiến thuật và tinh thần đồng đội.",
    fields: [
      { name: "Sân ABC", image: "/image/image_12.png", location: "Quận 10", price: "250.000 VND/h", rating: 4.5 },
      { name: "Sân XYZ", image: "/image/image_01.png", location: "Quận 7", price: "220.000 VND/h", rating: 4.0 },
      { name: "Sân XYZ", image: "/image/green-soccer-field.png", location: "Quận 9", price: "220.000 VND/h", rating: 4.6 },
      { name: "Sân XYZ", image: "/image/image_11.png", location: "Quận 2", price: "220.000 VND/h", rating: 5.0 },
    ],
  },
  badminton: {
    title: "Sân cầu lông",
    intro: "Mặt sân chất lượng giúp người chơi di chuyển linh hoạt, giảm chấn thương và tối ưu hóa khả năng thi đấu. Cầu lông là môn thể thao phổ biến, hấp dẫn với nhịp độ nhanh, giúp rèn luyện sức khỏe, sự nhanh nhẹn và phản xạ, phù hợp với mọi lứa tuổi.",
    fields: [
      { name: "Sân ABC", image: "/image/badminton_01.png", location: "Quận 10", price: "250.000 VND/h", rating: 4.5 },
      { name: "Sân XYZ", image: "/image/badminton_02.png", location: "Quận 7", price: "220.000 VND/h", rating: 4.0 },
      { name: "Sân XYZ", image: "/image/badminton_03.png", location: "Quận 9", price: "220.000 VND/h", rating: 4.6 },
      { name: "Sân XYZ", image: "/image/badminton_04.png", location: "Quận 2", price: "220.000 VND/h", rating: 5.0 },
    ],
  },
  tennis: {
    title: " Sân tennis",
    intro: "Nơi lý tưởng để rèn luyện sức khỏe, cải thiện thể lực và nâng cao kỹ thuật cho người chơi ở mọi trình độ. Với kích thước tiêu chuẩn, sân được thiết kế để tối ưu hóa trải nghiệm thi đấu, đi kèm hệ thống lưới, vạch kẻ rõ ràng.",
    fields: [
      { name: "Sân ABC", image: "/image/tennis_01.png", location: "Quận 10", price: "250.000 VND/h", rating: 4.5 },
      { name: "Sân XYZ", image: "/image/tennis_02.png", location: "Quận 7", price: "220.000 VND/h", rating: 4.0 },
      { name: "Sân XYZ", image: "/image/tennis_03.png", location: "Quận 9", price: "220.000 VND/h", rating: 4.6 },
      { name: "Sân XYZ", image: "/image/tennis_04.png", location: "Quận 2", price: "220.000 VND/h", rating: 5.0 },
    ],
  },
};


export default function HomePage() {
  const [chipSelected, setChipSelected] = React.useState({
    soccer: {
      chip1: true,
      chip2: false,
      chip3: false,
      chipNum: 1,
    },
    badminton: {
      chip1: true,
      chip2: false,
      chip3: false,
      chipNum: 1,
    },
    tennis: {
      chip1: true,
      chip2: false,
      chip3: false,
      chipNum: 1,
    }
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
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


  // useEffect(() => {
  //   console.log("chipSelected", chipSelected);
  // }
  //   , [chipSelected]);

  const [chipNum, setChipNum] = useState(1); // Trạng thái num
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState(0); // Xác định Carousel nào được chọn
  const carouselRefs = useRef<(Carousel | null)[]>(Array.from({ length: 3 }, () => null)); // Mảng ref chứa 3 Carousel

  // Khi num thay đổi, chỉ reset Carousel tương ứng
  useEffect(() => {
    const ref = carouselRefs.current[selectedCarouselIndex];
    // console.log("Current ref:", ref); // Kiểm tra ref
    if (ref) ref.goToSlide(2); // Chỉ reset Carousel tương ứng
  }, [chipSelected.soccer.chipNum, chipSelected.badminton.chipNum, chipSelected.tennis.chipNum, selectedCarouselIndex]);

  // const handleChipNum = (chipNum: number, carouselIndex: number) => {
  //   setChipNum(chipNum);
  //   setSelectedCarouselIndex(carouselIndex);
  // };

  const handleChipClick = (sport: string, chipKey: string, chipNum: number, index: number) => {
    setSelectedCarouselIndex(index);
    setChipSelected((prevState) => ({
      ...prevState,
      [sport]: {
        chip1: chipKey === "chip1",
        chip2: chipKey === "chip2",
        chip3: chipKey === "chip3",
        chipNum: chipNum,
      },
    }));
  };

  const scrollDown = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (scrollDown.current) {
      scrollDown.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 4%)",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 4%)",
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
            // mt: "-10vh",

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
              height: "30%", justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Grid2>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 50,
                  height: 50,
                  background: "transparent",
                  backdropFilter: "blur(10px)",
                  borderRadius: "50%",
                  border: "1px solid grey",
                  cursor: "pointer",
                  transition: "background 0.4s linear, border 0.3s ease-in-out, transform 0.3s ease-in-out",
                  color: "grey",


                  "&:hover": {
                    border: "4px solid var(--Primary-500)", // Tăng độ dày viền khi hover
                    color: "var(--Primary-500)", // Đổi màu icon
                    background: "var(--Primary-50)", // Đổi màu nền
                    transform: "scale(1.2)", // Giữ nguyên padding, phóng to toàn bộ thay vì co giãn
                    boxShadow: "0 0 15px 5px var(--Primary-500)", // Thêm hiệu ứng phát quang
                  },
                }}
                onClick={handleScroll}
              >
                <ArrowDownwardIcon
                  sx={{
                    fontSize: 30,
                    color: "inherit",
                    transition: "color 0.4s ease-in-out, transform 0.3s ease-in-out"
                  }}
                />
              </Box>
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
        <Box ref={scrollDown}>
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



      <Box
        sx={{
          position: "relative",
          backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('/image/green-soccer-field.png')", // Đường dẫn ảnh
          backgroundSize: "cover", // Tỷ lệ ảnh
          backgroundRepeat: "no-repeat", // Không lặp lại ảnh
          backgroundPosition: "center", // Căn giữa ảnh
          // width: "100vw",
          height: "fit-content",
          // borderRadius: 8,
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 2%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 2%)",
          pb: 15,
        }}
      >
        {Object.entries(stadiumList).map(([sportType, fields], index) => (
          <Box key={index}
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
            <Box sx={{ mt: 10 }}>
              <Typography variant="h4" color="var(--Primary-50)" fontWeight="bold">{fields.title}</Typography>
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
              <Typography color="var(--Primary-50)" sx={{ fontStyle: "italic" }} >{fields.intro}</Typography>
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
                  color={chipSelected[sportType as keyof typeof chipSelected].chipNum === 1 ? "primary" : "default"}
                  variant={chipSelected[sportType as keyof typeof chipSelected].chipNum === 1 ? "filled" : "outlined"}
                  icon={
                    <PhotoLibraryIcon
                      sx={{ color: chipSelected[sportType as keyof typeof chipSelected].chipNum === 1 ? "white" : grey[400] }}
                    />
                  }
                  sx={{
                    width: "100%",
                    "& .MuiChip-label": {
                      color: chipSelected[sportType as keyof typeof chipSelected].chipNum === 1 ? "white" : grey[400],
                    },
                  }}
                  onClick={() => handleChipClick(sportType, "chip1", 1, index)}
                />

                {/* Chip 2 */}
                <Chip
                  label="Sân hot"
                  color={chipSelected[sportType as keyof typeof chipSelected].chipNum === 2 ? "primary" : "default"}
                  variant={chipSelected[sportType as keyof typeof chipSelected].chipNum === 2 ? "filled" : "outlined"}
                  icon={<WhatshotIcon sx={{ "&&": { color: "orange" } }} />}
                  sx={{
                    width: "100%",
                    "& .MuiChip-label": {
                      color: chipSelected[sportType as keyof typeof chipSelected].chipNum === 2 ? "white" : grey[400],
                    },
                  }}
                  onClick={() => handleChipClick(sportType, "chip2", 2, index)}
                />

                {/* Chip 3 */}
                {/* <Chip
                  label="Đánh giá của khách hàng"
                  color={chipSelected[sportType as keyof typeof chipSelected].chipNum === 3 ? "primary" : "default"}
                  variant={chipSelected[sportType as keyof typeof chipSelected].chipNum === 3 ? "filled" : "outlined"}
                  icon={
                    <CommentIcon
                      sx={{ color: chipSelected[sportType as keyof typeof chipSelected].chipNum === 3 ? "white" : grey[400] }}
                    />
                  }
                  sx={{
                    width: "100%",
                    "& .MuiChip-label": {
                      color: chipSelected[sportType as keyof typeof chipSelected].chipNum === 3 ? "white" : grey[400],
                    },
                  }}
                  onClick={() => handleChipClick(sportType, "chip3", 3, index)}
                /> */}

              </Stack>
            </Box>


            <Paper sx={{
              // elevation: 24,
              width: "80vw",
              height: "fit-content",
              // border: 2,              // Độ dày viền
              // borderColor: blue[900], // Màu viền
              // borderStyle: "solid",   // Đảm bảo hiển thị viền
              borderRadius: "8px",
              pb: 2,
              backgroundColor: "transparent",
              backdropFilter: "blur(10px)",
              justifyContent: "center", alignItems: "center",
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
              <Grid2 container spacing={2} direction="column" sx={{ height: 200, width: "80vw", justifyContent: "center", alignItems: "center" }}>
                <Grid2 size={12} sx={{ height: "100%", width: "85%", justifyContent: "center", alignItems: "center" }}>
                  <Grid2 sx={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Carousel
                      key={index}
                      ref={(el) => (carouselRefs.current[index] = el)} // Gán ref cho từng Carousel

                      responsive={responsive}
                      slidesToSlide={1}
                      swipeable={true}
                      showDots={true}
                      centerMode={true}
                      ssr={false} // means to render carousel on server-side.
                      containerClass={styles.customCarousel}
                      // itemClass="carousel-item-padding-40-px"
                      dotListClass={styles.customDotList}
                      renderDotsOutside={true}
                      focusOnSelect={true}
                      infinite={true}
                    >
                      {
                        fields.fields.map((e) =>
                          chipSelected[sportType as keyof typeof chipSelected].chipNum === 1 ?
                            <CardNews2 image={e.image} />
                            : <CardV1 data={e} title={fields.title} />
                        )
                      }
                    </Carousel>
                  </Grid2>
                </Grid2>
              </Grid2>
            </Paper>
          </Box>
        ))}
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
