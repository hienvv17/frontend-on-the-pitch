"use client";

import { useContext, useEffect, useState } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import LogoutButton from "@/app/components/LogoutBtn";
import Image from "next/image";
import GoogleLoginBtn from "../../components/GoogleLoginBtn";
import { AppContext } from "@/app/contexts/AppContext";

type User = {
    id: string;
    name: string;
    email: string;
    picture?: string;
    error?: string;
};

export default function Profile() {
    // const [user, setUser] = useState<User | null>(null);
    const { user, setUser } = useContext(AppContext);

    // useEffect(() => {
    //     fetch("/api/auth/me",)
    //         .then((res) => res.json())
    //         .then((data) => setUser(data))
    //         .catch(() => setUser(null));
    // }, []);

    // const login = useGoogleLogin({
    //     onSuccess: async (tokenResponse) => {
    //         const res = await fetch("/api/auth/google", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ token: tokenResponse.access_token }),
    //             credentials: "include", // Quan trọng để gửi cookie
    //         });

    //         const data = await res.json();
    //         setUser(data); // Cập nhật state user sau khi login
    //     },
    // });

    if (!user?.id) {
        return (
            <GoogleLoginBtn />
        );
    }
    console.log(user);
    return (
        <div>
            <h2>Welcome, {user.name}</h2>
            {user.picture && (
                <Image
                    src={user.picture}
                    alt={user.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                />
            )}
            <LogoutButton />
        </div>
    );

}
