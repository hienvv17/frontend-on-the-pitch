"use client";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatPrice } from '@/utility/formatPrice';
import { calculateUnitPrice } from '@/utility/calculateUnitPrice';
// import { width } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "var(--Primary-800)",
        fontSize: "0.7rem",
        color: theme.palette.common.white,
        paddingTop: 4,
        paddingBottom: 4,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: "0.7rem",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function BookingInfoTable(props: any) {

    // console.log("BookingInfoTable -> props", props);
    // const hourCount = props.hourCount;
    // console.log("BookingInfoTable ->hourCount", hourCount.slice(-1)[0].getTime() - hourCount[0].getTime());

    // đơn giá 1 giờ
    // console.log("props.selectedSlots[0]", props.selectedSlots);

    // const unitPrice = props.unitPrice * 1000;
    // console.log("!props.data.field.timsSlots = ", !props.data.field.timsSlots);

    const result =
        calculateUnitPrice(props.data.field.timsSlots, props.orderInfo.startTime, props.orderInfo.endTime, Number(props.data.field.defaultPrice / 1000)); // nếu be có update thì xóa /1000
    // console.log("result", result);

    // số giờ thuê
    // const rentalHour = (hourCount.slice(-1)[0].getTime() - hourCount[0].getTime()) / (1000 * 60 * 60);
    React.useEffect(() => {
        props.setBookingData((prev: any) => ({
            ...prev,
            totalPrice: result.total
        }));
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }} aria-label="customized table" size="small">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Đơn giá (đ/giờ)</StyledTableCell>
                        <StyledTableCell align="center">Số giờ</StyledTableCell>
                        <StyledTableCell align="center">Thành tiền (đ)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        result.breakdown.map((item, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center" style={{ whiteSpace: 'pre-line' }}>{`${formatPrice(item.price)}\n(${item.from}-${item.to})`}</StyledTableCell>
                                <StyledTableCell align="center">{item.hours}</StyledTableCell>
                                <StyledTableCell align="center">{formatPrice(item.total)}</StyledTableCell>
                            </StyledTableRow>
                        ))
                    }
                    <StyledTableRow style={{ height: '40px' }}>
                        <StyledTableCell align="center" colSpan={2} style={{ color: 'red', fontWeight: 'bold' }}>Tổng số tiền</StyledTableCell>
                        <StyledTableCell align="center" style={{ color: 'red', fontWeight: 'bold' }}>{formatPrice(result.total)}</StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
