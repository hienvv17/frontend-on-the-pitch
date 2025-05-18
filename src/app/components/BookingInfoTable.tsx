import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { formatPrice } from '@/utility/formatPrice';
import { calculateUnitPrice } from '@/utility/calculateUnitPrice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'var(--Primary-800)',
    fontSize: '0.7rem',
    color: theme.palette.common.white,
    paddingTop: 4,
    paddingBottom: 4,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.7rem',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function BookingInfoTable({
  data,
  orderInfo,
  voucherData,
  setBookingData,
  onResultChange,
}: any) {
  const calculationResult = React.useMemo(() => {
    return calculateUnitPrice(
      data.field.timsSlots,
      orderInfo.startTime,
      orderInfo.endTime,
      Number(data.field.defaultPrice),
      voucherData,
    );
  }, [data, orderInfo, voucherData]);

  const result = React.useMemo(() => {
    return {
      ...calculationResult,
      discountAmountFormatted: formatPrice(calculationResult.discountAmount),
      finalTotalFormatted: formatPrice(calculationResult.finalTotal),
      totalFormatted: formatPrice(calculationResult.total),
    };
  }, [calculationResult]);
  const hasUpdatedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (!hasUpdatedRef.current) {
      hasUpdatedRef.current = true;
      return;
    }

    const updated = {
      totalPrice: calculationResult.finalTotal,
      originPrice: calculationResult.total,
      discountAmount: calculationResult.discountAmount,
      voucherCode: voucherData?.code || '',
    };

    setBookingData((prev: any) => {
      const isSame =
        prev.totalPrice === updated.totalPrice &&
        prev.originPrice === updated.originPrice &&
        prev.discountAmount === updated.discountAmount &&
        prev.voucherCode === updated.voucherCode;

      return isSame ? prev : { ...prev, ...updated };
    });

    onResultChange?.(result);
  }, [calculationResult, voucherData]);

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
          {result.breakdown.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center" style={{ whiteSpace: 'pre-line' }}>
                {`${formatPrice(item.price)}\n(${item.from}-${item.to})`}
              </StyledTableCell>
              <StyledTableCell align="center">{item.hours}</StyledTableCell>
              <StyledTableCell align="center">{formatPrice(item.total)}</StyledTableCell>
            </StyledTableRow>
          ))}

          {result.discountAmount > 0 && (
            <StyledTableRow>
              <StyledTableCell colSpan={2} sx={{ color: 'red', fontWeight: 'bold' }}>
                Giảm giá
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ color: 'red', fontWeight: 'bold' }}>
                -{formatPrice(result.discountAmount)}
              </StyledTableCell>
            </StyledTableRow>
          )}

          <StyledTableRow style={{ height: 40 }}>
            <StyledTableCell colSpan={2} sx={{ color: 'red', fontWeight: 'bold' }}>
              Tổng thanh toán
            </StyledTableCell>
            <StyledTableCell align="center" sx={{ color: 'red', fontWeight: 'bold' }}>
              {formatPrice(result.finalTotal)}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
