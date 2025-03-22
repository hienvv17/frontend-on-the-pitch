"use client";

import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode, useEffect } from "react";

type User = {
    id: string;
    name: string;
    email: string;
    picture?: string;
    error?: string;
};

interface AppContextType {
    isChange: boolean;
    setIsChange: (value: boolean) => void;
    user: any;
    setUser: (value: any) => void;
    handleLogout: () => void;
}

export const AppContext = createContext<AppContextType>({
    isChange: false,
    setIsChange: () => { },
    user: null,
    setUser: () => { },
    handleLogout: () => { },
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isChange, setIsChange] = useState(false);
    const [user, setUser] = useState(null);
    const [isClient, setIsClient] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (isClient) {
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                localStorage.removeItem("user");
            }
        }
    }, [user, isClient]);

    const handleLogout = async () => {
        // Xóa cookie bằng cách đặt thời gian hết hạn về 0
        document.cookie = "accessToken=; Path=/; Max-Age=0";
        setUser(null);
        router.refresh();
    };

    if (!isClient) return null; // Chỉ render sau khi client đã mount

    return (
        <AppContext.Provider value={{ isChange, setIsChange, user, setUser, handleLogout }}>
            {children}
        </AppContext.Provider>
    );
};
