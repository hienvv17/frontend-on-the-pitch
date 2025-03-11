"use client";

import { useContext, useEffect, useState } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import LogoutButton from "@/app/components/LogoutBtn";
import Image from "next/image";
import GoogleLoginBtn from "../../components/GoogleLoginBtn";
import { AppContext } from "@/app/contexts/AppContext";
import UserLayout from "@/app/components/UserLayout";
import { Typography } from "@mui/material";

type User = {
    id: string;
    name: string;
    email: string;
    picture?: string;
    error?: string;
};

export default function Profile() {
    const { user, setUser } = useContext(AppContext);

    return (
        <>
            <UserLayout>
                <Typography align="center" sx={{ mt: "10px" }}>Thông tin tài khoàn</Typography>
            </UserLayout>
        </>
    );

}
