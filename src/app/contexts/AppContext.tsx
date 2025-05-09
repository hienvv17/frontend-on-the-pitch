"use client";

import { ACCESS_TOKEN } from "@/utility/constant";
import { createContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";

type SnackbarType = "success" | "error" | "info" | "warning";

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
  openSnackbar: SnackbarState;
  setOpenSnackBar: React.Dispatch<React.SetStateAction<SnackbarState>>;
  sportName: string,
  setSportName: React.Dispatch<React.SetStateAction<string>>;
  branchOption: any,
  setBranchOption: Dispatch<SetStateAction<{
    value: number;
    label: string;
  }>>
}

export const AppContext = createContext<AppContextType>({
  isChange: false,
  setIsChange: () => { },
  user: null,
  setUser: () => { },
  handleLogout: () => { },
  openSnackbar: { isOpen: false, msg: "", type: "info" },
  setOpenSnackBar: () => { },
  sportName: '',
  setSportName: () => { },
  branchOption: { value: 0, label: '' },
  setBranchOption: () => { }
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isChange, setIsChange] = useState(false);
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [sportName, setSportName] = useState('');
  const [branchOption, setBranchOption] = useState({ value: 0, label: '' });
  // for snackbar
  const [openSnackbar, setOpenSnackBar] = useState<SnackbarState>({
    isOpen: false,
    msg: "",
    type: "info",
  });

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
        console.log("No user logged");
        localStorage.removeItem("user");
        localStorage.removeItem("userAvatar");
      }
    }
  }, [user, isClient]);

  const handleLogout = async () => {
    // Xóa cookie bằng cách đặt thời gian hết hạn về 0
    Cookies.remove(ACCESS_TOKEN);
    // localStorage.removeItem("user");
    // localStorage.removeItem("userAvatar");
    setUser(null);

    // tải lại trang sau khi đăng xuất, mục đích để chạy lại middleware
    window.location.reload();
  };

  if (!isClient) return null; // Chỉ render sau khi client đã mount

  return (
    <AppContext.Provider
      value={{
        isChange,
        setIsChange,
        user,
        setUser,
        handleLogout,
        openSnackbar,
        setOpenSnackBar,
        sportName,
        setSportName,
        branchOption,
        setBranchOption
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
