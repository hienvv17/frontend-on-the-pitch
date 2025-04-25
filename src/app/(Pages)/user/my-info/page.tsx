"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import UserLayout from '@/app/components/UserLayout';
import { CircularProgress, Grid2 as Grid, Paper, TextField, Typography } from '@mui/material';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import PersonIcon from '@mui/icons-material/Person';
import { AppContext } from '@/app/contexts/AppContext';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MyInfo() {
    const router = useRouter();

    const { user } = useContext(AppContext);

    const [userAvatar, setUserAvatar] = useState<string | null>(null);

    useEffect(() => {
        const storedAvatar = localStorage.getItem("userAvatar");

        if (!user) {
            router.push("/"); // Điều hướng về trang chủ nếu không có user
            return;
        }

        if (storedAvatar) {
            setUserAvatar(JSON.parse(storedAvatar));
        }

    }, [user]);



    return (
        <>
            <UserLayout>
                {
                    user === null
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

                        <Box sx={{ height: '100vh', width: '100%' }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    borderRadius: '20px',
                                    width: '100%',
                                    height: '100%', // Phải có để alignItems hoạt động
                                    zIndex: 100,
                                }}
                            >
                                <Paper
                                    elevation={5}
                                    sx={{
                                        width: '90%',          // Hoặc cố định như 600px tuỳ thiết kế
                                        height: '90dvh',
                                    }}
                                >

                                    <Grid
                                        container
                                        direction={"column"}
                                        justifyContent="center"
                                        alignItems="center"
                                    >

                                        <Grid container
                                            direction={"row"}
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            spacing={2}
                                            sx={{
                                                width: '100%',
                                                backgroundColor: "var(--Primary-800)",
                                                padding: "10px 30px",
                                                borderRadius: "8px 8px 0px 0px"
                                            }}
                                        >
                                            <PersonIcon sx={{ color: "var(--Primary-50)" }} />
                                            <Typography color="var(--Primary-50)">Thông tin tài khoản</Typography>
                                        </Grid>

                                        <Grid container
                                            direction={"row"}
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{ height: "350px", }}
                                        >
                                            <Grid container size={4}
                                                alignItems="flex-start"
                                                justifyContent="center"
                                                sx={{ height: "100%" }}
                                            >
                                                <Grid container justifyContent="center" alignItems="center" sx={{ mt: 6 }}>
                                                    <Box
                                                        sx={{
                                                            height: 200,
                                                            width: 200,
                                                            borderRadius: "50%",
                                                            border: "2px dashed var(--Primary-200)",
                                                            overflow: "hidden",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        {userAvatar ? (
                                                            <Box
                                                                sx={{
                                                                    width: 180,
                                                                    height: 180,
                                                                    borderRadius: "50%",
                                                                    overflow: "hidden",
                                                                }}
                                                            >
                                                                <Image
                                                                    src={userAvatar}
                                                                    width={180}
                                                                    height={180}
                                                                    alt="User avatar"
                                                                    style={{
                                                                        objectFit: "cover",
                                                                        width: "100%",
                                                                        height: "100%",
                                                                    }}
                                                                />
                                                            </Box>
                                                        ) : (
                                                            <Typography>avatar</Typography>
                                                        )}
                                                    </Box>
                                                </Grid>
                                            </Grid>




                                            <Grid container direction="column" size={8} sx={{
                                                height: "100%",
                                                // justifyContent: "center",
                                                alignItems: "center",
                                            }}>
                                                <Grid container
                                                    direction={"row"}
                                                    justifyContent="flex-start"
                                                    // alignItems="center"
                                                    spacing={4}
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        // mt: 5,
                                                        px: 6,
                                                        // gap: 2
                                                        // flexGrow: 1
                                                    }}
                                                >
                                                    <Grid
                                                        container
                                                        direction={"row"}
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        sx={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <Grid size={6}>
                                                            <TextField fullWidth label="Họ tên" id="fullName" value={user?.fullName || ''}
                                                                slotProps={{
                                                                    inputLabel: { shrink: true }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid size={6}>
                                                            <TextField fullWidth disabled label="Email" id="email" value={user?.email || ''}
                                                                slotProps={{
                                                                    inputLabel: { shrink: true }
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <TextField fullWidth label="Số điện thoại" id="phoneNumber" value={user?.phoneNumber || ''}
                                                            slotProps={{
                                                                inputLabel: { shrink: true }
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <TextField fullWidth disabled label="Điểm thành viên" id="memberPoint" value={user?.memberPoint || 0}
                                                            slotProps={{
                                                                inputLabel: { shrink: true }
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Box width="95%">
                                            <Divider orientation="horizontal" variant="middle"
                                                sx={{ bgcolor: 'grey.300' }} />
                                        </Box>
                                        <Grid container direction="row" justifyContent={"center"} alignItems={"center"}
                                            sx={{
                                                width: '100%',
                                                mt: 2
                                            }}
                                        >
                                            <Button variant="contained" startIcon={<BorderColorRoundedIcon />}
                                                sx={{ backgroundColor: "var(--Primary-500)" }}
                                            >
                                                Cập nhật
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </Paper>
                            </Grid>
                        </Box>
                }
            </UserLayout>


        </>
    );
}
