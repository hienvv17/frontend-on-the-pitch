'use client';
import {
  SportsSoccer,
  SportsTennis,
  SportsCricket,
  CalendarMonth,
  Search,
  Place,
  CreditCard,
  Notifications,
  Share,
  WhatsApp,
  AccessTime,
  Star,
  ArrowForward,
  KeyboardArrowDown,
  CheckCircle,
} from "@mui/icons-material"
import {  Typography,
  Box,
  ThemeProvider,
  createTheme,
  Container,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Chip,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  useMediaQuery,
  styled,
  IconButton,
  Avatar,
  Badge,
  Divider,
  Grid2,Stack, } from "@mui/material";
  import { motion } from "framer-motion"
import Footer from "./components/Footer";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { grey } from "@mui/material/colors";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
// import WhatshotIcon from '@mui/icons-material/Whatshot';
import React, { useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { CardNews2 } from "./components/CardNews2";
import * as demoData from "@/utility/demoData";
import SportCard from "./components/SportCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTopBtn from "./components/ScrollToTopBtn";

const HeroVideo = styled("video")({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -1,
})

const HeroOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: -1,
})



const PromoBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: "0.75rem",
    fontWeight: "bold",
    padding: "0 8px",
    borderRadius: "12px",
  },
}))



// // Augment the palette to include an ochre color
// declare module '@mui/material/styles' {
//   interface Palette {
//     white: Palette['primary'];
//   }

//   interface PaletteOptions {
//     white?: PaletteOptions['primary'];
//   }
// }

// // Update the Chip's color options to include an ochre option
// declare module '@mui/material/Chip' {
//   interface ChipPropsColorOverrides {
//     white: true;
//   }
// }

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
  const [sportTab, setSportTab] = useState(0)
  const [branch, setBranch] = useState("")
  const [sport, setSport] = useState("")
  // const [date, setDate] = useState(dayjs())
  const [courtType, setCourtType] = useState("")
  const bookingFormRef = useRef(null)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))

  const handleSportTabChange = (event, newValue) => {
    setSportTab(newValue)
  }

  const scrollToBooking = () => {
    bookingFormRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const featuredSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isSmallScreen ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const promotionSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isSmallScreen ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  }

  const reviewSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isSmallScreen ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  }

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

  const featuredCourts = [
    {
      id: 1,
      name: "Premier Soccer Field",
      image: "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
          backgroundSize: "cover", // Tỷ lệ ảnh",
      nextAvailable: "2:00 PM Today",
      type: "Soccer",
      size: "11-a-side",
    },
    {
      id: 2,
      name: "Center Court Tennis",
            image: "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",

      nextAvailable: "3:30 PM Today",
      type: "Tennis",
      size: "Singles/Doubles",
    },
    {
      id: 3,
      name: "Golden Badminton Arena",
            image: "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",

      nextAvailable: "5:00 PM Today",
      type: "Badminton",
      size: "Doubles",
    },
    {
      id: 4,
      name: "Urban Soccer Field",
            image: "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",

      nextAvailable: "6:30 PM Today",
      type: "Soccer",
      size: "7-a-side",
    },
    {
      id: 5,
      name: "Elite Tennis Club",
            image: "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",

      nextAvailable: "10:00 AM Tomorrow",
      type: "Tennis",
      size: "Singles/Doubles",
    },
  ]
  
  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      



<Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <HeroVideo autoPlay muted loop>
          <source src="https://ik.imagekit.io/onthepitch/demo-video.mp4?tr=orig&updatedAt=1746544473360" type="video/mp4" />
          Your browser does not support the video tag.
        </HeroVideo>
        <HeroOverlay />

        <Container maxWidth="lg" sx={{ height: "100%", position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "white",
              textAlign: { xs: "center", md: "left" },
              pt: { xs: 8, md: 0 },

            }}
          >
            <motion.div initial={{ opacity: 0.1, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
                  fontWeight: 800,
                  mb: 2,
                  // textShadow: "2px 2px 4px rgba(255, 255, 255, 0.5)",
                  color: "#E9E9E9",

                }}
              >
                   Đặt sân nhanh chóng, thanh toán thuận tiện, sẵn sàng ra sân mọi lúc.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              
                <Grid2 size={30}>
              <Typography color="var(--Primary-50)" sx={{ fontStyle: "italic", mb: 4,
                  maxWidth: { md: "70%" },
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)", }} >&quot;Không gì là không thể, chỉ cần bạn bắt đầu!&quot;</Typography>
            </Grid2>
            </motion.div>

            <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  // startIcon={<Search />}
                  sx={{
                    fontSize: { xs: "0.7rem", md: "0.8rem" },
                    py: { xs: 1.5, md: 2 },
                  }}
                >
                  🔍 Tìm sân gần bạn
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  // startIcon={<CalendarMonth />}
                  onClick={scrollToBooking}
                  sx={{
                    fontSize: { xs: "0.7rem", md: "0.8rem" },
                    py: { xs: 1.5, md: 2 },
                  }}
                >
                  📅 Đặt ngay
                </Button>
              </motion.div>
            </Box>

            <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "10%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" sx={{ mb: 0.6, color: "#fff" }}>
                  Trượt xuống
                </Typography>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  <KeyboardArrowDown sx={{ fontSize: 40, color: "#fff" }} />
                </motion.div>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>
      
      <Box ref={scrollDown}></Box>
      <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 1,
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                color: theme.palette.primary.dark,
              }}
            >
              Featured Courts
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" sx={{ mb: 6 }}>
              Discover our most popular sports venues
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CustomSlider {...featuredSliderSettings}>
              {featuredCourts.map((court) => (
                <Box key={court.id} sx={{ px: 1 }}>
                  <Card
                    sx={{
                      height: 380,
                      position: "relative",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 20px 30px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardMedia component="img" height="220" image={court.image} alt={court.name} />
                    <CardContent sx={{ position: "relative" }}>
                      <Chip
                        label={court.type}
                        color="primary"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: -16,
                          right: 16,
                          fontWeight: "bold",
                        }}
                      />
                      <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
                        {court.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {court.size}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <AccessTime sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 20 }} />
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                          Next available: {court.nextAvailable}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          mt: 1,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        Quick Book
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </CustomSlider>
          </motion.div>
        </Container>
      </Box>



      <Box
        sx={{
          position: "relative",
          // backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png')", // Đường dẫn ảnh
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
                {/* <Chip
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
                /> */}

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
      <ScrollToTopBtn />
    </ThemeProvider>
  );
}
