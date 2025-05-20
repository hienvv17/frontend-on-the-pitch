'use client';

import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Tooltip,
  Grid as MuiGrid,
} from '@mui/material';
import { Grid } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { emailRegex, msgDetail } from '@/utility/constant';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import moment from 'moment';
import BookingInfoTable from './BookingInfoTable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { blueBlurDialogSlotProps } from '@/utility/dialogSlotProps';
import { privateApi } from '@/api/base';
import { formatPrice } from '@/utility/formatPrice';

export default function OrderPopUp(props: any) {
  const [isDisableBtn, setIsDisableBtn] = useState(true);
  const selectedSlots = props.selectedSlots;
  const { setOpenSnackBar, user } = useContext(AppContext);
  const [result, setResult] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherData, setVoucherData] = useState<any>(null);
  const [voucherError, setVoucherError] = useState('');
  const [isValidatingVoucher, setIsValidatingVoucher] = useState(false);
  const [filteredBranches, setFilteredBranches] = useState<any[]>([]);

  useEffect(() => {
    setEmail(user?.email || '');
  }, [user, props.open]);

  const handleResultChange = (newResult: any) => {
    setResult(newResult);
  };

  const validateEmail = (value: string) => {
    setOpenSnackBar({ isOpen: false, msg: msgDetail[16], type: 'info' });

    const trimValue = value.trim().replace(/\s+/g, '');

    if (trimValue === '') {
      setTimeout(() => {
        setOpenSnackBar({ isOpen: true, msg: msgDetail[25], type: 'error' });
      }, 100);
      setIsDisableBtn(true);
      return;
    }

    if (!emailRegex.test(trimValue)) {
      setTimeout(() => {
        setOpenSnackBar({ isOpen: true, msg: msgDetail[12], type: 'error' });
      }, 100);
      setIsDisableBtn(true);
    } else {
      setOpenSnackBar({ isOpen: false, msg: msgDetail[16], type: 'info' });
      setIsDisableBtn(false);
      props.setTempEemail(trimValue);
      props.setBookingData((prev: any) => ({
        ...prev,
        email: value.trim(),
      }));
    }
  };

  const handleBlur = () => {
    validateEmail(email);
  };

  const handleClose = () => {
    setEmail('');
    setIsDisableBtn(true);
    setOpenSnackBar({ isOpen: false, msg: '', type: 'error' });
    props.setSelectedDate(props.searchData.dayPicked);
    props.setBookingData((prev: any) => ({
      ...prev,
      startTime: '',
      endTime: '',
      bookingDate:
        props.searchData.dayPicked !== null ? props.searchData.dayPicked.format('YYYY-MM-DD') : '',
      totalPrice: 0,
      email: '',
      sportFieldId: 0,
      voucherCode: '',
      discountAmount: 0,
    }));
    setVoucherData(null);
    setVoucherCode('');
    setVoucherError('');
    props.setSelectedSlots([]);
    props.setStartSlot(null);
    props.setOpen(false);
    props.setOpenDialog2(false);
  };

  const handleBack = () => {
    props.onClose();
    props.handleOpenDialog2();
  };

  const validateVoucher = async () => {
    const code = voucherCode.trim();

    if (!code) {
      setVoucherError('Vui lòng nhập mã voucher');
      return;
    }

    try {
      const configApi = privateApi('');
      const { data: responseData } = await configApi.get(`/vouchers/validate?code=${code}`);

      if (!responseData.success) throw new Error(responseData.message);

      const voucher = responseData.items;
      if (!voucher || voucher.status !== 'ACTIVE') {
        setVoucherError('Voucher không hợp lệ hoặc đã ngừng hoạt động');
        setVoucherData(null);
        return;
      }

      const now = new Date();
      const validFrom = new Date(voucher.validFrom);
      const validTo = new Date(voucher.validTo);

      if (now < validFrom || now > validTo) {
        setVoucherError('Voucher đã hết hạn hoặc chưa có hiệu lực');
        setVoucherData(null);
        return;
      }

      const total = result?.total || 0;
      if (total < voucher.minBookingAmount) {
        setVoucherError(
          `Đơn hàng tối thiểu ${formatPrice(voucher.minBookingAmount)} để áp dụng voucher`,
        );
        setVoucherData(null);
        return;
      }

      props.setBookingData((prev: any) => ({
        ...prev,
        voucherCode: code,
      }));

      setVoucherData(voucher);
      setVoucherError('');
    } catch (error: any) {
      setVoucherError(error.message || 'Có lỗi xảy ra khi xác thực voucher');
      setVoucherData(null);
    }
  };

  return (
    <>
      {props.open && (
        <Dialog
          closeAfterTransition={false}
          open={props.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="xs"
          slotProps={blueBlurDialogSlotProps}
        >
          <DialogTitle sx={{ fontWeight: 'bold' }}>
            <Grid container justifyContent="space-between" alignItems="center" direction={'row'}>
              <Tooltip title="Quay lại">
                <IconButton color="info" onClick={handleBack} sx={{ p: 1 }}>
                  <ArrowBackIcon
                    aria-label="close"
                    sx={{ position: 'absolute', right: 'auto', top: 'auto' }}
                  />
                </IconButton>
              </Tooltip>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction={'column'}
                sx={{ flex: 1 }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>{props.title}</Typography>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent sx={{ pb: 0, mb: 1 }}>
            <Grid container direction="column" sx={{ gap: 1 }}>
              <Grid container direction="row" sx={{ width: '100%' }}>
                <Grid container direction="column" spacing={1} sx={{ width: '100%' }}>
                  <Grid container direction="row" spacing={2} sx={{ width: '100%' }}>
                    <Grid size={4}>
                      <Typography fontSize="0.75rem">Sân:</Typography>
                    </Grid>
                    <Grid size={8}>
                      <Typography fontSize="0.75rem">{props.data.field.name}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container direction="row" spacing={2} sx={{ width: '100%' }}>
                    <Grid size={4}>
                      <Typography fontSize="0.75rem">Ngày:</Typography>
                    </Grid>
                    <Grid size={8}>
                      <Typography fontSize="0.75rem">
                        {moment(props.orderInfo.bookingDate).format('DD/MM/YYYY')}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container direction="row" spacing={2} sx={{ width: '100%' }}>
                    <Grid size={4}>
                      <Typography fontSize="0.75rem">Giờ:</Typography>
                    </Grid>
                    <Grid size={8}>
                      <Typography fontSize="0.75rem">
                        {props.orderInfo.startTime + ' - ' + props.orderInfo.endTime}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container direction="row" spacing={2} sx={{ width: '100%' }}>
                    <Grid size={4}>
                      <Typography fontSize="0.75rem">Cụm sân:</Typography>
                    </Grid>
                    <Grid size={8}>
                      <Typography fontSize="0.75rem">{props.data.branch[0].name}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container direction="row" spacing={2} sx={{ width: '100%' }}>
                    <Grid size={4}>
                      <Typography fontSize="0.75rem">Địa chỉ:</Typography>
                    </Grid>
                    <Grid size={8}>
                      <Typography fontSize="0.75rem">
                        {props.branchFilter.street +
                          ', ' +
                          props.branchFilter.district +
                          ', ' +
                          props.branchFilter.city}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container direction="column" justifyContent="center" sx={{ width: '100%' }}>
                <BookingInfoTable
                  data={props.data}
                  hourCount={selectedSlots}
                  setBookingData={props.setBookingData}
                  orderInfo={props.orderInfo}
                  onResultChange={handleResultChange}
                  voucherData={voucherData}
                />
              </Grid>

              <Grid
                container
                direction="column"
                sx={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Grid size={12}>
                  <TextField
                    fullWidth
                    required
                    label={props.label}
                    name={props.name}
                    placeholder="Vui lòng nhập email"
                    variant="outlined"
                    value={user?.email || email}
                    size="small"
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleBlur}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                      htmlInput: { sx: { fontSize: '0.85rem' } },
                    }}
                    disabled={!!props?.user}
                  />
                </Grid>
              </Grid>
              {email && !user && (
                <Grid
                  container
                  direction="column"
                  sx={{
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Grid
                    size={12}
                    sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                  >
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ ml: 1, mt: 0.5, display: 'block' }}
                    >
                      Hãy kiểm tra email của bạn trước khi đặt sân
                    </Typography>
                  </Grid>
                </Grid>
              )}
              <Grid
                container
                direction="row"
                sx={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'left',
                }}
                spacing={2}
              >
                <MuiGrid item xs={12}>
                  <TextField
                    fullWidth
                    label={props.nameVoucher || 'Mã voucher'}
                    name="voucherCode"
                    placeholder="Nhập mã voucher"
                    variant="outlined"
                    value={voucherCode}
                    size="small"
                    margin="normal"
                    onChange={(e) => setVoucherCode(e.target.value)}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                      htmlInput: { sx: { fontSize: '0.85rem', width: '130%' } },
                    }}
                    disabled={!user}
                  />
                  {!!voucherError && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ ml: 1, mt: 0.5, display: 'block' }}
                    >
                      {voucherError}
                    </Typography>
                  )}
                </MuiGrid>
                <MuiGrid item xs={3}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={validateVoucher}
                    disabled={isValidatingVoucher || !voucherCode.trim()}
                    sx={{ mt: 2.2, textTransform: 'none' }}
                  >
                    {isValidatingVoucher ? '...' : 'Áp dụng'}
                  </Button>
                </MuiGrid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid
              container
              direction="row"
              spacing={{ xs: 2, sm: 4 }}
              justifyContent={'center'}
              alignItems={'center'}
              sx={{
                width: '100%',
              }}
            >
              <Button
                variant="contained"
                startIcon={<CheckIcon />}
                sx={{ textTransform: 'none' }}
                onClick={props.handleConfirmOrder}
                disabled={isDisableBtn}
              >
                Xác nhận
              </Button>

              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                sx={{ textTransform: 'none' }}
                color="error"
                onClick={handleClose}
              >
                Hủy
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
