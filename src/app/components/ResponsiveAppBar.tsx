// "use client"

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Divider, Grid2, Stack } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/contexts/AppContext";
import GoogleLoginBtn from "./GoogleLoginBtn";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";

//định nghĩa white là loại color mới
// Augment the palette to include an ochre color
declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
  }

  interface PaletteOptions {
    white?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    white: true;
  }
}

const pages2 = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Đặt sân",
    url: "/dat-san",
  },
];

const settings = [
  {
    title: "Thông tin tài khoản",
    page: "/khach-hang/thong-tin-tai-khoan",
    icon: <PersonIcon sx={{ color: "var(--Primary-500)" }} />,
  },
  {
    title: "Lịch sử đặt sân",
    page: "/khach-hang/lich-su-dat-san",
    icon: <AssignmentIcon sx={{ color: "var(--Primary-500)" }} />,
  },
  {
    title: "Đăng xuất",
    page: "logout",
    icon: <LogoutIcon sx={{ color: "red" }} />,
  },
];

function ResponsiveAppBar() {
  const router = useRouter();
  const { isChange, user, handleLogout } = useContext(AppContext);

  const pathname = usePathname();
  // console.log('pathname', pathname);

  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) {
      setUserAvatar(JSON.parse(storedAvatar));
    }
  }, [isChange]);
  // console.log(userAvatar);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

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

  return (
    <AppBar
      position="sticky"
      sx={{
        mt: 0,
        backgroundColor: "transparent",
        backdropFilter: "blur(20px)",
        boxShadow: "1px",
      }}
    >
      <Container maxWidth="xl" sx={{ background: "rgba(255, 255, 255, 0.9)" }}>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Box
            component="img"
            sx={{
              height: 32,
              width: 32,
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
              display: { xs: "none", md: "flex" },
              mr: 1,
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
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              // color: '#4F9CF9',
              color: "var(--Primary-500)",
              textDecoration: "none",
            }}
          >
            On The Pitch
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" }, zIndex: 999999 }}
            >
              {pages2.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => router.push(`${page.url}`)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.title}
                  </Typography>
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
              display: { xs: "flex", md: "none" },
              mr: 1,
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
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "var(--Primary-500)",
              textDecoration: "none",
            }}
          >
            On The Pitch
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              mx: "50px",
              gap: "20px",
            }}
          >
            {pages2.map((page) => (
              <Button
                key={page.title}
                onClick={() => router.push(`${page.url}`)}
                sx={{
                  my: 2,
                  color: "var(--Primary-500)",
                  display: "block",
                  textTransform: "none",
                  position: "relative", // Để Divider có thể hiển thị đúng vị trí
                  "&:hover .hover-divider": {
                    borderBottomWidth: page.url == pathname ? "3px" : "1px", // Hiện Divider khi hover
                    width: "100%", // Hiện từ từ
                  },
                }}
              >
                <Typography
                  fontWeight={page.url == pathname ? "fontWeightBold" : "0"}
                >
                  {page.title}
                </Typography>
                <Divider
                  orientation="horizontal"
                  flexItem
                  className="hover-divider"
                  sx={{
                    bgcolor: "var(--Primary-500)",
                    borderBottomWidth: page.url == pathname ? "3px" : "0px",
                    width: page.url == pathname ? "100%" : "0%",
                    transition:
                      "width 0.3s ease-in-out, border-bottom-width 0.3s ease-in-out", // Hiệu ứng mượt mà
                  }}
                ></Divider>
              </Button>
            ))}
          </Box>
          <Stack direction="row" spacing={2}>
            {!!user?.id ? (
              <>
                <Tooltip
                  title={
                    <>
                      {user.fullName}
                      <br />({user.email})
                    </>
                  }
                >
                  <Grid2 direction="column" sx={{ width: "fit-content" }}>
                    <Button
                      variant="contained"
                      onClick={handleOpenUserMenu}
                      sx={{
                        textTransform: "none",
                        background: "var(--Primary-50)",
                        height: "46px",
                        gap: "10px",
                        borderRadius: "8px",
                        minWidth: { xs: "100%", sm: "100%" }, //  Đảm bảo giữ nguyên kích thước ngay cả khi có spinner
                        display: "inline-flex",
                        justifyContent: "center",
                        p: "12px",
                        ":hover": {
                          boxShadow: "0 0 1px 2px var(--Primary-500)",
                        },
                        ":active": { background: "var(--Primary-50)" },
                      }}
                    >
                      {userAvatar ? (
                        <Image
                          src={userAvatar}
                          width={32}
                          height={32}
                          alt="User avatar"
                          style={{
                            objectFit: "contain",
                            borderRadius: 50,
                            aspectRatio: 1 / 1,
                          }}
                        />
                      ) : (
                        <AccountCircleIcon fontSize="large" color="primary" />
                      )}
                      {/* <Typography
                                                    sx={{
                                                        display: { xs: 'none', sm: 'flex' },
                                                        width: "100px",
                                                        // textAlign: "center",
                                                        ml: 1, // Tạo khoảng cách nhỏ giữa icon và chữ
                                                        color: "var(--Primary-500)",
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap', // Không xuống dòng

                                                    }}
                                                >
                                                    {user.fullName}
                                                </Typography> */}
                      <Box
                        fontSize="0.95rem"
                        fontWeight={800}
                        component="div"
                        overflow="hidden"
                        whiteSpace="pre-line"
                        textOverflow="ellipsis"
                        color="var(--Primary-500)"
                        width="100%"
                        // height={60}
                        sx={{
                          fontWeight: 500,
                          display: { xs: "none", sm: "block" },
                          whiteSpace: "nowrap",
                          ml: 1,
                        }}
                      >
                        {user.fullName}
                      </Box>
                    </Button>
                  </Grid2>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px", zIndex: 999999 }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((item) => (
                    <MenuItem
                      key={item.title}
                      onClick={() => handleMenuClick(item.page)}
                      sx={{ gap: 2 }}
                    >
                      {item.icon}
                      <Typography sx={{ textAlign: "center" }}>
                        {item.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <GoogleLoginBtn />
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;