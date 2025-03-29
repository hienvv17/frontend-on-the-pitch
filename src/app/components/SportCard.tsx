import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import { Box, Grid2 } from '@mui/material';
import Image from 'next/legacy/image';
import StarIcon from "@mui/icons-material/Star";
import RoomIcon from "@mui/icons-material/Room";

export default function SportCard(props) {

    return (
        <StyledEngineProvider injectFirst>
            <CssVarsProvider>
                <Card sx={{
                    width: 130, boxShadow: 'lg',
                    ":hover": {
                        boxShadow: "0 0 8px 2px var(--Primary-500)",
                        transform: { xs: "none", sm: "scale(1.05)" },
                        background: "var(--Primary-50)",
                    },
                    transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                    my: 2
                }}>
                    <CardOverflow>
                        <AspectRatio variant="outlined" ratio="16/9" objectFit="cover">
                            <Image
                                src={props.data.image} layout="fill"
                            />
                        </AspectRatio>
                    </CardOverflow>
                    <CardContent>
                        <Typography level="body-xs">Mở cửa: 06:00 - 21:00</Typography>
                        <Box
                            fontSize="h5.fontSize"
                            component="div"
                            overflow="hidden"
                            whiteSpace="pre-line"
                            textOverflow="ellipsis"
                            height={60}
                            sx={{ fontWeight: 500 }}
                        >
                            {props.data.name}
                        </Box>
                        <Grid2 container direction="row"
                            sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>

                            <Box display="flex" alignItems="center" gap={1}>
                                <RoomIcon color="primary" fontSize="small" />
                                <Typography fontSize="12px">{props.data.location}</Typography>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={0.5}
                                sx={{
                                    position: "absolute",
                                    top: 8, // Cách mép trên 8px
                                    right: 8, // Cách mép phải 8px
                                    zIndex: 99,
                                    backgroundColor: "rgba(0, 0, 0, 0.6)", // Nền mờ giúp dễ đọc hơn
                                    borderRadius: "4px", // Bo góc nhẹ
                                    padding: "2px 6px", // Thêm padding để dễ nhìn
                                }}
                            >
                                <StarIcon sx={{ color: "#FFD700" }} fontSize="small" />
                                <Typography sx={{ color: "#FFD700" }} fontSize="12px">{props.data.rating}</Typography>
                            </Box>
                        </Grid2>
                    </CardContent>
                    <CardOverflow>
                        <Button variant="solid" size="lg" sx={{ background: "var(--Primary-500)" }}>
                            Đặt sân
                        </Button>
                    </CardOverflow>
                </Card>
            </CssVarsProvider>
        </StyledEngineProvider>
    );
}