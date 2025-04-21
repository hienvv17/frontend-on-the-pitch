"use client";

import { Stack, Button, Icon, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import Cookies from "js-cookie";
import { useAuthApi } from "@/api/auth/auth";
import { getRedirectResult } from "firebase/auth";
import { auth } from "@/firebaseConfig/firebaseConfig";
import GoogleLogin from "./firebase/popup-login";
import { ACCESS_TOKEN } from "@/utility/constant";



export default function GoogleLoginBtn() {
    const router = useRouter();

    const { isChange, user, setUser, handleLogout } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);

    const { POST_LOGIN } = useAuthApi();

    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // <600px

    const svgIcon = (
        <Icon
            sx={{
                width: "fit-content",
                height: "fit-content",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "white",
                borderRadius: "6px 0 0 6px",
                p: "20%",
                ml: -1.2,
            }}
        >
            <img alt="googleIcon" src="/icon/googleIcon.svg" />
        </Icon>
    );

    // Hàm kích hoạt đăng nhập Google

    //version 1: sử dụng api local
    // const login = useGoogleLogin({
    //     onSuccess: async (response) => {
    //         const res = await fetch("/api/auth/google", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ credential: response.access_token }),
    //         });

    //         const data = await res.json();
    //         if (res.ok) {
    //             // window.location.reload();
    //             setUser(data.user);
    //             console.log("Login successful", data);
    //         } else {
    //             console.error("Login failed", data);
    //         }
    //     },
    //     onError: () => console.log("Login failed"),
    //     scope: "openid email profile",
    // });


    //version 2: sử dụng api đã deploy
    //! không hoạt động trên di động vì trình duyệt chặn pop-up

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const data = await GoogleLogin();

            const idToken = await data?.user.getIdToken();
            if (!idToken) {
                setIsLoading(false);
                console.log("Google login failed");
                return;
            }
            console.log("idToken", idToken);
            const response = await POST_LOGIN(idToken);

            if (response.error) {
                console.log("You are not authorized to access this page", response.error);
                return;
            }
            Cookies.set(ACCESS_TOKEN, idToken);
            //   setUser({ email: response.staff.email, role: response.staff.role });

            localStorage.setItem("userAvatar", JSON.stringify(data?.user.photoURL));
            setUser(response.user);
            window.location.reload();
        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="contained"
                // startIcon={svgIcon}
                onClick={handleLogin}
                disabled={isLoading}
                sx={{
                    // position: "absolute",
                    // top: "auto",
                    // right: 0,
                    // zIndex: 99,
                    textTransform: "none",
                    background: "var(--Primary-50)",
                    height: "46px",
                    gap: "10px",
                    borderRadius: "8px",
                    minWidth: { xs: "60px", sm: "246px" }, // 👈 Đảm bảo giữ nguyên kích thước ngay cả khi có spinner
                    display: "inline-flex",
                    justifyContent: "center",
                    p: "6px",
                    ":hover": {
                        boxShadow: "0 0 1px 2px var(--Primary-500)",
                    },
                    ":active": { background: "var(--Primary-50)" },
                }}
            >
                {!isLoading ?
                    <>
                        <Icon
                            sx={{
                                width: "fit-content",
                                height: "fit-content",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "transparent",
                                borderRadius: "6px",
                                // border: "var(--Primary-600) solid 1px",
                                // p: "8px",
                                scale: 0.8,
                                // ml: -1.2,
                            }}
                        >
                            <img alt="googleIcon" src="/icon/googleIcon.svg" />
                        </Icon>
                        {!isSmallScreen &&
                            <>
                                <Typography sx={{ visibility: isLoading ? "hidden" : "visible", color: "var(--Primary-900)" }}>
                                    Đăng nhập với Google
                                </Typography>
                            </>
                        }
                    </>
                    :
                    <CircularProgress
                        size={24}
                        color="inherit"
                        sx={{ position: "absolute" }}
                    />
                }
            </Button>

        </Stack>
    );
}
