"use client"
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";

const theme = createTheme({
    // typography: {
    //     fontFamily: [
    //         '-apple-system',
    //         'BlinkMacSystemFont',
    //         '"Segoe UI"',
    //         'Roboto',
    //         '"Helvetica Neue"',
    //         'Arial',
    //         'sans-serif',
    //         '"Apple Color Emoji"',
    //         '"Segoe UI Emoji"',
    //         '"Segoe UI Symbol"',
    //         '"Inter"',
    //     ].join(','),
    // },
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
    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
            <ThemeProvider theme={theme}>
                <ResponsiveAppBar />
                {children}
                <Footer />
            </ThemeProvider>
        </Box>
    );
};

export default UserLayout;