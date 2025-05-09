"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import UserLayout from "@/app/components/UserLayout";
import {
    Container,
    Grid2 as Grid,
    Typography,
} from "@mui/material";
// import { AppContext } from "@/app/contexts/AppContext";
// import { useContext, useEffect, useState } from "react";
// import { useUserApiPrivate } from "@/api/user/user";
// import { ROUTES } from "@/utility/constant";
import EditNoteIcon from '@mui/icons-material/EditNote';
import ReviewTab from "@/app/components/ReviewTab";

export default function MyReview() {


    return (
        <>
            <UserLayout>

                <Grid
                    container
                    direction={"row"}
                    sx={{
                        borderRadius: "20px",
                        height: "fit-content",
                        justifyContent: "center",
                        width: "100%",
                        zIndex: 100,
                        // mt: { xs: "-10vh", sm: "-20vh", md: "-25vh", lg: "-35vh", xl: "-21%" },
                    }}
                >
                    <Box
                        sx={{
                            width: "fit-content",
                            background: { xs: "none", sm: "white" },
                            borderRadius: "inherit",
                        }}
                    >
                        <Container
                            // elevation={5}
                            sx={{
                                width: "95vw",
                                mt: 2,
                                mb: "30px",
                                border: "2px solid var(--Primary-200)",
                                position: "relative",
                                zIndex: 99,
                                backgroundColor: "var(--Primary-50)",
                                borderRadius: "20px",
                                boxShadow: "0px 5px 5.8px 0px rgba(0, 0, 0, 0.10)",
                                py: { xs: "16px", sm: "24px" },
                                gap: "60px",
                            }}
                        >
                            <Grid
                                container
                                direction={"row"}
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                                sx={{
                                    width: "100%",
                                    // backgroundColor: "var(--Primary-800)",
                                    // padding: "15px 30px",
                                    // borderRadius: "8px 8px 0px 0px",
                                }}
                            >
                                <EditNoteIcon sx={{ color: "var(--Primary-500)" }} />
                                <Typography
                                    variant="h5"
                                    color="var(--Primary-500)"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Đánh giá của tôi
                                </Typography>
                            </Grid>

                            <Grid
                                container
                                direction={"row"}
                                justifyContent="center"
                                alignItems="center"
                                sx={{ height: "100%" }}
                            >
                                <ReviewTab />
                            </Grid>


                        </Container>
                    </Box>
                </Grid>

            </UserLayout>
        </>
    );
}
