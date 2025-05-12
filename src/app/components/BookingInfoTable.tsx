import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { formatPrice } from "@/utility/formatPrice";
import { calculateUnitPrice } from "@/utility/calculateUnitPrice";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BookingInfoTable({ data, orderInfo, voucherData, setBookingData,onResultChange }: any) {
  
  
const discount = React.useMemo(() => {
  if (!voucherData) return 0;
  return voucherData.percentDiscount || 0;
}, [voucherData]);

const discountType = React.useMemo(() => {
  return voucherData?.percentDiscount ? "percentage" : "fixed";
}, [voucherData]);



const result = React.useMemo(() => {
  const calculationResult = calculateUnitPrice(
    data.field.timsSlots,
    orderInfo.startTime,
    orderInfo.endTime,
    Number(data.field.defaultPrice)
  );

  let discountAmount = 0;

  if (voucherData) {
    if (discountType === "percentage") {
      discountAmount = Math.round((calculationResult.total * discount) / 100);

      if (
        voucherData.maxDiscountAmount &&
        discountAmount > voucherData.maxDiscountAmount
      ) {
        discountAmount = voucherData.maxDiscountAmount;
      }
    } else {
      discountAmount = Math.min(discount, calculationResult.total);

      if (
        voucherData.maxDiscountAmount &&
        discountAmount > voucherData.maxDiscountAmount
      ) {
        discountAmount = voucherData.maxDiscountAmount;
      }
    }
  }

  const finalTotal = calculationResult.total - discountAmount;

  return {
    ...calculationResult,
    discountAmount,
    discountAmountFormatted: formatPrice(discountAmount),
    finalTotal,
    finalTotalFormatted: formatPrice(finalTotal),
    totalFormatted: formatPrice(calculationResult.total),
  };
  
}, [data, orderInfo, discount, discountType, voucherData]);




  React.useEffect(() => {
    setBookingData((prev: any) => ({
      ...prev,
      totalPrice: result.finalTotal,
      discountAmount: result.discountAmount,
      originalPrice: result.total,
      voucherCode: voucherData?.code || ""
    }));
    if (onResultChange) {
      onResultChange(result);
    }
  }, [result,result.finalTotal, result.discountAmount, voucherData, setBookingData]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="customized table" size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Đơn giá (đ/giờ)</StyledTableCell>
            <StyledTableCell align="center">Số giờ</StyledTableCell>
            <StyledTableCell align="center">Thành tiền (đ)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.breakdown.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center" style={{ whiteSpace: "pre-line" }}>
                {`${formatPrice(item.price)}\n(${item.from}-${item.to})`}
              </StyledTableCell>
              <StyledTableCell align="center">{item.hours}</StyledTableCell>
              <StyledTableCell align="center">{formatPrice(item.total)}</StyledTableCell>
            </StyledTableRow>
          ))}
          
          {result.discountAmount > 0 && (
            <StyledTableRow>
               <StyledTableCell  colSpan={2} sx={{ color: "red", fontWeight: "bold" }}>
                Giảm giá 
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={2} sx={{ color: "red", fontWeight: "bold" }}>-{formatPrice(result.discountAmount)}</StyledTableCell>
            </StyledTableRow>
          )}
          <StyledTableRow style={{ height: 40 }}>
            <StyledTableCell  colSpan={2} sx={{ color: "red", fontWeight: "bold" }}>
              Tổng thanh toán
            </StyledTableCell>
            <StyledTableCell align="center" sx={{ color: "red", fontWeight: "bold" }}>
              {formatPrice(result.finalTotal)}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
