"use client";

import { Stack, Button, Icon } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function GoogleLoginBtn() {
    const router = useRouter();

    const { isChange, user, setUser, handleLogout } = useContext(AppContext);

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
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential: response.access_token }),
            });

            const data = await res.json();
            if (res.ok) {
                window.location.reload();
                console.log("Login successful", data);
            } else {
                console.error("Login failed", data);
            }
        },
        onError: () => console.log("Login failed"),
        scope: "openid email profile",
    });

    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="contained"
                startIcon={svgIcon}
                onClick={() => login()} // Bấm nút sẽ mở popup đăng nhập Google
                sx={{
                    textTransform: "none",
                    background: "#4F9CF9",
                    height: "46px",
                    gap: "10px",
                    borderRadius: "8px",
                }}
            >
                Đăng nhập với Google
            </Button>
        </Stack>
    );
}
