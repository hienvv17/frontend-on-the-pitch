import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
  DialogActions,
  Button,
  useTheme,
  alpha,
  styled,
  Grid as MuiGrid,
  TextField,
  IconButton,
  Grid
} from '@mui/material';
import { privateApi } from '@/api/base';
import { formatPrice } from '@/utility/formatPrice';


interface PaymentNowPopUpProps {
  open: boolean;
  onClose: () => void;
  data: {
    code: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
    latestPaymentDate: string;
    originPrice: number;
    discountAmount: number;
    totalPrice: number;
    voucherCode: string | null;
    userEmail: string;
    phoneNumber: string;
    branchName: string;
    sportFieldName: string;
    sportCategoryName: string;
  };
}

const formatCurrency = (amount: number) =>
  `${amount.toLocaleString('vi-VN')}đ`;

const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  transition: 'transform 0.3s ease',
  
}));

const PaymentNowPopUp: React.FC<PaymentNowPopUpProps> = ({ open, onClose, data }) => {
    const [voucherInput, setVoucherInput] = useState('');
      const [voucherError, setVoucherError] = useState('');
  const [voucherData, setVoucherData] = useState<any>(null);
  const [voucherCode, setVoucherCode] = useState('');
  const [isValidatingVoucher, setIsValidatingVoucher] = useState(false);
    
  const theme = useTheme();
  if (!data) return null;

  const InfoBlock = ({ title, children, icon }: { title: string; children: React.ReactNode; icon?: string }) => (
    <GradientBox>
      <Typography variant="subtitle1" fontWeight="bold" mb={1} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon && <span style={{ fontSize: '1.2rem' }}>{icon}</span>}
        {title}
      </Typography>
      {children}
    </GradientBox>
  );
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
  
        const total = data?.originPrice || 0;
        if (total < voucher.minBookingAmount) {
          setVoucherError(
            `Đơn hàng tối thiểu ${formatPrice(voucher.minBookingAmount)} để áp dụng voucher`,
          );
          setVoucherData(null);
          return;
        }
        setVoucherData(voucher);
        setVoucherError('');
      } catch (error: any) {
        setVoucherError('Voucher không hợp lệ');
        setVoucherData(null);
      }
    };
  const handleApplyVoucher = () => {
    console.log('Applying voucher:', voucherInput);
  };
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: theme.palette.background.default,
          maxWidth: '600px' // Giới hạn chiều rộng tối đa
        }
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          color:"#fff",
          fontSize: '1.8rem',
          background: "#65A8F9",
          py: 1,
          textAlign: 'center',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '2px',
           
          }
        }}
      >
        🏆 Chi tiết thanh toán
      </DialogTitle>

      <DialogContent sx={{ mt: 1, px: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
               <InfoBlock title="Thông tin sân bóng" icon="⚽">
            <Grid container spacing={2}>
              
              <Grid item xs={4}>
                <Typography variant="body2"><strong>Tên sân:</strong></Typography>
                <Typography variant="body2" color="text.secondary">{data.sportFieldName}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2"><strong>Loại hình:</strong></Typography>
                <Typography variant="body2" color="text.secondary">{data.sportCategoryName}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2"><strong>Chi nhánh:</strong></Typography>
                <Typography variant="body2" color="text.secondary">{data.branchName}</Typography>
              </Grid>
            </Grid>
          </InfoBlock>
          <InfoBlock title="Thông tin đặt sân" icon="📅">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2"><strong>Mã đơn:</strong></Typography>
                <Typography variant="body2" color="text.secondary">{data.code}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2"><strong>Ngày đặt:</strong></Typography>
                <Typography variant="body2" color="text.secondary">{data.bookingDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2"><strong>Khung giờ:</strong></Typography>
                <Typography variant="body2" color="text.secondary">{data.startTime} - {data.endTime}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2"><strong>Hạn thanh toán:</strong></Typography>
                <Typography variant="body2" color="error">{data.latestPaymentDate}</Typography>
              </Grid>
            </Grid>
          </InfoBlock>

          <InfoBlock title="Thông tin khách hàng" icon="👤">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2"><strong>Email:</strong></Typography>
                <Typography variant="body2" color="text.secondary">{data.userEmail}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2"><strong>Điện thoại:</strong></Typography>
                <Typography variant="body2" color="text.secondary">{data.phoneNumber}</Typography>
              </Grid>
            </Grid>
          </InfoBlock>

       

          <InfoBlock title="Chi tiết thanh toán" icon="💳">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2"><strong>Giá gốc:</strong></Typography>
                <Typography variant="body2" color="#000"><strong>{formatCurrency(data.originPrice)}</strong></Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2"><strong>Giảm giá:</strong></Typography>
                <Typography variant="body2" color="#000"><strong>-{formatCurrency(data.discountAmount)}</strong></Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2"><strong>Voucher:</strong></Typography>
                <Typography variant="body2" color="#000"><strong>{data.voucherCode || '--'}</strong></Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" ><strong>Tổng thanh toán:</strong></Typography>
                <Typography variant="body2" color="#000"><strong> {formatCurrency(data.totalPrice)}</strong></Typography>
              </Box>
              
            </Box>
          </InfoBlock>
          {data.voucherCode === null && data.discountAmount === 0 && (
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
                <MuiGrid item xs={5}>
                  <TextField
                    size="small"
                label="Nhập mã voucher"
                variant="outlined"
                value={voucherInput}
                onChange={(e) => setVoucherInput(e.target.value)}
                sx={{
                    marginTop:3
                }}
                  />
                  {!!voucherError && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ ml: 0, mt: 0.5, display: 'block' }}
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
                    disabled={isValidatingVoucher || !voucherInput.trim()}
                    sx={{ mt: 3, textTransform: 'none', px:2, py:1 }}
                  >
                    {isValidatingVoucher ? '...' : 'Áp dụng'}
                  </Button>
                </MuiGrid>
              </Grid>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3, justifyContent: 'center' }}>
        <Button 
          onClick={onClose} 
          variant="contained" 
          sx={{
            borderRadius: 50,
            px: 6,
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: theme.shadows[4]
            },
            transition: 'all 0.3s ease'
          }}
        >
          Xác nhận thanh toán
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentNowPopUp;