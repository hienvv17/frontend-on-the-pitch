'use client';

import { Typography, Button, Container, Box, TextField, Divider, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';
import SearchIcon from "@mui/icons-material/Search";
import UserLayout from "@/app/components/UserLayout";
import { useState } from "react";
import DatePickerValue from "@/app/components/DatePicker";
import SportCard from "@/app/components/SportCard";
import * as demoData from "@/utility/demoData";
import SelectBox from "@/app/components/SelectBox";
import dayjs from 'dayjs';



export default function SportsFieldBooking() {
    const data = demoData;                          //gọi API => data từ backend trả về

    const [searchData, setSearchData] = useState({
        sportName: '',
        sportBranch: '',
        dayPicked: dayjs().format('DD/MM/YYYY'),
        startTime: '',
        endTime: '',
    });

    const handleSearchChange = (e: any) => {
        setSearchData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSelectChange = (e: any, name: string) => {
        setSearchData((prev) => ({
            ...prev,
            [name]: e?.value || "",
        }));
    };

    const handleDateChange = (e: any) => {
        setSearchData((prev) => ({
            ...prev,
            dayPicked: e?.format('DD/MM/YYYY'),
        }));
    }

    const searchSubmit = () => {
        console.log("searchData", searchData);
        //TODO: gọi API để gửi dữ liệu tới back-end

    }


    return (
        <>
            <UserLayout>
                {/* Banner */}
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
                }}>
                </Box>

                {/* Form tìm kiếm */}
                <Container sx={{
                    width: "95vw",
                    mt: "-10%",
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
                                    Đặt sân thể thao ngay
                                </Typography>
                            </Grid>
                            <Typography sx={{
                                lineHeight: "normal",
                                width: "inherit"
                            }}>
                                Tìm kiếm sân dễ dàng, đặt lịch nhanh chóng
                            </Typography>
                        </Grid>

                        <Grid container direction="row" sx={{ justifyContent: "center", width: "100%" }}>
                            <Grid container direction="row" columns={24} sx={{ justifyContent: "space-evenly", width: "100%" }}>
                                <Grid size={{ xs: 24, md: 7 }}>
                                    <SelectBox
                                        icon="SportsSoccer"
                                        title="Chọn môn thể thao"
                                        name="sportName"
                                        options={data.sportName}
                                        onChange={(e: any) => handleSelectChange(e, "sportName")}
                                    />
                                </Grid>
                                <Grid size={{ xs: 24, md: 6 }} sx={{ width: "100%" }}>
                                    <SelectBox
                                        icon="Room"
                                        title="Chọn cụm sân"
                                        name="sportBranch"
                                        options={data.sportBranch}
                                        onChange={(e: any) => handleSelectChange(e, "sportBranch")}
                                    />
                                </Grid>
                                <Grid size={{ xs: 24, md: 4 }}>
                                    <DatePickerValue
                                        label="Chọn ngày"
                                        name="dayPicked"
                                        onChange={handleDateChange}
                                        value={searchData.dayPicked}
                                    />
                                </Grid>
                                <Grid container direction="row" size={{ xs: 24, md: 7 }}>
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <TextField fullWidth
                                            label="Bắt đầu"
                                            type="time"
                                            name="startTime"
                                            slotProps={{ inputLabel: { shrink: true } }}
                                            onChange={handleSearchChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <TextField
                                            fullWidth
                                            label="Trả sân"
                                            type="time"
                                            name="endTime"
                                            slotProps={{ inputLabel: { shrink: true } }}
                                            onChange={handleSearchChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container size={{ xs: 24, sm: 6, md: 4 }} sx={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="contained"
                                    startIcon={<SearchIcon />}
                                    fullWidth
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

                {/* render danh sách sân từ data */}
                <Container sx={{ px: "1px", boxSizing: "border-box", mb: 10 }}>
                    <Grid container
                        direction={'row'}
                        justifyContent={"center"}
                        sx={{
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "100%", mx: 3 }}>
                            <Divider sx={{ flexGrow: 1 }} />
                            {
                                data.stadiumList.soccer.fields.length > 0
                                    ? <Typography variant="body1"> Có <b>{data.stadiumList.soccer.fields.length.toString().padStart(2, '0')}</b> sân thỏa tìm kiếm</Typography>
                                    : <Typography variant="body1">Không có sân trống</Typography>
                            }
                            <Divider sx={{ flexGrow: 1 }} />
                        </Stack>
                    </Grid>
                    {
                        data.stadiumList.soccer.fields.length > 0 &&
                        <Grid
                            container
                            direction="row"
                            rowSpacing={{ xs: 3, sm: 5, md: 5 }}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            justifyContent="start"
                        >
                            {data.stadiumList.soccer.fields.map((stadium, index) => (
                                <Grid size={{ xs: 12 / 2, sm: 12 / 3, md: 12 / 4, lg: 12 / 5 }} key={index} sx={{ display: "flex", justifyContent: "center" }}>
                                    <SportCard data={stadium} />
                                </Grid>
                            ))}
                        </Grid>
                    }
                </Container>
            </UserLayout >
        </>
    );
}
