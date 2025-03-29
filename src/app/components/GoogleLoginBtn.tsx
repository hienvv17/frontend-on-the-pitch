"use client";

import { Stack, Button, Icon, CircularProgress, Typography } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import GoogleLogin from "./firebase/popup-login";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, ROUTES } from "@/utility/constant";
import { useAuthApi } from "@/api/auth/auth";

export default function GoogleLoginBtn() {
    const router = useRouter();

    const { isChange, user, setUser, handleLogout } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);

    const { POST_LOGIN } = useAuthApi();

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

    //version 1:
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


    //version 2:
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
            const response = await POST_LOGIN(idToken);
            if (response.error) {
                console.log("You are not authorized to access this page", response.error);
                return;
            }
            Cookies.set(ACCESS_TOKEN, idToken);
            //   setUser({ email: response.staff.email, role: response.staff.role });
            console.log("response", response);
            setUser(response.user);
            router.refresh();
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
                startIcon={svgIcon}
                onClick={handleLogin}
                disabled={isLoading}
                sx={{
                    textTransform: "none",
                    background: "var(--Primary-500)",
                    height: "46px",
                    gap: "10px",
                    borderRadius: "8px",
                    minWidth: "200px", // 👈 Đảm bảo giữ nguyên kích thước ngay cả khi có spinner
                    display: "inline-flex",
                    justifyContent: "center",
                    ":hover": {
                        boxShadow: "0 0 8px 2px var(--Primary-500)",
                        background: "var(--Primary-600)"
                    },
                    ":active": { background: "var(--Primary-700)" },
                }}
            >
                <Typography sx={{ visibility: isLoading ? "hidden" : "visible" }}>
                    Đăng nhập với Google
                </Typography>
                {isLoading && (
                    <CircularProgress
                        size={24}
                        color="inherit"
                        sx={{ position: "absolute" }}
                    />
                )}
            </Button>

        </Stack>
    );
}
