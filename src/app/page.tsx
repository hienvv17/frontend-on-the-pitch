"use client";
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
} from "@mui/icons-material";
import {
  Typography,
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
  Grid2,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { grey } from "@mui/material/colors";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
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
import Footer from "./components/Footer";
const HeroVideo = styled("video")({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -1,
});

const HeroOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: -1,
});

const PromoBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: "0.75rem",
    fontWeight: "bold",
    padding: "0 8px",
    borderRadius: "12px",
  },
}));

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
      main: "#fff",
      light: "#fff",
      dark: "#272727",
      contrastText: "#041426",
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
  const [sportTab, setSportTab] = useState(0);
  const [branch, setBranch] = useState("");
  const [sport, setSport] = useState("");
  const [date, setDate] = useState(dayjs());
  const [courtType, setCourtType] = useState("");
  const bookingFormRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSportTabChange = (
    event: any,
    newValue: React.SetStateAction<number>
  ) => {
    setSportTab(newValue);
  };

  const scrollToBooking = () => {
    bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
  };

  const promotionSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isSmallScreen ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const reviewSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isSmallScreen ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

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
    },
  });

  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState(0); // Xác định Carousel nào được chọn
  const carouselRefs = useRef<(Slider | null)[]>(
    Array.from({ length: 3 }, () => null)
  ); // Mảng ref chứa 3 Carousel

  // Khi num thay đổi, chỉ reset Carousel tương ứng
  useEffect(() => {
    const ref = carouselRefs.current[selectedCarouselIndex];
    if (ref) ref.slickGoTo(0); // Chỉ reset Carousel tương ứng
  }, [
    chipSelected.soccer.chipNum,
    chipSelected.badminton.chipNum,
    chipSelected.tennis.chipNum,
    selectedCarouselIndex,
  ]);

  const handleChipClick = (
    sport: string,
    chipKey: string,
    chipNum: number,
    index: number
  ) => {
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
        },
      },
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
  };

  const featuredCourts = [
    {
      id: 1,
      name: "Sân nhân tạo Star",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      backgroundSize: "cover", // Tỷ lệ ảnh",
      nextAvailable: "2:00 PM ",
      type: "Bóng đá",
      size: "Sân 11",
    },
    {
      id: 2,
      name: "Cầu lông Tiến Minh",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",

      nextAvailable: "3:30 PM ",
      type: "Tennis",
      size: "Đơn/Đôi",
    },
    {
      id: 3,
      name: "Tenis Hoàng Gia",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",

      nextAvailable: "5:00 PM ",
      type: "Cầu lông",
      size: "Đôi",
    },
    {
      id: 4,
      name: "Sân nhân tạo Gadent",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",

      nextAvailable: "6:30 PM ",
      type: "Bóng đá",
      size: "Sân 7",
    },
    {
      id: 5,
      name: "Elite Tennis Club",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",

      nextAvailable: "10:00 AM ",
      type: "Tennis",
      size: "Đơn/Đôi",
    },
  ];
  const soccerFields = [
    {
      id: 1,
      name: "Sân cỏ nhân tạo Star",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      type: "Sân 11",
      branch: "Central Branch",
      price: "960.000đ/giờ",
    },
    {
      id: 2,
      name: "Sân cỏ nhân tạo Star",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      type: "Sân 7",
      branch: "Riverside Branch",
      price: "560.000đ/giờ",
    },
    {
      id: 3,
      name: "Sân cỏ nhân tạo Star",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      type: "Sân 5",
      branch: "Western Branch",
      price: "150.000đ/giờ",
    },
  ];

  const badmintonCourts = [
    {
      id: 1,
      name: "Cầu lông Tiến Minh",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      type: "Đôi",
      branch: "Central Branch",
      price: "250.000đ/giờ",
    },
    {
      id: 2,
      name: "Cầu lông Tiến Minh",

      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      type: "Đơn/Đôi",
      branch: "Eastern Branch",
      price: "560.000đ/giờ",
    },
    {
      id: 3,
      name: "Cầu lông Tiến Minh",

      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      type: "Giải đấu",
      branch: "Northern Branch",
      price: "1.670.000đ/giờ",
    },
  ];

  const tennisCourts = [
    {
      id: 1,
      name: "Hoang Gia Tennis Club",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      type: "Sân đất",
      branch: "Southern Branch",
      price: "270.000đ/giờ",
    },
    {
      id: 2,
      name: "Hoang Gia Tennis Club",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      type: "Sân cứng",
      branch: "Central Branch",
      price: "470.000đ/giờ",
    },
    {
      id: 3,
      name: "Hoang Gia Tennis Club",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      type: "Sân cỏ",
      branch: "Premium Branch",
      price: "870.000đ/giờ",
    },
  ];

  const promotions = [
    {
      id: 1,
      title: "Book 5 times, get 1 free playing hour",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      badge: "HOT",
    },
    {
      id: 2,
      title: "30% off when booking a court 3 days in advance",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      badge: "FLASH DEAL",
    },
    {
      id: 3,
      title: "Free team shirt when booking for the first time",
      image:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      badge: "NEW",
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Lê Thanh Tùng",
      avatar:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      bookings: 1,
      rating: 5,
      comment:
        "Ứng dụng đặt chỗ sân vận động nhanh chóng và dễ dàng, không cần gọi điện. Sân vận động tuyệt vời, chủ sở hữu nhiệt tình.",
    },
    {
      id: 2,
      name: "Võ Văn Hiền",
      avatar:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      bookings: 8,
      rating: 4.5,
      comment:
        "Quá trình đặt chỗ rất thuận tiện. Sân luôn được bảo dưỡng tốt và nhân viên thân thiện.",
    },
    {
      id: 3,
      name: "Nguyễn Văn Tẻm",
      avatar:
        "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
      bookings: 20,
      rating: 5,
      comment:
        "Tôi thích cách dễ dàng để đặt sân với bạn bè của tôi. Hệ thống thông báo rất hữu ích!",
    },
  ];

  const branches = [
    "",
    "Cầu lông Tiến Minh",
    "Hoàng Gia Tenis Club",
    "Sân cỏ nhân tạo Star",
  ];

  const address = [
    "",
    "1220 Quang Trung, Phường 12, Quận Gò Vấp, TP.HCM",
    "889 Nguyễn Văn Quá,Phường Đông Hưng Thuận, Quận 12, TP.HCM",
    "12 Nguyễn Văn Bá, Phường Bình Thọ, Quận Thủ Đức, TP.HCM",
  ];

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />

      <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <HeroVideo autoPlay muted loop>
          <source
            src="https://ik.imagekit.io/onthepitch/demo-video.mp4?tr=orig&updatedAt=1746544473360"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </HeroVideo>
        <HeroOverlay />

        <Container
          maxWidth="lg"
          sx={{ height: "100%", position: "relative", zIndex: 2 }}
        >
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
            <motion.div
              initial={{ opacity: 0.1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
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
                Đặt sân nhanh chóng, thanh toán thuận tiện, sẵn sàng ra sân mọi
                lúc.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Grid2 size={30}>
                <Typography
                  color="var(--Primary-50)"
                  sx={{
                    fontStyle: "italic",
                    mb: 4,
                    maxWidth: { md: "70%" },
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  &quot;Không gì là không thể, chỉ cần bạn bắt đầu!&quot;
                </Typography>
              </Grid2>
            </motion.div>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
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

            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
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
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                  }}
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
              Sân đấu nổi bật
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              sx={{ mb: 6 }}
            >
              Khám phá những địa điểm thể thao phổ biến nhất của chúng tôi
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0 }}
          >
            <CustomSlider {...featuredSliderSettings}>
              {featuredCourts.map((court) => (
                <Box key={court.id} sx={{ px: "0px" }}>
                  <Card
                    sx={{
                      height: 380,
                      position: "relative",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 20px 30px rgba(0,0,0,0.15)",
                      },
                      borderRadius: "20px",
                      marginRight: "30px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={court.image}
                      alt={court.name}
                    />
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
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: 600 }}
                      >
                        {court.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {court.size}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <AccessTime
                          sx={{
                            color: theme.palette.primary.main,
                            mr: 1,
                            fontSize: 20,
                          }}
                        />
                        <Typography
                          variant="body2"
                          color="primary"
                          sx={{ fontWeight: 500 }}
                        >
                          Có sẵn: {court.nextAvailable}
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

      <Box sx={{ py: { xs: 6, md: 10 } }}>
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
              Tại sao chọn chúng tôi
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              sx={{ mb: 8 }}
            >
              Cách dễ nhất để đặt cơ sở thể thao
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {[
              {
                icon: (
                  <CalendarMonth
                    sx={{ fontSize: 50, color: theme.palette.primary.main }}
                  />
                ),
                title: "Đặt sân nhanh chóng ",
                description:
                  "Chọn môn thể thao, địa điểm và xác nhận đặt sân chỉ vài bước.",
              },
              {
                icon: (
                  <Place
                    sx={{ fontSize: 50, color: theme.palette.primary.main }}
                  />
                ),
                title: "Hơn 50 chi nhánh toàn quốc",
                description:
                  "Tìm sân gần bạn với hệ thống cơ sở thể thao rộng khắp.",
              },
              {
                icon: (
                  <CreditCard
                    sx={{ fontSize: 50, color: theme.palette.primary.main }}
                  />
                ),
                title: "Thanh toán linh hoạt",
                description:
                  "Hỗ trợ MoMo, VNPay, thẻ tín dụng hoặc tiền mặt khi đến sân.",
              },
              {
                icon: (
                  <CalendarMonth
                    sx={{ fontSize: 50, color: theme.palette.primary.main }}
                  />
                ),
                title: "Quản lý đặt sân dễ dàng",
                description:
                  "Xem, chỉnh sửa hoặc huỷ đặt sân thông qua tài khoản cá nhân.",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      borderRadius: 4,
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        transform: "translateY(-10px)",
                      },
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <Typography variant="h6" sx={{ my: 2, fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* List of Sports (Tabs) */}
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
              Cơ sở thể thao của chúng tôi
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              sx={{ mb: 4 }}
            >
              Lựa chọn từ nhiều môn thể thao và địa điểm khác nhau
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs
              value={sportTab}
              onChange={handleSportTabChange}
              centered
              sx={{
                mb: 4,
                "& .MuiTab-root": {
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  fontWeight: 600,
                  px: { xs: 2, md: 4 },
                  py: 2,
                },
                "& .Mui-selected": {
                  color: theme.palette.primary.main,
                },
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: theme.palette.primary.main,
                  height: 3,
                },
              }}
            >
              <Tab
                label=" Bóng Đá"
                icon={<SportsSoccer />}
                iconPosition="start"
              />
              <Tab
                label=" Cầu Lông"
                icon={<SportsCricket />}
                iconPosition="start"
              />
              <Tab
                label=" Tennis"
                icon={<SportsTennis />}
                iconPosition="start"
              />
            </Tabs>
          </motion.div>

          <Box sx={{ mt: 2 }}>
            {/* Soccer Fields */}
            {sportTab === 0 && (
              <Grid container spacing={3}>
                {soccerFields.map((field, index) => (
                  <Grid item xs={12} sm={6} md={4} key={field.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardMedia
                          component="img"
                          height="180"
                          image={field.image}
                          alt={field.name}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: 600 }}
                          >
                            {field.name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Loại: {field.type}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="primary"
                              sx={{ fontWeight: 500 }}
                            >
                              {field.price}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{ flex: 1 }}
                            >
                              Xem chi tiết
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{ flex: 1 }}
                            >
                              Đặt lịch ngay
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Badminton Courts */}
            {sportTab === 1 && (
              <Grid container spacing={3}>
                {badmintonCourts.map((court, index) => (
                  <Grid item xs={12} sm={6} md={4} key={court.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardMedia
                          component="img"
                          height="180"
                          image={court.image}
                          alt={court.name}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: 600 }}
                          >
                            {court.name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Loại: {court.type}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="primary"
                              sx={{ fontWeight: 500 }}
                            >
                              {court.price}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{ flex: 1 }}
                            >
                              Xem chi tiết
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{ flex: 1 }}
                            >
                              Đặt lịch ngay
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Tennis Courts */}
            {sportTab === 2 && (
              <Grid container spacing={3}>
                {tennisCourts.map((court, index) => (
                  <Grid item xs={12} sm={6} md={4} key={court.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardMedia
                          component="img"
                          height="180"
                          image={court.image}
                          alt={court.name}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: 600 }}
                          >
                            {court.name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Loại: {court.type}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="primary"
                              sx={{ fontWeight: 500 }}
                            >
                              {court.price}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{ flex: 1 }}
                            >
                              Xem chi tiết
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{ flex: 1 }}
                            >
                              Đặt lịch ngay
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Container>
      </Box>

      {/* System Branch */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
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
              Chi nhánh của chúng tôi
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              sx={{ mb: 6 }}
            >
              Tìm một cơ sở thể thao gần bạn
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {[1, 2, 3].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={`https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png`}
                      alt={`Branch ${index + 1}`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 600 }}
                      >
                        {branches[index + 1]}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {address[index + 1]}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Mở cửa: 6:00 AM - 11:00 PM
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <CheckCircle
                          sx={{ color: "green", mr: 1, fontSize: 16 }}
                        />
                        <Typography variant="body2">
                          {index % 2 === 0 ? "Bóng đá" : "Tennis "}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <CheckCircle
                          sx={{ color: "green", mr: 1, fontSize: 16 }}
                        />
                        <Typography variant="body2">
                          {index % 2 === 0 ? "Tennis " : "Cầu lông"}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button variant="contained" color="primary" fullWidth>
                        Xem
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Customer Reviews */}
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
              Đánh giá của khách hàng
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              sx={{ mb: 6 }}
            >
              Khách hàng nói gì về chúng tôi
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CustomSlider {...reviewSliderSettings}>
              {reviews.map((review) => (
                <Box key={review.id} sx={{ px: 1 }}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        height: 280,
                        borderRadius: 4,
                        display: "flex",
                        flexDirection: "column",
                        marginRight: 5,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar
                          src={review.avatar}
                          alt={review.name}
                          sx={{ width: 60, height: 60, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {review.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {review.bookings} bookings
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Rating
                          value={review.rating}
                          precision={0.5}
                          readOnly
                          icon={<Star sx={{ color: "#FFD700" }} />}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          flex: 1,
                          fontStyle: "italic",
                          color: "text.secondary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {review.comment}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Box>
              ))}
            </CustomSlider>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />

      <ScrollToTopBtn />
    </ThemeProvider>
  );
}

