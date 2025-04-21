"use client";

import UserLayout from "@/app/components/UserLayout";
import { Typography } from "@mui/material";

// type User = {
//     id: string;
//     name: string;
//     email: string;
//     picture?: string;
//     error?: string;
// };

export default function Profile() {
    // const { user, setUser } = useContext(AppContext);

    return (
        <>
            <UserLayout>
                <Typography align="center" sx={{ mt: "10px" }}>Thông tin tài khoàn</Typography>
            </UserLayout>
        </>
    );

}
