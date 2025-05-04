"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import UserLayout from '@/app/components/UserLayout';
import { Grid2 as Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useUserApiPrivate } from '@/api/user/user';
import { useEffect, useState } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';


const useStyles = {
    table: {
        minWidth: 650
    },
    tableRow: {
        height: 45,
        padding: '15px',

    },
    tableHeader: {
        paddingTop: "0px",
        paddingBottom: '0px',
        backgroundColor: '#F4F6F8'
    },
    tableCell: {
        paddingTop: "0px",
        paddingBottom: '0px',
        // marginBottom: '15px'
        borderBottom: '1px solid rgba(0, 0, 0, 0.25)'
    }
};

export default function BookingHistory() {
    const classes = useStyles;

    const { POST_P } = useUserApiPrivate();

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await POST_P('/field-bookings/history');
            // console.log('data', data.data.bookingHistories);
            setHistory(data.data.bookingHistories[0]);
        };
        getData();
        // console.log("history", history);
    }, []);

    const handleChangePage = () => {
        return;
    };

    return (
        <>
            <UserLayout>
                <Box sx={{ height: '100%', width: '100%', my: "40px" }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            borderRadius: '20px',
                            width: '100%',
                            height: '100%', // Phải có để alignItems hoạt động
                            zIndex: 110,
                        }}
                    >
                        <Grid container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                width: '100%',
                                height: '100%', // Phải có để alignItems hoạt động

                            }}>
                            <Paper
                                elevation={5}
                                sx={{
                                    width: '90%',          // Hoặc cố định như 600px tuỳ thiết kế
                                    height: '100%',

                                    overflow: "hidden",
                                    borderRadius: "8px"
                                }}
                            >

                                <Grid
                                    container
                                    direction={"column"}
                                    justifyContent="center"
                                    alignItems="center"
                                >

                                    <Grid container
                                        direction={"row"}
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        spacing={2}
                                        sx={{
                                            width: '100%',
                                            backgroundColor: "var(--Primary-800)",
                                            padding: "15px 30px",
                                            borderRadius: "8px 8px 0px 0px"
                                        }}
                                    >
                                        <AssignmentIcon sx={{ color: "var(--Primary-50)" }} />
                                        <Typography color="var(--Primary-50)">Lịch sử đặt sân</Typography>
                                    </Grid>
                                </Grid>



                                <Grid container direction="column"
                                    sx={{
                                        // borderRadius: '20px',
                                        display: "flex",
                                        width: '100%',
                                        // flexGrow: 1,
                                        height: '552px', // Phải có để alignItems hoạt động
                                        // backgroundColor: "yellow",
                                    }}>
                                    <Box >
                                        <TableContainer
                                            sx={{
                                                // borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
                                                // m: '0px',
                                                // p: '0px',
                                                // flex: 1,
                                                // maxHeight: '60vh',
                                                // height: '100%',
                                                // display: 'flex',
                                                // flexDirection: 'column',
                                            }}
                                        >
                                            <Table stickyHeader aria-label="simple table" >
                                                <TableHead sx={{ backgroundColor: '#F4F6F8' }}>
                                                    <TableRow sx={classes.tableRow}>
                                                        <TableCell sx={{ ...classes.tableHeader }} colSpan={1}>Mã đơn</TableCell>
                                                        <TableCell sx={{ ...classes.tableHeader }} colSpan={2}>Ngày đặt</TableCell>
                                                        <TableCell sx={{ ...classes.tableHeader }} colSpan={3}>Nội dung</TableCell>
                                                        <TableCell sx={{ ...classes.tableHeader }} colSpan={4}>Tổng tiền</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {
                                                        history.length > 0
                                                            ?
                                                            history.map((index) => (
                                                                <TableRow key={index} hover sx={{ ...classes.tableRow }}>
                                                                    <TableCell sx={{ ...classes.tableCell, textAlign: 'center' }} colSpan={1}>id</TableCell>
                                                                    <TableCell sx={{ ...classes.tableCell, textAlign: 'center' }} colSpan={2}>day</TableCell>
                                                                    <TableCell sx={{ ...classes.tableCell, textAlign: 'center' }} colSpan={3}>detail</TableCell>
                                                                    <TableCell sx={{ ...classes.tableCell, textAlign: 'center' }} colSpan={4}>total</TableCell>
                                                                </TableRow>
                                                            ))
                                                            :
                                                            <TableRow hover sx={{ ...classes.tableRow }}>
                                                                <TableCell sx={{ ...classes.tableCell, textAlign: 'center' }} colSpan={10}>(trống)</TableCell>
                                                            </TableRow>
                                                    }

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box >


                                    <Box
                                        sx={{
                                            mt: 'auto'
                                        }}
                                    >
                                        <TablePagination
                                            labelRowsPerPage=''
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={history.length}
                                            // rowsPerPage={rowsPerPage}
                                            // page={page}
                                            onPageChange={handleChangePage}
                                            // onRowsPerPageChange={handleChangeRowsPerPage}

                                            // count={10}
                                            rowsPerPage={10}
                                            page={0}
                                        />
                                    </Box>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </UserLayout >
        </>
    );
}
