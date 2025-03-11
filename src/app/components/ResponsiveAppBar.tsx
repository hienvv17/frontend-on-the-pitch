// "use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme, Divider, Grid2, ThemeProvider } from '@mui/material';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AppContext } from "@/app/contexts/AppContext";
import { GoogleLogin } from '@react-oauth/google';
import GoogleLoginBtn from "./GoogleLoginBtn";


//định nghĩa white là loại color mới
// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
    interface Palette {
        white: Palette['primary'];
    }

    interface PaletteOptions {
        white?: PaletteOptions['primary'];
    }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/AppBar' {
    interface AppBarPropsColorOverrides {
        white: true;
    }
}


const pages2 = [
    {
        title: "Trang chủ",
        url: "/"
    },
    {
        title: "Đặt sân",
        url: "/dat-san"
    }
];

const settings = [
    {
        title: "Thông tin tài khoản",
        page: "/user-info"
    },
    {
        title: "Đăng xuất",
        page: "logout"
    }
];

function ResponsiveAppBar() {
    const router = useRouter();
    const pathname = usePathname();


    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const { isChange, user, setUser, handleLogout } = useContext(AppContext);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (page: string) => {
        handleCloseUserMenu(); // Đóng menu khi chọn item

        if (page === "logout") {
            handleLogout(); // Gọi hàm logout
            // setUser(null);
        } else {
            router.push(page); // Điều hướng đến trang tương ứng
        }
    };
    // console.log('aaa', user);
    // React.useEffect(() => {
    //     console.log('aaa', user);
    // }, [isChange]);

    return (
        <AppBar position="static" color='white'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Box
                        component="img"
                        sx={{
                            height: 32,
                            width: 32,
                            // maxHeight: { xs: 233, md: 167 },
                            // maxWidth: { xs: 350, md: 250 },
                            display: { xs: 'none', md: 'flex' },
                            mr: 1
                        }}
                        alt="OTP"
                        src="/icon/iconOTP.png"
                        onClick={() => console.log(isChange)}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: '#4F9CF9',
                            textDecoration: 'none',
                        }}

                    >
                        On The Pitch
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="primary"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages2.map((page) => (
                                <MenuItem key={page.title} onClick={() => router.push(`${page.url}`)}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    <Box
                        component="img"
                        sx={{
                            height: 22,
                            width: 22,
                            // maxHeight: { xs: 233, md: 167 },
                            // maxWidth: { xs: 350, md: 250 },
                            display: { xs: 'flex', md: 'none' },
                            mr: 1
                        }}
                        alt="The house from the offer."
                        src="/icon/iconOTP.png"
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: '#4F9CF9',
                            textDecoration: 'none',
                        }}
                    >
                        On The Pitch
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mx: '50px', gap: '20px' }}>
                        {pages2.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => router.push(`${page.url}`)}
                                sx={{
                                    my: 2, color: 'white', display: 'block', textTransform: 'none',
                                    position: 'relative', // Để Divider có thể hiển thị đúng vị trí
                                    '&:hover .hover-divider': {
                                        borderBottomWidth: page.url == pathname ? '3px' : '1px', // Hiện Divider khi hover
                                        width: '100%', // Hiện từ từ
                                    }
                                }}

                            >
                                <Typography fontWeight={page.url == pathname ? 'fontWeightBold' : "0"}>{page.title}</Typography>
                                <Divider orientation="horizontal" flexItem className="hover-divider"
                                    sx={{
                                        bgcolor: '#4F9CF9', borderBottomWidth: page.url == pathname ? '3px' : '0px',
                                        width: page.url == pathname ? '100%' : '0%',
                                        transition: 'width 0.3s ease-in-out, border-bottom-width 0.3s ease-in-out', // Hiệu ứng mượt mà
                                    }}></Divider>
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {
                            !!user?.id ?
                                <>
                                    <Tooltip title="Tài khoản">
                                        <Grid2 direction="column" >
                                            <Button onClick={handleOpenUserMenu} sx={{ p: 0, textTransform: "none" }} >
                                                <AccountCircleIcon fontSize="large" color="primary" />
                                                <Typography sx={{ display: { xs: 'none', md: 'flex' } }}>{user.name}</Typography>
                                            </Button>
                                        </Grid2>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((item) => (
                                            <MenuItem key={item.title} onClick={() => handleMenuClick(item.page)}>
                                                <Typography sx={{ textAlign: "center" }}>{item.title}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                                : <GoogleLoginBtn />}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
