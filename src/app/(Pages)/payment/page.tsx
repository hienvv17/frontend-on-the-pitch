"use client"

import React, { useContext } from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Paper,
    Card,
    Grid2,
    Chip,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UserLayout from '@/app/components/UserLayout';
import { AppContext } from '@/app/contexts/AppContext';
import { formatPrice } from '@/utility/formatPrice';
import moment from 'moment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InfoIcon from '@mui/icons-material/Info';
import PaymentIcon from '@mui/icons-material/Payment';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import TodayIcon from '@mui/icons-material/Today';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';


export default function PaymentDonePage() {

    const { orderInfo } = useContext(AppContext);
    console.log("orderInfo", orderInfo);
    return (
        <UserLayout>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid",
                        borderColor: "divider",
                        mb: 4,
                    }}
                >
                    {/* Header with background */}
                    <Box
                        sx={{
                            position: "relative",
                            height: { xs: 20, md: 50 },
                            bgcolor: "var(--Primary-500)",
                            backgroundImage:
                                "linear-gradient(135deg, var(--Primary-600) 0%, var(--Primary-400) 100%)",
                            display: "flex",
                            alignItems: "center",
                            px: 3,
                            py: 2,
                        }}
                    >
                        <Typography variant="h5" fontWeight={700} color="white">
                            Thông tin đặt sân
                        </Typography>
                    </Box>

                    <Container sx={{ py: 4 }}>
                        <Typography variant="body1" align="center" sx={{ mb: 4, color: 'var(--Primary-700)' }}>
                            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi, dưới đây là thông tin đặt sân của bạn.
                        </Typography>

                        <Grid container spacing={4}>
                            {/* Contact Info */}
                            <Grid item xs={12} md={12} sx={{ height: "fit-content" }}>
                                <Paper elevation={3} sx={{ p: 3, py: 2, height: '100%', bgcolor: 'background.paper' }}>
                                    <Grid2 container direction="column" sx={{ gap: 2, height: "100%" }}>
                                        <Grid2 container direction="column" sx={{ gap: 2, justifyContent: "space-between", }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1, width: "100%" }}>
                                                <ReceiptIcon color="primary" sx={{ mr: 1 }} />
                                                <Grid2 container spacing={1} sx={{ justifyItems: "center", width: "100%" }}>
                                                    <Grid2 size={{ xs: 12, sm: 2 }}>
                                                        <Typography variant="body1" noWrap>
                                                            <strong>Mã đặt sân:</strong>
                                                        </Typography>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 10 }}>
                                                        <Typography>
                                                            {orderInfo.code}
                                                        </Typography>
                                                    </Grid2>
                                                </Grid2>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                                <InfoIcon color="primary" sx={{ mr: 1 }} />
                                                <Grid2 container spacing={1} sx={{ justifyItems: "center", width: "100%" }}>
                                                    <Grid2 size={{ xs: 12, sm: 2 }}>
                                                        <Typography variant="body1" noWrap>
                                                            <strong>Trạng thái:</strong>
                                                        </Typography>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 10 }}>
                                                        <Chip label={orderInfo.status} color="primary" variant="filled" sx={{ ml: 2 }} />
                                                    </Grid2>
                                                </Grid2>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                                <PaymentIcon color="primary" sx={{ mr: 1 }} />
                                                <Grid2 container spacing={1} sx={{ justifyItems: "center", width: "100%" }}>
                                                    <Grid2 size={{ xs: 12, sm: 2 }}>
                                                        <Typography variant="body1">
                                                            <strong>Tổng cộng:</strong>
                                                        </Typography>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 10 }}>
                                                        <Typography>
                                                            {formatPrice(orderInfo.totalPrice)}
                                                        </Typography>
                                                    </Grid2>
                                                </Grid2>
                                            </Box>

                                            {/* <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                                <SportsScoreIcon color="primary" sx={{ mr: 1 }} />
                                                <Grid2 container spacing={1} sx={{ justifyItems: "center", width: "100%" }}>
                                                    <Grid2 size={{ xs: 12, sm: 2 }}>
                                                        <Typography variant="body1" noWrap>
                                                            <strong>Sân:</strong>
                                                        </Typography>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 10 }}>
                                                        <Typography>
                                                            { }
                                                        </Typography>
                                                    </Grid2>
                                                </Grid2>
                                            </Box> */}

                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1, width: "100%" }}>
                                                <TodayIcon color="primary" sx={{ mr: 1 }} />
                                                <Grid2 container spacing={1} sx={{ justifyItems: "center", width: "100%" }}>
                                                    <Grid2 size={{ xs: 12, sm: 2 }}>
                                                        <Typography variant="body1" noWrap>
                                                            <strong>Ngày:</strong>
                                                        </Typography>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 10 }}>
                                                        <Typography>
                                                            {moment(orderInfo.bookingDate).format("DD/MM/YYYY")}
                                                        </Typography>
                                                    </Grid2>
                                                </Grid2>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1, width: "100%" }}>
                                                <AccessAlarmsIcon color="primary" sx={{ mr: 1 }} />
                                                <Grid2 container spacing={1} sx={{ justifyItems: "center", width: "100%" }}>
                                                    <Grid2 size={{ xs: 12, sm: 2 }}>
                                                        <Typography variant="body1">
                                                            <strong>Giờ:</strong>
                                                        </Typography>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 10 }}>
                                                        <Typography>
                                                            {orderInfo.startTime} - {orderInfo.endTime}
                                                        </Typography>
                                                    </Grid2>
                                                </Grid2>
                                            </Box>

                                            {/* <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1, width: "100%" }}>
                                                <LocalConvenienceStoreIcon color="primary" sx={{ mr: 1 }} />
                                                <Grid2 container spacing={1} sx={{ justifyItems: "center", width: "100%" }}>
                                                    <Grid2 size={{ xs: 12, sm: 2 }}>
                                                        <Typography variant="body1" noWrap>
                                                            <strong>Cụm sân:</strong>
                                                        </Typography>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 10 }}>
                                                        <Typography>

                                                        </Typography>
                                                    </Grid2>
                                                </Grid2>
                                            </Box> */}

                                            {/* <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1, width: "100%" }}>
                                                <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                                                <Grid2 container spacing={1} sx={{ justifyItems: "center", width: "100%" }}>
                                                    <Grid2 size={{ xs: 12, sm: 2 }}>
                                                        <Typography variant="body1" noWrap>
                                                            <strong>Địa chỉ:</strong>
                                                        </Typography>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 10 }}>
                                                        <Typography>

                                                        </Typography>
                                                    </Grid2>
                                                </Grid2>
                                            </Box> */}
                                        </Grid2>
                                    </Grid2>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Card>
            </Container >
        </UserLayout >
    );
}
