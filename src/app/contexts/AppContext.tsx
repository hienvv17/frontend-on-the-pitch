"use client";

import { createContext, useState, ReactNode, useEffect } from "react";


type SnackbarType = 'success' | 'error' | 'info' | 'warning';

export interface SnackbarState {
    isOpen: boolean;
    msg: string;
    type: SnackbarType;
    duration?: number;
}

interface AppContextType {
    isChange: boolean;
    setIsChange: (value: boolean) => void;
    user: any;
    setUser: (value: any) => void;
    handleLogout: () => void;
    openSnackbar: SnackbarState,
    setOpenSnackBar: React.Dispatch<React.SetStateAction<SnackbarState>>,
}


export const AppContext = createContext<AppContextType>({
    isChange: false,
    setIsChange: () => { },
    user: null,
    setUser: () => { },
    handleLogout: () => { },
    openSnackbar: { isOpen: false, msg: '', type: 'info' },
    setOpenSnackBar: () => { },
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isChange, setIsChange] = useState(false);
    const [user, setUser] = useState(null);
    const [isClient, setIsClient] = useState(false);

    // for snackbar
    const [openSnackbar, setOpenSnackBar] = useState<SnackbarState>({ isOpen: false, msg: '', type: 'info' })

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
                localStorage.removeItem("userAvatar");
            }
        }
    }, [user, isClient]);

    const handleLogout = async () => {
        // Xóa cookie bằng cách đặt thời gian hết hạn về 0
        document.cookie = "accessToken=; Path=/; Max-Age=0";
        localStorage.removeItem("user");
        localStorage.removeItem("userAvatar");
        setUser(null);

        // tải lại trang sau khi đăng xuất, mục đích để chạy lại middleware 
        window.location.reload();
    };


    if (!isClient) return null; // Chỉ render sau khi client đã mount

    return (
        <AppContext.Provider value={{ isChange, setIsChange, user, setUser, handleLogout, openSnackbar, setOpenSnackBar }}>
            {children}
        </AppContext.Provider>
    );
};
