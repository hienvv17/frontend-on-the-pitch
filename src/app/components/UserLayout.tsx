"use client"
import { Box, createTheme, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";

import { Inter } from 'next/font/google';
import CustomSnackbar from "./CustomSnackbar";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const theme = createTheme({
    typography: {
        fontFamily: [
            `${inter.style.fontFamily}`,
            // '-apple-system',
            // 'BlinkMacSystemFont',
            // '"Segoe UI"',
            // 'Roboto',
            // '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            // '"Apple Color Emoji"',
            // '"Segoe UI Emoji"',
            // '"Segoe UI Symbol"',
        ].join(','),
        button: {
            textTransform: "none",
            fontWeight: 600,
            radius: '4px',
            padding: '6px 10px 6px 10px',
            gap: '6px',
            lineHeight: '24px',
            align: 'center',
        }
    },
    palette: {
        white: {
            main: '#fff',
            light: '#fff',
            dark: '#272727',
            contrastText: '#041426',
        },
    },
});

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    const { openSnackbar, setOpenSnackBar } = useContext(AppContext);

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', bgcolor: 'white', minHeight: '100vh' }}>
            <ThemeProvider theme={theme}>
                <ResponsiveAppBar />
                {children}
                <Footer />
                <CustomSnackbar
                    snackBar={openSnackbar}
                    setOpenSnackBar={setOpenSnackBar}
                />
            </ThemeProvider>
        </Box>
    );
};

export default UserLayout;