"use client"

import { googleLogout } from "@react-oauth/google";
import { createContext, useState, ReactNode, SetStateAction, Dispatch, useEffect } from "react";


type User = {
    id: string;
    name: string;
    email: string;
    picture?: string;
    error?: string;
};

type UserOrNull = User | null;

interface AppContextType {
    isChange: boolean;
    setIsChange: Dispatch<SetStateAction<boolean>>;
    user: UserOrNull;
    setUser: Dispatch<SetStateAction<UserOrNull>>;
    handleLogout: () => void
}

const blankUser: User = {
    id: "",
    name: "",
    email: "",
    picture: "",
    error: ""
}
export const AppContext = createContext<AppContextType>({
    isChange: false,
    setIsChange: () => { },
    user: blankUser,
    setUser: () => { },
    handleLogout: () => { }
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isChange, setIsChange] = useState(false);
    const [user, setUser] = useState<UserOrNull>(null);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" }); // Xóa JWT trong cookie
        googleLogout(); // Đăng xuất khỏi Google
        setUser(null); // Cập nhật state user để re-render UI
        console.log('logout');
    };

    // useEffect(() => {
    //     fetch("/api/auth/me",)
    //         .then((res) => res.json())
    //         .then((data) => setUser(data))
    //         .catch(() => setUser(null));
    // }, []);

    return (
        <AppContext.Provider value={{ isChange, setIsChange, user, setUser, handleLogout }}>
            {children}
        </AppContext.Provider>
    );
};
