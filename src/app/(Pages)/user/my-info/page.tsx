"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import UserLayout from '@/app/components/UserLayout';
import { CircularProgress, Grid2 as Grid, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import PersonIcon from '@mui/icons-material/Person';
import { AppContext } from '@/app/contexts/AppContext';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useUserApiPrivate } from '@/api/user/user';
import { UserInfo } from '@/types/UserType';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { msgDetail, ROUTES } from '@/utility/constant';


export default function MyInfo() {

    const { user, setOpenSnackBar } = useContext(AppContext);

    const [userInfo, setUserInfo] = useState<UserInfo>({
        fullName: '',
        phoneNumber: '',
        image: '',
        email: '',
    });

    // const [updateData, setUpdateData] = useState<UserUpdateData>({
    //     fullName: '',
    //     phoneNumber: '',
    //     image: '',
    // })

    const { GET_P } = useUserApiPrivate();

    useEffect(() => {
        const getData = async () => {
            const data = await GET_P(ROUTES.USERS + "/profile");
            console.log('data', data.user);
            setUserInfo(data.user);
        };
        if (user)
            getData();
    }, []);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const maxSize = 2000 * 1024;
            if (file.size > maxSize) {
                setOpenSnackBar({ isOpen: true, msg: msgDetail[7], type: 'error' });
                return;
            }

            setOpenSnackBar({ isOpen: false, msg: msgDetail[7], type: 'error' });

            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string); // base64 string
                setUserInfo(prev => ({
                    ...prev,
                    image: reader.result as string
                }))
            };
            reader.readAsDataURL(file);


            setSelectedFile(file);
        }
    }

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setUserInfo(prev => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    const handleSave = async () => {
        //TODO: gửi thông tin dạng json
        console.log("SAVE");
        console.log("selectedFile", selectedFile);
        console.log("avatar", avatar);

        const formData = new FormData();
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        formData.append('fullName', userInfo.fullName)
        formData.append('phoneNumber', userInfo.phoneNumber);

        formData.forEach((value, key) => {
            console.log(key, value);
        });
    };

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

                        <Box sx={{ height: 'fit-content', width: '100%', my: "40px" }}>
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
                                        borderRadius: "8px"
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
                                                padding: "15px 30px",
                                                borderRadius: "8px 8px 0px 0px",
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
                                                    {/* <Box
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
                                                    </Box> */}
                                                    <Box
                                                        display="flex"
                                                        flexDirection="column"
                                                        alignItems="center"
                                                        width="100%"
                                                        // height="340px"
                                                        border="1px solid #eaeaea"
                                                        borderRadius="10px"
                                                    >
                                                        <Box
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            border="1px dashed grey"
                                                            borderRadius="100%"
                                                            width={180}
                                                            height={180}
                                                        // marginTop="20px"
                                                        >
                                                            <Box
                                                                display="flex"
                                                                flexDirection="column"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                                bgcolor={userInfo.image ? 'transparent' : "#f4f6f8"}
                                                                borderRadius="100%"
                                                                padding="10px"
                                                                width={160}
                                                                height={160}
                                                            >
                                                                {userInfo.image ? (
                                                                    <Box sx={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        position: 'relative',
                                                                        border: '1px solid grey',
                                                                        borderRadius: '100%',
                                                                        overflow: 'hidden' // Thêm thuộc tính này để ẩn phần thừa của ảnh
                                                                    }}>
                                                                        <Image
                                                                            src={userInfo.image}
                                                                            // width={50}
                                                                            // height={50}
                                                                            placeholder='empty'
                                                                            style={{
                                                                                width: '100%',
                                                                                // height: 'auto',
                                                                                // objectFit: 'scale-down'
                                                                            }}
                                                                            alt="avatar"
                                                                            priority={false}
                                                                            layout='fill'
                                                                            objectFit='cover'
                                                                        />

                                                                        <Box
                                                                            sx={{
                                                                                position: 'absolute',
                                                                                top: 0,
                                                                                left: 0,
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                bgcolor: 'rgba(0, 0, 0, 0.7)',  // Nền đen mờ để làm nổi bật nội dung trên ảnh
                                                                                color: 'white',  // Màu chữ trắng để tương phản với nền
                                                                                opacity: 0,      // Bắt đầu với opacity = 0 để ẩn nội dung
                                                                                '&:hover': {
                                                                                    opacity: 1,  // Hiển thị nội dung khi di chuột qua
                                                                                }
                                                                            }}
                                                                        >
                                                                            <input
                                                                                accept="image/*"
                                                                                style={{ display: 'none' }}
                                                                                id="change-avatar"
                                                                                type="file"
                                                                                onChange={handleFileChange}
                                                                            />
                                                                            <Tooltip title="Change avatar" placement="top">
                                                                                <label htmlFor="change-avatar">
                                                                                    <IconButton component="span">
                                                                                        <AddAPhotoIcon sx={{ fontSize: 25, color: 'white' }} />
                                                                                    </IconButton>
                                                                                </label>
                                                                            </Tooltip>
                                                                            <Typography align="center" sx={{ fontSize: '14px', color: '#FFFFFF' }}>
                                                                                Change Avatar
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                ) : (
                                                                    <>
                                                                        <input
                                                                            accept="image/*"
                                                                            style={{ display: 'none' }}
                                                                            id="upload-avatar"
                                                                            type="file"
                                                                            onChange={handleFileChange}
                                                                        />
                                                                        <Tooltip title="Add avatar" placement="top">
                                                                            <label htmlFor="upload-avatar">
                                                                                <IconButton component="span">
                                                                                    <AddAPhotoIcon sx={{ fontSize: 25 }} />
                                                                                </IconButton>
                                                                            </label>
                                                                        </Tooltip>
                                                                        <Typography align="center" sx={{ fontSize: '14px', color: '#72808d' }}>
                                                                            Upload Avatar
                                                                        </Typography>
                                                                    </>
                                                                )}
                                                            </Box>
                                                        </Box>
                                                        <Typography align="center" sx={{ marginTop: '20px', fontSize: '14px', color: '#72808d' }}>
                                                            *.jpeg, *.jpg, *.png.
                                                            <br />
                                                            Maximum 2 MB
                                                        </Typography>
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
                                                            <TextField fullWidth label="Họ tên" name="fullName" value={userInfo?.fullName || ''}
                                                                onChange={e => setUserInfo(prev => ({
                                                                    ...prev,
                                                                    fullName: e.target.value
                                                                }))}
                                                                slotProps={{
                                                                    inputLabel: { shrink: true }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid size={6}>
                                                            <TextField fullWidth disabled label="Email" name="email" value={userInfo?.email || ''}
                                                                slotProps={{
                                                                    inputLabel: { shrink: true }
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <TextField
                                                            fullWidth
                                                            label="Số điện thoại"
                                                            name="phoneNumber"
                                                            value={userInfo?.phoneNumber || ''}
                                                            onChange={(e) => setUserInfo((prev) => ({
                                                                ...prev, phoneNumber: e.target.value
                                                            }))}
                                                            slotProps={{
                                                                inputLabel: { shrink: true }
                                                            }}
                                                        />
                                                    </Grid>
                                                    {/* {
                                                        userInfo?.memberPoint &&
                                                    <Grid size={6}>
                                                        <TextField fullWidth disabled label="Điểm thành viên" id="memberPoint" value={userInfo?.memberPoint || 0}
                                                            slotProps={{
                                                                inputLabel: { shrink: true }
                                                            }}
                                                            />
                                                    </Grid>
                                                        } */}
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
                                            <Button variant="outlined" startIcon={<BorderColorRoundedIcon />}
                                                // sx={{ backgroundColor: "var(--Primary-500)" }}
                                                onClick={handleSave}
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
