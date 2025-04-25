'use client';

import { Typography, Box, ThemeProvider, createTheme, Divider, Chip, Stack, Grid2, Paper, useMediaQuery, styled } from "@mui/material";
import Footer from "./components/Footer";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { grey } from "@mui/material/colors";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, { useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { CardNews2 } from "./components/CardNews2";
import * as demoData from "@/utility/demoData";
import SportCard from "./components/SportCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





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
const stadiumList = demoData.stadiumList;

const CustomSlider = styled(Slider)`
  .slick-dots li button:before {
    color: grey;
  }
  .slick-dots li.slick-active button:before {
    color: white;
  }
`;

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

  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState(0); // Xác định Carousel nào được chọn
  const carouselRefs = useRef<(Slider | null)[]>(Array.from({ length: 3 }, () => null)); // Mảng ref chứa 3 Carousel

  // Khi num thay đổi, chỉ reset Carousel tương ứng
  useEffect(() => {
    const ref = carouselRefs.current[selectedCarouselIndex];
    if (ref) ref.slickGoTo(0); // Chỉ reset Carousel tương ứng
  }, [chipSelected.soccer.chipNum, chipSelected.badminton.chipNum, chipSelected.tennis.chipNum, selectedCarouselIndex]);

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

  const isSmallScreen = useMediaQuery("(max-width:725px)");

  const settings = {
    dots: true,
    speed: 800,
    initialSlide: 0,
    infinite: true,
    centerMode: !isSmallScreen,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 9999,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "relative",
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.87)),url('https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151485/gwltrhxdykgamkak2vwx.png')", // Đường dẫn ảnh
          backgroundSize: "cover", // Tỷ lệ ảnh
          backgroundRepeat: "no-repeat", // Không lặp lại ảnh
          backgroundPosition: "center", // Căn giữa ảnh
          height: "fit-content",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 4%)",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 4%)",
        }}
      >

        <ResponsiveAppBar />

        <Grid2 container direction="column"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <Grid2 container direction="column" size={12} sx={{
            flex: 1, justifyContent: "center",
            alignItems: "center", gap: 4
          }} >
            <Grid2 sx={{ p: { xs: 2, sm: 5 } }}>
              <Typography variant="h4" color="var(--Primary-50)" fontWeight="bold"
                sx={{
                  fontSize: 'clamp(1.5rem, 5vw, 3rem)', // nhỏ nhất 1.5rem, lớn dần theo viewport, tối đa 3rem
                }}
              >
                Đặt sân nhanh chóng, thanh toán thuận tiện, sẵn sàng ra sân mọi lúc
              </Typography>

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
              <Typography color="var(--Primary-50)" sx={{ fontStyle: "italic" }} >&quot;Không gì là không thể, chỉ cần bạn bắt đầu!&quot;</Typography>
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
        <Box sx={{ width: "90vw", textAlign: "center", }}>
          <Grid2 container columnSpacing={{ xs: 1, sm: 2, md: 6 }} direction="row" sx={{ alignItems: "center", mx: "5vw", height: { xs: "140px" } }}>
            <Grid2 size={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}>
              <Box sx={{
                backgroundColor: "var(--Primary-50)",
                borderRadius: 8,
                height: "100%",
                display: "flex",
                flexDirection: "column", // Sắp xếp nội dung theo cột
                alignItems: "center", // Căn giữa theo chiều ngang
                justifyContent: "center", // Căn giữa theo chiều dọc
                background: "var(--Primary-500)",
                // py: 3
              }}>
                <Grid2 container direction="column" sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}>
                  <Typography variant="h4" color="var(--Primary-50)" fontWeight="bold"
                    sx={{
                      fontSize: 'clamp(1.5rem, 10vw, 3rem)', // nhỏ nhất 1.5rem, lớn dần theo viewport, tối đa 3rem
                    }}
                  >
                    10
                    <Box
                      component="span"
                      sx={{
                        fontSize: '0.6em',
                        position: 'relative',
                        top: '0.1em',
                        ml: '1px',
                      }}
                    >
                      +
                    </Box>
                  </Typography>
                  <Typography color="var(--Primary-50)" fontWeight="bold"
                    sx={{
                      fontSize: 'clamp(0.7rem, 2vw, 2rem)',
                    }}
                  >
                    Sân
                  </Typography>
                </Grid2>
              </Box>
            </Grid2>

            <Grid2 size={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}>
              <Box sx={{
                backgroundColor: "var(--Primary-50)",
                borderRadius: 8,
                height: "100%",
                display: "flex",
                flexDirection: "column", // Sắp xếp nội dung theo cột
                alignItems: "center", // Căn giữa theo chiều ngang
                justifyContent: "center", // Căn giữa theo chiều dọc
                background: "var(--Primary-500)",
                // py: 3
              }}>
                <Grid2 container direction="column" sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}>
                  <Typography variant="h4" color="var(--Primary-50)" fontWeight="bold"
                    sx={{
                      fontSize: 'clamp(1.5rem, 10vw, 3rem)', // nhỏ nhất 1.5rem, lớn dần theo viewport, tối đa 3rem
                    }}
                  >
                    2
                    <Box
                      component="span"
                      sx={{
                        fontSize: '0.6em',
                        position: 'relative',
                        top: '0.1em',
                        ml: '1px',
                      }}
                    >
                      +
                    </Box>
                  </Typography>
                  <Typography color="var(--Primary-50)" fontWeight="bold"
                    sx={{
                      fontSize: 'clamp(0.7rem, 2vw, 2rem)',
                    }}
                  >
                    Cụm sân
                  </Typography>
                </Grid2>
              </Box>
            </Grid2>

            <Grid2 size={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}>
              <Box sx={{
                backgroundColor: "var(--Primary-50)",
                borderRadius: 8,
                height: "100%",
                display: "flex",
                flexDirection: "column", // Sắp xếp nội dung theo cột
                alignItems: "center", // Căn giữa theo chiều ngang
                justifyContent: "center", // Căn giữa theo chiều dọc
                background: "var(--Primary-500)",
                // py: 3
              }}>
                <Grid2 container direction="column" sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}>
                  <Typography variant="h4" color="var(--Primary-50)" fontWeight="bold"
                    sx={{
                      fontSize: 'clamp(1.5rem, 10vw, 3rem)', // nhỏ nhất 1.5rem, lớn dần theo viewport, tối đa 3rem
                    }}
                  >
                    3
                    <Box
                      component="span"
                      sx={{
                        fontSize: '0.6em',
                        position: 'relative',
                        top: '0.1em',
                        ml: '1px',
                      }}
                    >
                      +
                    </Box>
                  </Typography>
                  <Typography color="var(--Primary-50)" fontWeight="bold"
                    sx={{
                      fontSize: 'clamp(0.7rem, 2vw, 2rem)',
                    }}
                  >
                    Môn thể thao
                  </Typography>
                </Grid2>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Box>



      <Box
        sx={{
          position: "relative",
          backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png')", // Đường dẫn ảnh
          backgroundSize: "cover", // Tỷ lệ ảnh
          backgroundRepeat: "no-repeat", // Không lặp lại ảnh
          backgroundPosition: "center", // Căn giữa ảnh
          height: "fit-content",
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
              <Stack direction="row" spacing={4} sx={{ width: "fit-content" }}>
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
              width: "80vw",
              height: "fit-content",
              borderRadius: "8px",
              pb: 5,
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
              <Grid2 container spacing={2} direction="column" sx={{ height: "fit-content", width: "80vw", justifyContent: "center", alignItems: "center", }}>
                <Grid2 size={12} sx={{ height: "fit-content", width: "75vw", justifyContent: "center", alignItems: "center", }}>
                  <Grid2 container sx={{ width: "100%", justifyContent: "center", height: "fit-content" }}>
                    <Grid2 sx={{ width: "100%", height: "300px", }}>
                      <CustomSlider {...settings} ref={(el) => void (carouselRefs.current[index] = el)} sx={{ height: "inherit" }}>
                        {
                          fields.fields.map((e, index) =>
                            chipSelected[sportType as keyof typeof chipSelected].chipNum === 1 ?
                              <Grid2 container direction="row" key={index}
                                sx={{
                                  height: "fit-content",
                                  maxWidth: "100%",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Grid2 sx={{ height: "100%" }}>
                                  <CardNews2 key={index} image={e.image} />
                                </Grid2>
                              </Grid2>
                              : <Stack justifyItems={"center"} key={index}>
                                <SportCard data={e} />
                              </Stack>
                          )
                        }
                      </CustomSlider>
                    </Grid2>
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
