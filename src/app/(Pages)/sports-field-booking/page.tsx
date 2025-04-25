'use client';

import { Typography, Button, Container, Box, Divider, Stack, CircularProgress, Grid2 } from "@mui/material";
import Grid from '@mui/material/Grid2';
import SearchIcon from "@mui/icons-material/Search";
import UserLayout from "@/app/components/UserLayout";
import { Key, useContext, useEffect, useState } from "react";
import DatePickerValue from "@/app/components/DatePicker";
import SportCard from "@/app/components/SportCard";
import SelectBox from "@/app/components/SelectBox";
import moment from 'moment';
import TimePickerValue from "@/app/components/TimePicker";
import { useBookingApi } from "@/api/booking/booking";
import { msgDetail, ROUTES } from "@/utility/constant";
import { formatTime } from "@/utility/formatTime";
import { SportField } from "@/types/filedSearching";
import { AppContext } from "@/app/contexts/AppContext";



export default function SportsFieldBooking() {

    const { setOpenSnackBar } = useContext(AppContext);

    // const data = demoData;                          //gọi API => data từ backend trả về
    const [data, setData] = useState<SportField[]>([]);

    const { GET_OPTIONS, POST_SEARCH_FIELDS } = useBookingApi();

    const [isLoading, setIsLoading] = useState(true);

    const [isSearchDone, setIsSearchDone] = useState(false);

    const [isSearchDisable, setIsSearchDisable] = useState(false);

    const [searchData, setSearchData] = useState<{
        sportValue: string | null;
        branchValue: string | null;
        dayPicked: moment.Moment | string;
        startTime: moment.Moment | null;
        endTime: moment.Moment | null;
    }>({
        sportValue: null,
        branchValue: null,
        dayPicked: "",
        startTime: null,
        endTime: null,
    });

    const [resData, setResData] = useState({
        branchs: [],
        sportFields: [],
        raw: {
            branchs: {},
            sportFields: {},
        }
    });

    // fix hydrate
    useEffect(() => {
        setSearchData(prev => ({
            ...prev,
            dayPicked: moment(),
        }))
    }, []);

    useEffect(() => {
        setData([]);
        const isAvailable = (moment(searchData.dayPicked).date() === (moment().date())) && (moment().hour() >= 22);
        if (isAvailable) {
            setIsSearchDisable(true);
            setOpenSnackBar({ isOpen: true, msg: msgDetail[6], type: 'error' });
            return;
        }
        setIsSearchDisable(false);
        setOpenSnackBar({ isOpen: false, msg: '', type: 'info' });
    }, [searchData.dayPicked])

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
                })
                const reformattedData2 = sportCatRes.items.map((data: any) => {
                    return {
                        value: data.id,
                        label: data.name,
                    };
                })
                setResData({
                    branchs: reformattedData,
                    sportFields: reformattedData2,
                    raw: {
                        branchs: branchRes.items,
                        sportFields: sportCatRes.items
                    }
                });
            } catch (err) {
                console.log("Lỗi khi gọi API: ", err);
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, []);


    const handleStartTimeChange = (e: moment.Moment) => {
        // console.log("e", e)
        setSearchData((prev) => ({
            ...prev,
            startTime: e ? moment(e, "HH:mm") : null,
            endTime: null
        }));

    };

    const handleEndTimeChange = (e: moment.Moment) => {
        // console.log("e", e)
        setSearchData((prev) => ({
            ...prev,
            endTime: e ? moment(e, "HH:mm") : null,
        }));

    };

    const handleSelectChange = (e: any, name: string) => {
        // console.log("e", e)
        setSearchData((prev) => ({
            ...prev,
            [name]: e ? e.value : e,
        }));
    };

    const handleDateChange = (e: any) => {
        setSearchData((prev) => ({
            ...prev,
            dayPicked: moment(e, "YYYY-MM-DD"),
            startTime: null,
            endTime: null
        }));
    }

    const searchSubmit = async () => {


        //TODO: xử lý dữ liệu trước khi gọi API
        const requestBody = {
            sportCategoryId: Number(searchData.sportValue),
            branchId: Number(searchData.branchValue),
            date: moment(searchData.dayPicked).format("YYYY-MM-DD"),
            startTime: formatTime(searchData.startTime) as string,
            endTime: formatTime(searchData.endTime) as string,
        }
        console.log("searchData", searchData);
        console.log("requestBody", requestBody);

        if (requestBody.sportCategoryId === 0) {
            setOpenSnackBar({ isOpen: true, msg: msgDetail[0], type: 'error' });
            setData([]);
            return;
        }

        if (requestBody.branchId === 0) {
            setOpenSnackBar({ isOpen: true, msg: msgDetail[1], type: 'error' });
            setData([]);
            return;
        }
        if (requestBody.endTime > "23:00") {
            setOpenSnackBar({ isOpen: true, msg: msgDetail[5], type: 'error' });
            setIsSearchDisable(true);
            return;
        }
        if (searchData.startTime === null) {
            if (searchData.endTime !== null) {
                setOpenSnackBar({ isOpen: true, msg: msgDetail[4], type: 'error' });
                setIsSearchDisable(true);
                return;
            }

        } else {
            if (searchData.endTime !== null) {
                const isValidDuration = searchData.endTime.diff(searchData.startTime, "minutes") >= 60;
                // console.log("isValidDuration", isValidDuration);
                if (!isValidDuration) {
                    setOpenSnackBar({ isOpen: true, msg: msgDetail[3], type: 'error' });
                    return;
                }
                setOpenSnackBar({ isOpen: false, msg: '', type: 'error', duration: 100 });
            }
        };

        setOpenSnackBar(prev => ({ ...prev, isOpen: false, msg: '', type: 'info' }));

        //TODO: gọi API để gửi dữ liệu tới back-end
        setIsSearchDone(true);
        setIsSearchDisable(true);

        try {

            const response = await POST_SEARCH_FIELDS(ROUTES.SPORT_FIELDS + '/available', requestBody)
            console.log("response", response);
            if (response.status === 201) {
                setData(response.data.items);
                setOpenSnackBar({ isOpen: true, msg: msgDetail[2], type: 'info' });
                return;
            }
            setOpenSnackBar({ isOpen: true, msg: `Error2: ${response.data.message}`, type: 'error' });
        } catch (error) {
            const message = error || 'Unidentified';
            setOpenSnackBar({ isOpen: true, msg: `Error1: ${message}`, type: 'error' });
            setData([]);
        } finally {
            setIsSearchDone(false);
            setIsSearchDisable(false);
        }
    }

    const [timePickerErrorNum, setTimePickerErrorNum] = useState(0);

    useEffect(() => {
        if (timePickerErrorNum > 0) {
            setIsSearchDisable(true);
        } else
            setIsSearchDisable(false);
    }, [timePickerErrorNum])

    const handleTimeError = (e: any, name: string) => {
        // console.log('e', e);
        setData([]);
        if (name === "startTime") {
            setOpenSnackBar(e
                ? { isOpen: true, msg: msgDetail[4], type: 'error' }
                : { isOpen: false, msg: msgDetail[4], type: 'error' });
        }
        if (name === "endTime") {
            setOpenSnackBar(e
                ? { isOpen: true, msg: msgDetail[5], type: 'error' }
                : { isOpen: false, msg: msgDetail[5], type: 'error' });
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


    return (
        <>
            <UserLayout>

                {
                    isLoading
                        ?
                        <Grid container direction="row" spacing={5} sx={{ mt: 10, height: "100vh", justifyContent: "center", display: "flex" }}>
                            <Grid>
                                <CircularProgress
                                    size={"5vw"}
                                    color="primary"
                                    sx={{ position: "absolute", }}
                                />
                            </Grid>
                            {/* <Grid sx={{ height: "auto" }}>
                            <Typography textAlign={"center"}>Loading...</Typography>
                        </Grid> */}
                        </Grid>
                        :

                        <>
                            <Box sx={{
                                position: "relative",
                                p: "1em",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: 10,
                                backgroundImage: "url('/image/image_11.png')", // Đường dẫn ảnh
                                backgroundSize: "cover", // Tỷ lệ ảnh
                                backgroundRepeat: "no-repeat", // Không lặp lại ảnh
                                backgroundPosition: "center", // Căn giữa ảnh
                                aspectRatio: 1920 / 500,
                                zIndex: 1,
                            }}>
                            </Box>

                            <Grid2 container direction={"row"} sx={{
                                borderRadius: "20px",
                                height: "fit-content",
                                justifyContent: "center",
                                width: "100%",
                                zIndex: 100,
                                mt: { xs: "-10vh", sm: "-20vh", md: "-25vh", lg: "-35vh", xl: "-21%" },
                            }}>
                                <Box sx={{
                                    width: "fit-content",
                                    background: { xs: "none", sm: "white" },
                                    borderRadius: "inherit",
                                }}>
                                    <Container sx={{
                                        width: "95vw",
                                        // mt: { xs: "-10vh", sm: "-20vh", md: "-25vh", lg: "-35vh" },
                                        mb: "30px",
                                        border: "2px solid var(--Primary-200)",
                                        position: "relative",
                                        zIndex: 99,
                                        backgroundColor: "var(--Primary-50)",
                                        borderRadius: "20px",
                                        boxShadow: "0px 5px 5.8px 0px rgba(0, 0, 0, 0.10)",
                                        py: { xs: "16px", sm: "24px" },
                                        gap: "60px"
                                    }}>
                                        <Grid container direction="row" spacing={4} alignItems="center" justifyContent="center">
                                            <Grid container direction="column" spacing={2} sx={{ width: "100%" }}>
                                                <Grid >
                                                    <Typography variant="h5" sx={{
                                                        fontWeight: 700,
                                                        lineHeight: "normal",
                                                        color: "var(--Primary-500)",
                                                    }}>
                                                        Đặt sân thể thao
                                                    </Typography>
                                                </Grid>
                                                <Typography sx={{
                                                    lineHeight: "normal",
                                                    width: "inherit"
                                                }}>
                                                    Hãy chọn lịch của bạn
                                                </Typography>
                                            </Grid>

                                            <Grid container direction="row" sx={{ justifyContent: "center", width: "100%" }}>
                                                <Grid container direction="row" columns={24} sx={{ justifyContent: "space-evenly", width: "100%" }}>
                                                    <Grid size={{ xs: 24, md: 7 }}>
                                                        <SelectBox
                                                            icon="SportsSoccer"
                                                            title="Chọn môn thể thao"
                                                            name="sportId"
                                                            options={resData.sportFields}
                                                            // value={searchData.sportValue}
                                                            onChange={(e: any) => handleSelectChange(e, "sportValue")}
                                                        />
                                                    </Grid>
                                                    <Grid size={{ xs: 24, md: 6 }} sx={{ width: "100%" }}>
                                                        <SelectBox
                                                            icon="Room"
                                                            title="Chọn cụm sân"
                                                            name="sportBranchId"
                                                            options={resData.branchs}
                                                            // value={searchData.branchValue}
                                                            onChange={(e: any) => handleSelectChange(e, "branchValue")}
                                                        />
                                                    </Grid>
                                                    <Grid size={{ xs: 24, md: 4 }}>
                                                        <DatePickerValue
                                                            label="Chọn ngày"
                                                            name="dayPicked"
                                                            onChange={handleDateChange}
                                                        // value={searchData.dayPicked}
                                                        />
                                                    </Grid>
                                                    <Grid container direction="row" size={{ xs: 24, md: 7 }}>
                                                        <Grid size={{ xs: 12, md: 12 }}>
                                                            {/* <TextField fullWidth
                                            label="Bắt đầu"
                                            type="time"
                                            name="startTime"
                                            slotProps={{ inputLabel: { shrink: true } }}
                                            onChange={handleSearchChange}
                                        /> */}
                                                            <TimePickerValue
                                                                label="Giờ vào sân"
                                                                name="startTime"
                                                                onChange={handleStartTimeChange}
                                                                maxHour={22}
                                                                selectedDate={searchData.dayPicked}
                                                                value={searchData.startTime}
                                                                value2={searchData}
                                                                onError={(e: any) => handleTimeError(e, "startTime")}
                                                            // slotProps={{ inputLabel: { shrink: true } }}
                                                            />
                                                        </Grid>
                                                        <Grid size={{ xs: 12, md: 12 }}>
                                                            <TimePickerValue
                                                                label="Giờ trả sân"
                                                                name="endTime"
                                                                onChange={handleEndTimeChange}
                                                                maxHour={23}
                                                                selectedDate={searchData.dayPicked}
                                                                value={searchData.endTime}
                                                                value2={searchData}
                                                                onError={(e: any) => handleTimeError(e, "endTime")}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid container size={{ xs: 24, sm: 6, md: 4 }} sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Button variant="contained"
                                                        startIcon={<SearchIcon />}
                                                        fullWidth
                                                        disabled={isSearchDisable}
                                                        size="large"
                                                        sx={{ background: "var(--Primary-500)", height: "46px", }}
                                                        onClick={searchSubmit}
                                                    >
                                                        Tìm kiếm
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Container>


                                    <Container sx={{ px: "1px", boxSizing: "border-box", mb: 10, minHeight: "370px", zIndex: 99 }}>
                                        {isSearchDone ?
                                            <Grid container direction="row" spacing={5} sx={{ mt: 10, minHeight: "25vh", justifyContent: "center", display: "flex" }}>
                                                <Grid>
                                                    <CircularProgress
                                                        size={"5vw"}
                                                        color="primary"
                                                        sx={{ position: "absolute", }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            : <>


                                                <Grid container
                                                    direction={'row'}
                                                    justifyContent="flex-start"
                                                    sx={{
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mb: 2,
                                                    }}
                                                >
                                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "100%", mx: 3, }}>
                                                        <Divider sx={{ flexGrow: 1 }} />
                                                        {
                                                            data
                                                                ? <Typography variant="body1"> Có <b>{data.length.toString().padStart(2, '0')}</b> sân thỏa tìm kiếm</Typography>
                                                                : <Typography variant="body1">Không có sân trống</Typography>
                                                        }
                                                        <Divider sx={{ flexGrow: 1 }} />
                                                    </Stack>
                                                </Grid>
                                                {

                                                    <Grid
                                                        container
                                                        direction="row"
                                                        rowSpacing={{ xs: 3, sm: 5, md: 5 }}
                                                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                                        justifyContent="start"
                                                    >
                                                        {data && data.map((field: SportField, index: Key) => (
                                                            <Grid size={{ xs: 12 / 2, sm: 12 / 3, md: 12 / 4, lg: 12 / 5 }} key={index} sx={{ display: "flex", justifyContent: "center" }}>
                                                                <SportCard data={field} branchInfo={resData.raw.branchs} />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                }
                                            </>
                                        }
                                    </Container>
                                </Box>
                            </Grid2>
                        </>
                }
            </UserLayout >
        </>
    );
}
