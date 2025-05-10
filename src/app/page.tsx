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
  CatchingPokemon,
  LocalFireDepartment
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
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { grey } from "@mui/material/colors";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
// import WhatshotIcon from '@mui/icons-material/Whatshot';
import React, { useContext, useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { CardNews2 } from "./components/CardNews2";
import * as demoData from "@/utility/demoData";
import SportCard from "./components/SportCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTopBtn from "./components/ScrollToTopBtn";
import Footer from "./components/Footer";
import { useRouter } from 'next/navigation';
import { publicApi } from "@/api/base";
import { AppContext } from "./contexts/AppContext";
import Image from "./components/Image";

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
    color: black;
  }
`;

const tabIcon = [<SportsSoccer key={0} />, <SportsCricket key={1} />, <SportsTennis key={2} />, <CatchingPokemon key={3} />]

export default function HomePage() {
  const router = useRouter();
  const { setSportName, setBranchOption } = useContext(AppContext);
  const [sportTab, setSportTab] = useState(0);
  const [branch, setBranch] = useState("");
  const [sport, setSport] = useState("");
  const [date, setDate] = useState(dayjs());
  const [courtType, setCourtType] = useState("");
  const bookingFormRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [branchData, setBranchData] = useState([]);
  const [sportCategoriesData, setSportCategoriesData] = useState([]);
  const [tabData, setTabData] = useState<any[]>([]);

  const handleSportTabChange = (
    event: any,
    newValue: React.SetStateAction<number>
  ) => {
    // console.log("event:" + event.target.textContent);
    setSportTab(newValue);
    setSportName(event.target.textContent);
  };

  const toBooking = (item: any) => {
    if (sportTab === 0) {
      setSportName('Bóng đá');
    }
    // console.log("item", item);
    setBranchOption({
      value: item.id,
      label: item.name
    });
    router.push("/dat-san");
  };

  const gotoBookingPage = () => {
    setSportName('');
    router.push("/dat-san");
  };

  const gotoBookingPageWithBranch = (item: any) => {
    setSportName('');
    // console.log("item", item);
    setBranchOption({
      value: item.id,
      label: item.name
    });
    router.push("/dat-san");
  };

  function filterBySportName(data: any, sportName = "Bóng đá") {
    return data.filter((branch: any) =>
      branch.sport_categories.some((category: any) => category.name === sportName)
    );
  }

  const [tab0, setTab0] = useState<any[]>([]);
  const [tab1, setTab1] = useState<any[]>([]);
  const [tab2, setTab2] = useState<any[]>([]);
  const [tab3, setTab3] = useState<any[]>([]);
  // const [tab4, setTab4] = useState<any[]>([]);
  // const [tab5, setTab5] = useState<any[]>([]);

  useEffect(() => {

    setSportName('');
    setBranchOption({ value: 0, label: '' });

    const getData = async () => {
      try {
        const configApi = publicApi("");
        const result = await configApi.get("/branches");
        const sportCatigories = await configApi.get("/sport-categories");
        setBranchData(result.data.items);
        // console.log("result.data.items", result.data.items);
        setSportCategoriesData(sportCatigories.data.items);

        // sportCatigories.data.items.forEach((item: any) => {
        //   const tmp = filterBySportName(item.data.items, item.name);
        //   console.log("tmp", tmp);
        //   setTabData((prev: any) => ({
        //     ...prev,
        //     tmp, // dùng key động theo tên môn thể thao
        //   }));
        // });

        // const tmp = filterBySportName(result.data.items, sportCatigories.data.items[0].name);
        // console.log("tmp", tmp);
        setTab0(filterBySportName(result.data.items, sportCatigories.data.items[0].name));
        setTab1(filterBySportName(result.data.items, sportCatigories.data.items[1].name));
        setTab2(filterBySportName(result.data.items, sportCatigories.data.items[2].name));
        setTab3(filterBySportName(result.data.items, sportCatigories.data.items[3].name));

      } catch (error) {
        setBranchData([]);
      }
    }
    getData();
    // setSportName('Bóng đá');
    // console.log("tabData", tabData);
  }, []);

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


  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />

      <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <HeroVideo autoPlay muted loop>
          <source
            src="https://videos.pexels.com/video-files/5489581/5489581-hd_1920_1080_25fps.mp4"
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
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  // startIcon={<CalendarMonth />}
                  onClick={gotoBookingPage}
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
              {
                sportCategoriesData.map((item: any, index) => (
                  <Tab key={index}
                    label={item.name}
                    icon={tabIcon[item.id]}
                    iconPosition="start"
                  />
                ))
              }

            </Tabs>
          </motion.div>

          <Box sx={{ mt: 2 }}>
            {/* Soccer Fields */}
            {sportTab === 0 && (
              <Grid container spacing={3} justifyContent="center">
                {
                  (tab0.length > 0) ?
                    tab0.map((item, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div
                          style={{ height: '100%' }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Box sx={{ position: "relative", height: "100%" }}>
                            <Card
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                              }}
                            >
                              {/* <CardMedia
                                component="img"
                                height="160"
                                image={item.images ? item.images[Math.floor(Math.random() * item.images.length)] : `https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png`}
                                alt={`Branch ${index + 1}`}
                              /> */}
                              <Image
                                alt="QR-code"
                                src={item.images ? item.images[Math.floor(Math.random() * item.images.length)] : `https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png`}
                                width={400}
                                height={240}
                                style={{
                                  objectFit: "fill",
                                }}
                              />
                              <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                  sx={{ fontWeight: 600 }}
                                >
                                  {item.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 1, height: "50px" }}
                                >
                                  {item.street + ", " + item.ward + ", " + item.district + ", " + item.city}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 2 }}
                                >
                                  {`Mở cửa: ${item.openTime} - ${item.closeTime}`}
                                </Typography>
                              </CardContent>

                              <Box sx={{ p: 2, pt: 0 }}>
                                {/* <Button variant="outlined" color="primary" fullWidth>
                          Xem chi tiết
                        </Button> */}
                                <Button variant="contained" color="primary" fullWidth onClick={() => toBooking(item)}>
                                  Đặt sân ngay
                                </Button>
                              </Box>
                            </Card>
                          </Box>
                        </motion.div>
                      </Grid>
                    ))
                    : (
                      <Grid container direction="row" justifyContent={"center"}>
                        <Typography sx={{ fontStyle: 'italic' }}>Chúng tôi đang cập nhật, bạn hãy chọn môn khác</Typography>
                      </Grid>
                    )
                }
              </Grid>
            )}

            {/* Tennis Courts */}
            {sportTab === 1 && (
              <Grid container spacing={3} justifyContent="center">
                {
                  (tab1.length > 0) ?
                    tab1.map((item, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div
                          style={{ height: '100%' }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Box sx={{ position: "relative", height: "100%" }}>
                            <Card
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                              }}
                            >
                              <Image
                                alt="QR-code"
                                src={item.images ? item.images[Math.floor(Math.random() * item.images.length)] : `https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png`}
                                width={400}
                                height={240}
                                style={{
                                  objectFit: "fill",
                                }}
                              />
                              <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                  sx={{ fontWeight: 600 }}
                                >
                                  {item.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 1, height: "50px" }}
                                >
                                  {item.street + ", " + item.ward + ", " + item.district + ", " + item.city}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 2 }}
                                >
                                  {`Mở cửa: ${item.openTime} - ${item.closeTime}`}
                                </Typography>
                              </CardContent>

                              <Box sx={{ p: 2, pt: 0 }}>
                                {/* <Button variant="outlined" color="primary" fullWidth>
                          Xem chi tiết
                        </Button> */}
                                <Button variant="contained" color="primary" fullWidth onClick={() => toBooking(item)}>
                                  Đặt sân ngay
                                </Button>
                              </Box>
                            </Card>
                          </Box>
                        </motion.div>
                      </Grid>
                    ))
                    : (
                      <Grid container direction="row" justifyContent={"center"}>
                        <Typography sx={{ fontStyle: 'italic' }}>Chúng tôi đang cập nhật, bạn hãy chọn môn khác</Typography>
                      </Grid>
                    )
                }
              </Grid>
            )}

            {/* Pickelball */}
            {sportTab === 2 && (
              <Grid container spacing={3} justifyContent="center">
                {
                  (tab2.length > 0) ?
                    tab2.map((item, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div
                          style={{ height: '100%' }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Box sx={{ position: "relative", height: "100%" }}>
                            <Card
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                              }}
                            >
                              <Image
                                alt="QR-code"
                                src={item.images ? item.images[Math.floor(Math.random() * item.images.length)] : `https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png`}
                                width={400}
                                height={240}
                                style={{
                                  objectFit: "fill",
                                }}
                              />
                              <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                  sx={{ fontWeight: 600 }}
                                >
                                  {item.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 1, height: "50px" }}
                                >
                                  {item.street + ", " + item.ward + ", " + item.district + ", " + item.city}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 2 }}
                                >
                                  {`Mở cửa: ${item.openTime} - ${item.closeTime}`}
                                </Typography>
                              </CardContent>

                              <Box sx={{ p: 2, pt: 0 }}>
                                {/* <Button variant="outlined" color="primary" fullWidth>
                          Xem chi tiết
                        </Button> */}
                                <Button variant="contained" color="primary" fullWidth onClick={() => toBooking(item)}>
                                  Đặt sân ngay
                                </Button>
                              </Box>
                            </Card>
                          </Box>
                        </motion.div>
                      </Grid>
                    ))
                    : (
                      <Grid container direction="row" justifyContent={"center"}>
                        <Typography sx={{ fontStyle: 'italic' }}>Chúng tôi đang cập nhật, bạn hãy chọn môn khác</Typography>
                      </Grid>
                    )
                }
              </Grid>
            )}

            {/* Badminton Courts */}
            {sportTab === 3 && (
              <Grid container spacing={3} justifyContent="center">
                {
                  (tab3.length > 0) ?
                    tab3.map((item, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div
                          style={{ height: '100%' }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Box sx={{ position: "relative", height: "100%" }}>
                            <Card
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                              }}
                            >
                              <Image
                                alt="QR-code"
                                src={item.images ? item.images[Math.floor(Math.random() * item.images.length)] : `https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png`}
                                width={400}
                                height={240}
                                style={{
                                  objectFit: "fill",
                                }}
                              />
                              <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                  sx={{ fontWeight: 600 }}
                                >
                                  {item.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 1, height: "50px" }}
                                >
                                  {item.street + ", " + item.ward + ", " + item.district + ", " + item.city}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 2 }}
                                >
                                  {`Mở cửa: ${item.openTime} - ${item.closeTime}`}
                                </Typography>
                              </CardContent>

                              <Box sx={{ p: 2, pt: 0 }}>
                                {/* <Button variant="outlined" color="primary" fullWidth>
                          Xem chi tiết
                        </Button> */}
                                <Button variant="contained" color="primary" fullWidth onClick={() => toBooking(item)}>
                                  Đặt sân ngay
                                </Button>
                              </Box>
                            </Card>
                          </Box>
                        </motion.div>
                      </Grid>
                    ))
                    : (
                      <Grid container direction="row" justifyContent={"center"}>
                        <Typography sx={{ fontStyle: 'italic' }}>Chúng tôi đang cập nhật, bạn hãy chọn môn khác</Typography>
                      </Grid>
                    )
                }
              </Grid>
            )}
          </Box>
        </Container>
      </Box>

      {/* System Branch */}
      {
        branchData.length > 0 && branchData.filter((item: any) => item.isHot).length > 0 &&
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
                Chi nhánh nổi bật của chúng tôi
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                sx={{ mb: 6 }}
              >
                Đặt sân và trải nghiệm ngay
              </Typography>
            </motion.div>

            <Grid container spacing={3} justifyContent="center">
              {
                branchData.filter((item: any) => item.isHot).map((item: any, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div
                      style={{ height: '100%' }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Box sx={{ position: "relative", height: "100%" }}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={0.5}
                          sx={{
                            position: "absolute",
                            top: 16, // Cách mép trên 8px
                            right: 8, // Cách mép phải 8px

                            backgroundColor: "var(--Primary-50)", // Nền mờ giúp dễ đọc hơn
                            borderRadius: "4px", // Bo góc nhẹ
                            padding: "2px 6px", // Thêm padding để dễ nhìn
                          }}
                        >
                          <LocalFireDepartment sx={{ color: "red", }} fontSize="small" />
                          <Typography sx={{ color: "red", fontWeight: "bold" }} fontSize="1rem">
                            HOT
                          </Typography>
                        </Box>
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
                            image={item.images ? item.images[Math.floor(Math.random() * item.images.length)] : `https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png`}
                            alt={`Branch ${index + 1}`}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              sx={{ fontWeight: 600 }}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1, height: "50px" }}
                            >
                              {item.street + ", " + item.ward + ", " + item.district + ", " + item.city}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              {`Mở cửa: ${item.openTime} - ${item.closeTime}`}
                            </Typography>
                            {
                              item.sport_categories.map((e: any) => (
                                <Box key={e.id}
                                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                                >
                                  <CheckCircle
                                    sx={{ color: "green", mr: 1, fontSize: 16 }}
                                  />
                                  <Typography variant="body2">
                                    {e.name}
                                  </Typography>
                                </Box>
                              ))
                            }

                          </CardContent>

                          <Box sx={{ p: 2, pt: 0 }}>
                            {/* <Button variant="outlined" color="primary" fullWidth>
                            Xem chi tiết
                          </Button> */}
                            <Button variant="contained" color="primary" fullWidth onClick={() => gotoBookingPageWithBranch(item)}>
                              Đặt sân ngay
                            </Button>

                          </Box>
                        </Card>
                      </Box>
                    </motion.div>
                  </Grid>
                ))
              }
            </Grid>
          </Container>
        </Box>
      }

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

