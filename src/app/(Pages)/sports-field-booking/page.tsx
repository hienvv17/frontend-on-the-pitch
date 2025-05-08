"use client";

import { useContext, useEffect, useState } from "react";
import moment, { Moment } from "moment";
import {
  Typography,
  Button,
  Container,
  Box,
  Divider,
  Stack,
  CircularProgress,
  Paper,
  Card,
  CardContent,
  alpha,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";

import {
  Search,
  SportsSoccer,
  CalendarMonth,
  LocationOn,
  AccessTime,
  FilterList,
} from "@mui/icons-material";
import UserLayout from "@/app/components/UserLayout";
import SportCard from "@/app/components/SportCard";
import SelectBox from "@/app/components/SelectBox";
import TimePickerValue from "@/app/components/TimePicker";
import { useBookingApi } from "@/api/booking/booking";
import { msgDetail, ROUTES } from "@/utility/constant";
import { formatTime } from "@/utility/formatTime";
import { SportField } from "@/types/filedSearching";
import { AppContext } from "@/app/contexts/AppContext";
import OrderPopUp from "@/app/components/OrderPopUp";
import TimeSlotSelector from "@/app/components/TimeSlotSelector";
import CustomDatePicker from "@/app/components/DatePicker";
import PaymentPopUp from "@/app/components/PaymentPopUp";

export default function SportsFieldBooking() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { setOpenSnackBar, sportName } = useContext(AppContext);
  // console.log("sportName", sportName);
  const [data, setData] = useState<SportField[]>([]);
  const { GET_OPTIONS, POST_SEARCH_FIELDS } = useBookingApi();
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [isSearchDone, setIsSearchDone] = useState(false);
  const [isSearchDisable, setIsSearchDisable] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

  const [searchData, setSearchData] = useState<{
    sportValue: string | null;
    sportOption: any | null;
    branchValue: string | null;
    branchOption: any | null;
    dayPicked: moment.Moment | string | null;
    startTime: moment.Moment | null;
    endTime: moment.Moment | null;
  }>({
    sportValue: null,
    sportOption: null,
    branchValue: null,
    branchOption: null,
    dayPicked: null,
    startTime: null,
    endTime: null,
  });

  const [resData, setResData] = useState({
    branchs: [],
    sportFields: [],
    raw: {
      branchs: {},
      sportFields: {},
    },
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState<any>();
  const [bookingData, setBookingData] = useState({
    sportFieldId: 0,
    email: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
    totalPrice: 0,
  });

  const [tempEmail, setTempEemail] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<Date[]>([]);
  const [startSlot, setStartSlot] = useState<Date | null>(null);
  const [openDialog2, setOpenDialog2] = useState(false);
  const handleOpenDialog2 = () => setOpenDialog2(true);
  const handleCloseDialog2 = () => setOpenDialog2(false);

  useEffect(() => {
    setData([]);
    const isAvailable =
      moment(searchData.dayPicked).date() === moment().date() &&
      moment().hour() >= 22;
    if (isAvailable) {
      setIsSearchDisable(true);
      setOpenSnackBar({ isOpen: true, msg: msgDetail[6], type: "error" });
      return;
    }
    setIsSearchDisable(false);
    setOpenSnackBar({ isOpen: false, msg: msgDetail[16], type: "info" });
  }, [searchData.dayPicked]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const branchRes = await GET_OPTIONS(ROUTES.BRANCHES);
        const sportCatRes = await GET_OPTIONS(ROUTES.SPORT_CATEGORIES);
        const reformattedData = branchRes.items.map((data: any) => {
          return {
            value: data.id,
            label: data.name,
          };
        });
        const reformattedData2 = sportCatRes.items.map((data: any) => {
          return {
            value: data.id,
            label: data.name,
          };
        });
        setResData({
          branchs: reformattedData,
          sportFields: reformattedData2,
          raw: {
            branchs: branchRes.items,
            sportFields: sportCatRes.items,
          },
        });

        if (sportName !== '') {
          const temp = reformattedData2.find((item: any) => {
            return item.label.trim().toLowerCase() === sportName.trim().toLowerCase();
          });

          setSearchData((prev: any) => ({
            ...prev,
            sportOption: temp,
            sportValue: temp.value
          }));
        }

      } catch (err) {
        console.log("Lỗi khi gọi API: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const handleStartTimeChange = (e: moment.Moment) => {
    setSearchData((prev) => ({
      ...prev,
      startTime: e ? moment(e, "HH:mm") : null,
      endTime: null,
    }));
  };

  const handleEndTimeChange = (e: moment.Moment) => {
    setSearchData((prev) => ({
      ...prev,
      endTime: e ? moment(e, "HH:mm") : null,
    }));
  };

  const handleSelectChange = (e: any, name: string) => {
    if (name === "sportValue") {
      setSearchData((prev) => ({
        ...prev,
        [name]: e ? e.value : e,
        sportOption: e
      }));
    } else {
      setSearchData((prev) => ({
        ...prev,
        [name]: e ? e.value : e,
        branchOption: e,
        // sportOption: null
      }));
    }
    setData([]);
  };

  const handleDateChange = (e: any) => {
    const value = e === null ? e : moment(e, "YYYY-MM-DD");
    setSelectedDate(value);
    setSearchData((prev) => ({
      ...prev,
      dayPicked: value,
      startTime: null,
      endTime: null,
    }));
  };

  const searchSubmit = async () => {
    const requestBody = {
      sportCategoryId: Number(searchData.sportValue),
      branchId: Number(searchData.branchValue),
      date:
        searchData.dayPicked === null
          ? null
          : moment(searchData.dayPicked).format("YYYY-MM-DD"),
      startTime: formatTime(searchData.startTime) as string,
      endTime: formatTime(searchData.endTime) as string,
    };

    if (requestBody.branchId === 0) {
      setOpenSnackBar({ isOpen: true, msg: msgDetail[1], type: "error" });
      setData([]);
      return;
    } else {
      const getData = async (requestBody: any) => {
        let response;
        try {
          if (
            !requestBody.date &&
            !requestBody.sportCategoryId &&
            !requestBody.startTime &&
            !requestBody.endTime
          ) {
            response = await GET_OPTIONS(
              ROUTES.SPORT_FIELDS + `/${requestBody.branchId}`
            );
          } else {
            setOpenSnackBar({
              isOpen: false,
              msg: msgDetail[16],
              type: "info",
            });

            if (requestBody.sportCategoryId === 0) {
              setOpenSnackBar({
                isOpen: true,
                msg: msgDetail[0],
                type: "error",
              });
              setData([]);
              return;
            }

            if (requestBody.date === null) {
              setOpenSnackBar({
                isOpen: true,
                msg: msgDetail[15],
                type: "error",
              });
              setData([]);
              return;
            }

            if (requestBody.endTime > "23:00") {
              setOpenSnackBar({
                isOpen: true,
                msg: msgDetail[5],
                type: "error",
              });
              setIsSearchDisable(true);
              return;
            }

            if (searchData.startTime === null) {
              if (searchData.endTime !== null) {
                setOpenSnackBar({
                  isOpen: true,
                  msg: msgDetail[4],
                  type: "error",
                });
                setIsSearchDisable(true);
                return;
              }
            } else {
              if (searchData.endTime !== null) {
                const isValidDuration =
                  searchData.endTime.diff(searchData.startTime, "minutes") >=
                  60;
                if (!isValidDuration) {
                  setOpenSnackBar({
                    isOpen: true,
                    msg: msgDetail[3],
                    type: "error",
                  });
                  return;
                }
              }
            }

            setIsSearchDone(true);
            setIsSearchDisable(true);
            setIsBusy(true);
            response = await POST_SEARCH_FIELDS(
              ROUTES.SPORT_FIELDS + "/available",
              requestBody
            );
          }

          setBookingData((prev) => ({
            ...prev,
            bookingDate: requestBody.date === null ? "" : requestBody.date,
            sportFieldId: requestBody.sportCategoryId,
            startTime: requestBody.startTime,
            endTime: requestBody.endTime,
          }));

          if (response.status === 201) {
            setData(response.data.items);
            setOpenSnackBar({ isOpen: true, msg: msgDetail[2], type: "info" });
            return;
          } else if (response.message === "Success") {
            setData(response.items);
            setOpenSnackBar({ isOpen: true, msg: msgDetail[2], type: "info" });
            return;
          }
          setOpenSnackBar({
            isOpen: true,
            msg: `Error2: ${response.data.message}`,
            type: "error",
          });
        } catch (error) {
          console.log("error", error);
          setData([]);
        } finally {
          setIsSearchDone(false);
          setIsSearchDisable(false);
          setIsBusy(false);
        }
      };
      getData(requestBody);
    }
  };

  const [timePickerErrorNum, setTimePickerErrorNum] = useState(0);

  useEffect(() => {
    if (timePickerErrorNum > 0) {
      setIsSearchDisable(true);
    } else setIsSearchDisable(false);
  }, [timePickerErrorNum]);

  const handleTimeError = (e: any, name: string) => {
    setData([]);
    if (name === "startTime") {
      setOpenSnackBar(
        e
          ? { isOpen: true, msg: msgDetail[4], type: "error" }
          : { isOpen: false, msg: msgDetail[4], type: "error" }
      );
    }
    if (name === "endTime") {
      setOpenSnackBar(
        e
          ? { isOpen: true, msg: msgDetail[5], type: "error" }
          : { isOpen: false, msg: msgDetail[5], type: "error" }
      );
    }
    if (e !== null) {
      setTimePickerErrorNum((prev) => prev + 1);
      setIsSearchDisable(true);
    } else {
      if (timePickerErrorNum > 0) {
        setTimePickerErrorNum((prev) => prev - 1);
      }
    }
  };

  const handleClickOpen = (field: any, branch: any) => {
    setDialogData({
      field,
      branch,
    });

    setBookingData((prev) => ({
      ...prev,
      sportFieldId: field.id,
    }));

    setOpenDialog2(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const [confirmOrder, setConfirmOrder] = useState(false);

  const handleConfirmOrder = () => {
    setBookingData((prev) => ({
      ...prev,
      email: tempEmail,
    }));
    setConfirmOrder(true);
  };

  const handleClosePayment = () => {
    setConfirmOrder(false);
  };

  return (
    <UserLayout>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: "var(--Primary-500)",
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "var(--Primary-700)",
              fontWeight: 500,
              animation: "pulse 1.5s infinite",
              "@keyframes pulse": {
                "0%": { opacity: 0.6 },
                "50%": { opacity: 1 },
                "100%": { opacity: 0.6 },
              },
            }}
          >
            Đang tải thông tin...
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "200px", sm: "300px", md: "400px" },
              backgroundImage: "url('/image/image_11.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.3)",
                zIndex: 1,
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
              zIndex: 0,
            }}
          >
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                px: 3,
                maxWidth: "800px",
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  color: "#fff",
                }}
              >
                Đặt Sân Thể Thao Trực Tuyến
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 400,
                  opacity: 0.9,
                  maxWidth: "600px",
                  mx: "auto",
                  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  color: "#fff",
                }}
              >
                Tìm và đặt sân thể thao một cách nhanh chóng, dễ dàng với hệ
                thống đặt sân trực tuyến của chúng tôi
              </Typography>
            </Box>
          </Box>

          <Container
            maxWidth="xl"
            sx={{
              mt: { xs: -5, sm: -7, md: -8 },
              mb: 8,
              position: "relative",
              zIndex: 10,
            }}
          >
            <Card
              elevation={8}
              sx={{
                borderRadius: "16px",
                overflow: "visible",
                background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardContent sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
                <Box sx={{ mb: 5 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "var(--Primary-700)",
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <SportsSoccer sx={{ color: "var(--Primary-500)" }} />
                    Tìm Kiếm Sân Thể Thao
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    Điền thông tin để tìm sân phù hợp với lịch của bạn
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    gap={3}
                    justifyContent={"center"}
                  >
                    <Grid xs={12} md={5}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: "12px",
                          border: "1px solid",
                          borderColor: "divider",
                          height: "100%",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "var(--Primary-300)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1.5,
                          }}
                        >
                          <LocationOn
                            sx={{ color: "var(--Primary-500)", mr: 1 }}
                          />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Cụm Sân
                          </Typography>
                        </Box>
                        <SelectBox
                          icon="Room"
                          titleValue="Chọn cụm sân"
                          name="sportBranchId"
                          options={resData.branchs}
                          value={searchData.branchOption}
                          onChange={(e: any) =>
                            handleSelectChange(e, "branchValue")
                          }
                          isBusy={isBusy}
                        />
                      </Paper>
                    </Grid>

                    <Grid xs={12} md={5}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: "12px",
                          border: "1px solid",
                          borderColor: "divider",
                          height: "100%",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "var(--Primary-300)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1.5,
                          }}
                        >
                          <SportsSoccer
                            sx={{ color: "var(--Primary-500)", mr: 1 }}
                          />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Môn Thể Thao
                          </Typography>
                        </Box>
                        <SelectBox
                          icon="SportsSoccer"
                          titleValue="Chọn môn thể thao"
                          name="sportId"
                          options={resData.sportFields}
                          value={searchData.sportOption}
                          onChange={(e: any) =>
                            handleSelectChange(e, "sportValue")
                          }
                          isBusy={isBusy}
                        />
                      </Paper>
                    </Grid>

                    <Grid xs={12} md={5}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: "12px",
                          border: "1px solid",
                          borderColor: "divider",
                          height: "100%",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "var(--Primary-300)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1.5,
                          }}
                        >
                          <CalendarMonth
                            sx={{ color: "var(--Primary-500)", mr: 1 }}
                          />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Ngày
                          </Typography>
                        </Box>
                        <CustomDatePicker
                          label="Chọn ngày"
                          name="bookingDate"
                          value={selectedDate}
                          onChange={handleDateChange}
                          isBusy={isBusy}
                        />
                      </Paper>
                    </Grid>

                    <Grid xs={12} md={5}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: "12px",
                          border: "1px solid",
                          borderColor: "divider",
                          height: "100%",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "var(--Primary-300)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1.5,
                          }}
                        >
                          <AccessTime
                            sx={{ color: "var(--Primary-500)", mr: 1 }}
                          />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Thời Gian
                          </Typography>
                        </Box>
                        <Grid container spacing={2} justifyContent="center">
                          <Grid
                            item
                            xs={6}
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Box sx={{ width: "100%", maxWidth: 200 }}>
                              <TimePickerValue
                                label="Giờ vào sân"
                                name="startTime"
                                onChange={handleStartTimeChange}
                                maxHour={22}
                                selectedDate={searchData.dayPicked}
                                value={searchData.startTime}
                                value2={searchData}
                                onError={(e: any) =>
                                  handleTimeError(e, "startTime")
                                }
                                isBusy={isBusy || searchData.dayPicked === null}
                              />
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <TimePickerValue
                              label="Giờ trả sân"
                              name="endTime"
                              onChange={handleEndTimeChange}
                              maxHour={23}
                              selectedDate={searchData.dayPicked}
                              value={searchData.endTime}
                              value2={searchData}
                              onError={(e: any) =>
                                handleTimeError(e, "endTime")
                              }
                              isBusy={isBusy}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 1 }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<Search />}
                      disabled={isSearchDisable}
                      size="large"
                      onClick={searchSubmit}
                      sx={{
                        background:
                          "linear-gradient(90deg, var(--Primary-600) 0%, var(--Primary-500) 100%)",
                        color: "white",
                        px: 4,
                        py: 1.5,
                        borderRadius: "12px",
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "1rem",
                        boxShadow: "0 4px 10px rgba(var(--Primary-rgb), 0.3)",
                        transition: "all 0.3s",
                        "&:hover": {
                          boxShadow: "0 6px 15px rgba(var(--Primary-rgb), 0.4)",
                          background:
                            "linear-gradient(90deg, var(--Primary-700) 0%, var(--Primary-600) 100%)",
                        },
                        "&:disabled": {
                          background: "rgba(0, 0, 0, 0.12)",
                          color: "rgba(0, 0, 0, 0.26)",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Tìm Kiếm Sân
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ mt: 5, mb: 5 }}>
              {isSearchDone ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "300px",
                  }}
                >
                  <CircularProgress
                    size={60}
                    thickness={4}
                    sx={{ color: "var(--Primary-500)" }}
                  />
                </Box>
              ) : (
                <>
                  {data.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ mb: 3 }}
                      >
                        <FilterList sx={{ color: "var(--Primary-500)" }} />
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          color="var(--Primary-700)"
                        >
                          Kết Quả Tìm Kiếm
                        </Typography>
                        <Divider sx={{ flexGrow: 1 }} />
                        <Box
                          sx={{
                            backgroundColor: "var(--Primary-50)",
                            color: "var(--Primary-700)",
                            px: 2,
                            py: 0.5,
                            borderRadius: "20px",
                            fontWeight: 600,
                            border: "1px solid var(--Primary-200)",
                          }}
                        >
                          {data.length} sân
                        </Box>
                      </Stack>

                      <Card
                        elevation={0}
                        sx={{
                          p: 0.5,
                          borderRadius: "16px",
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.05
                          ),
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Grid container sx={{ p: { xs: 1, sm: 2 } }}>
                          {data.map((field, index) => (
                            <Grid key={index} xs={12} sm={6} md={4} lg={3}>
                              <SportCard
                                data={field}
                                resData={resData}
                                searchData={searchData}
                                branchInfo={resData.raw.branchs}
                                onClick={() =>
                                  handleClickOpen(field, resData.raw.branchs)
                                }
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Card>
                    </Box>
                  )}

                  {data.length === 0 &&
                    !isLoading &&
                    searchData.branchValue && (
                      <Box
                        sx={{
                          textAlign: "center",
                          py: 8,
                          px: 2,
                          backgroundColor: "var(--Primary-50)",
                          borderRadius: "16px",
                          border: "1px dashed var(--Primary-200)",
                        }}
                      >
                        <SportsSoccer
                          sx={{
                            fontSize: 80,
                            color: "var(--Primary-200)",
                            mb: 2,
                            opacity: 0.7,
                          }}
                        />
                        <Typography
                          variant="h5"
                          color="var(--Primary-700)"
                          fontWeight={600}
                          gutterBottom
                        >
                          Không tìm thấy sân phù hợp
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ maxWidth: "600px", mx: "auto", mb: 3 }}
                        >
                          Vui lòng thử lại với các tiêu chí tìm kiếm khác hoặc
                          chọn một ngày khác để xem kết quả.
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            setSearchData((prev: any) => ({
                              ...prev,
                              sportValue: null,
                              branchValue: searchData.branchValue,
                              dayPicked: null,
                              startTime: null,
                              endTime: null,
                              sportOption: null,
                              branchOption: null
                            }));
                            setSelectedDate(null);
                          }}
                          sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                        >
                          Đặt lại tìm kiếm
                        </Button>
                      </Box>
                    )}
                </>
              )}
            </Box>
          </Container>
        </>
      )}

      <TimeSlotSelector
        title="Chọn thời gian thuê sân"
        open={openDialog2}
        setOpenDialog1={setOpenDialog}
        onClose={handleCloseDialog2}
        selectedSlots={selectedSlots}
        setSelectedSlots={setSelectedSlots}
        startSlot={startSlot}
        setStartSlot={setStartSlot}
        bookingData={bookingData}
        setBookingData={setBookingData}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        searchData={searchData}
      />

      <OrderPopUp
        name="email"
        label="Email"
        title="Xác nhận đặt sân"
        open={openDialog}
        setOpen={setOpenDialog}
        onClose={handleClose}
        email={bookingData.email}
        orderInfo={bookingData}
        setBookingData={setBookingData}
        data={dialogData}
        handleConfirmOrder={handleConfirmOrder}
        selectedSlots={selectedSlots}
        setSelectedSlots={setSelectedSlots}
        startSlot={startSlot}
        setStartSlot={setStartSlot}
        handleOpenDialog2={handleOpenDialog2}
        setTempEemail={setTempEemail}
        setSelectedDate={setSelectedDate}
        searchData={searchData}
      />

      <PaymentPopUp
        title="Quét mã thanh toán"
        open={confirmOrder}
        onClose={handleClosePayment}
        bookingData={bookingData}
      />
    </UserLayout>
  );
}

