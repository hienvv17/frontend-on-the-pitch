'use client';
import { type SetStateAction, useContext, useEffect, useState } from 'react';
import UserLayout from '@/app/components/UserLayout';
import { useUserApiPrivate } from '@/api/user/user';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Chip,
  Card,
  CardContent,
  Skeleton,
  Button,
} from '@mui/material';
import {
  History,
  Receipt,
  CalendarMonth,
  Payments,
  Circle,
  Star,
  StarBorder,
  ArrowCircleDown,
} from '@mui/icons-material';
import AddRatingModal from '@/app/components/rating/AddRatingModal';
import ViewRatingModal from '@/app/components/rating/ViewRatingModal';
import { useRouter } from 'next/navigation';
import RefundPopup from '@/app/components/RefundPopup';
import { privateApi } from '@/api/base';
import { AppContext } from '@/app/contexts/AppContext';
import { msgDetail } from '@/utility/constant';
import PaymentNowPopUp from '@/app/components/PaymentNowPopup';

const allowedColors = [
  'default',
  'primary',
  'secondary',
  'error',
  'info',
  'success',
  'warning',
] as const;

type ChipColor = (typeof allowedColors)[number];

function getValidColor(input: string): ChipColor {
  return allowedColors.includes(input as ChipColor) ? (input as ChipColor) : 'default';
}
export default function BookingHistory() {
  const { POST_P } = useUserApiPrivate();
  const [history, setHistory] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [viewRatingModalOpen, setViewRatingModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openRefundPopup, setOpenRefundPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { setOpenSnackBar } = useContext(AppContext);
  const router = useRouter();
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await POST_P('/field-bookings/history');
      setHistory(data.data.items);
    } catch (error) {
      console.error('Error fetching booking history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleChangePage = (event: any, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return { color: 'success', label: 'Hoàn thành' };
      case 'PENDING':
        return { color: 'warning', label: 'Đang xử lý' };
      case 'REFUND':
        return { color: 'error', label: 'Đã hủy' };
      default:
        return { color: 'default', label: status };
    }
  };

  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount || 0);
  };

  const handleOpenRatingModal = (booking: any) => {
    setCurrentBooking(booking);
    setRatingModalOpen(true);
  };

  const handleOpenViewRatingModal = (booking: any) => {
    setCurrentBooking(booking);
    setViewRatingModalOpen(true);
  };

  const handleCloseRatingModal = () => {
    setRatingModalOpen(false);
  };

  const handleCloseViewRatingModal = () => {
    setViewRatingModalOpen(false);
    setCurrentBooking(null);
  };

  const handleRefund = (item: any) => {
    setSelectedItem(item);
    setOpenRefundPopup(true);
  };

  const handleRefundSubmit = async (reason: string, item: any) => {
    try {
      setIsLoading(true);
      const configApi = privateApi('');
      const response = await configApi.post('/refunds/request', {
        reason: reason,
        fieldBookingId: item.id,
      });

      if (response.status >= 200 && response.status < 300) {
        setOpenSnackBar({
          isOpen: true,
          msg: msgDetail[20],
          type: 'info',
        });

        setOpenRefundPopup(false);
      } else {
        throw new Error('Yêu cầu hoàn tiền không thành công');
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu hoàn tiền:', error);
      setOpenSnackBar({
        isOpen: true,
        msg: msgDetail[21],
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModalPaymentNow = (id: any) => {
    const booking = history.find((item: any) => item.id === id);
    console.log('booking', booking);
    if (booking) {
      setSelectedOrder(booking);
      setOpenPaymentPopup(true);
    }
  };

  console.log('history', history);
  return (
    <UserLayout>
      <Box
        sx={{
          width: '97%',
          py: 3,
          px: { xs: 1, md: 2 },
        }}
      >
        <Card
          elevation={3}
          sx={{
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box
            sx={{
              p: { xs: 2, md: 3 },
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
              background: 'linear-gradient(90deg, var(--Primary-500) 0%, var(--Primary-400) 100%)',
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <History fontSize="large" sx={{ color: '#fff' }} />
              <Typography variant="h5" fontWeight="700" sx={{ color: '#fff' }}>
                Lịch sử đặt sân
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1, opacity: 1, color: '#fff' }}>
              Xem lại các đơn đặt sân của bạn và trạng thái của chúng
            </Typography>
          </Box>

          <CardContent sx={{ p: { xs: 1, md: 2 } }}>
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                borderRadius: '8px',
                maxHeight: '60vh',
                backgroundColor: 'transparent',
              }}
            >
              <Table stickyHeader aria-label="booking history table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: 'var(--Primary-50)',
                        color: 'var(--Primary-700)',
                        borderBottom: '2px solid var(--Primary-200)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Receipt fontSize="small" />
                        Mã đơn
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: 'var(--Primary-50)',
                        color: 'var(--Primary-700)',
                        borderBottom: '2px solid var(--Primary-200)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Receipt fontSize="small" />
                        Chi nhánh - Số sân
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: 'var(--Primary-50)',
                        color: 'var(--Primary-700)',
                        borderBottom: '2px solid var(--Primary-200)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarMonth fontSize="small" />
                        Ngày đặt
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: 'var(--Primary-50)',
                        color: 'var(--Primary-700)',
                        borderBottom: '2px solid var(--Primary-200)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Receipt fontSize="small" />
                        Giờ đặt
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: 'var(--Primary-50)',
                        color: 'var(--Primary-700)',
                        borderBottom: '2px solid var(--Primary-200)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Payments fontSize="small" />
                        Tổng tiền
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: 'var(--Primary-50)',
                        color: 'var(--Primary-700)',
                        borderBottom: '2px solid var(--Primary-200)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Circle fontSize="small" />
                        Trạng thái
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: 'var(--Primary-50)',
                        color: 'var(--Primary-700)',
                        borderBottom: '2px solid var(--Primary-200)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ArrowCircleDown fontSize="small" />
                        Hành động
                      </Box>
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: 'var(--Primary-50)',
                        color: 'var(--Primary-700)',
                        borderBottom: '2px solid var(--Primary-200)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star fontSize="small" />
                        Đánh giá
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading ? (
                    // Loading skeleton
                    Array.from(new Array(5)).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton animation="wave" height={40} />
                        </TableCell>
                        <TableCell>
                          <Skeleton animation="wave" height={40} />
                        </TableCell>
                        <TableCell>
                          <Skeleton animation="wave" height={40} />
                        </TableCell>
                        <TableCell>
                          <Skeleton animation="wave" height={40} />
                        </TableCell>
                        <TableCell>
                          <Skeleton animation="wave" height={40} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : history.length > 0 ? (
                    history
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item: any, index: number) => {
                        const statusInfo = getStatusColor(item.status);

                        return (
                          <TableRow
                            key={index}
                            hover
                            sx={{
                              '&:nth-of-type(odd)': {
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                              },
                              transition: 'all 0.2s',
                              '&:hover': {
                                backgroundColor: 'rgba(var(--Primary-rgb), 0.05) !important',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                              },
                            }}
                          >
                            <TableCell sx={{ py: 2 }}>
                              <Typography variant="body2" fontWeight={500}>
                                #{item.id || `ORDER${1000 + index}`}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>
                              <Typography variant="body2">
                                {item.branchName} - {item.sportFieldName}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>
                              <Typography variant="body2">
                                {item.bookingDate || new Date().toLocaleDateString('vi-VN')}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>
                              <Typography variant="body2">
                                {item.startTime} - {item.endTime}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>
                              <Typography
                                variant="body2"
                                fontWeight={500}
                                sx={{ color: 'var(--Primary-700)' }}
                              >
                                {formatCurrency(item.totalPrice || 0)}
                                {formatCurrency(item.totalPrice || 0)}
                              </Typography>
                            </TableCell>

                            <TableCell sx={{ py: 2 }}>
                              <Chip
                                label={statusInfo.label}
                                color={getValidColor(statusInfo.color)}
                                size="small"
                                sx={{
                                  fontWeight: 500,
                                  minWidth: '90px',
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>
                              {(item.canRequestRefund === 'true' ||
                                item.canRequestRefund === true) && (
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="primary"
                                  onClick={() => handleRefund(item)}
                                  sx={{ textTransform: 'none', minWidth: 130 }}
                                >
                                  Hoàn tiền
                                </Button>
                              )}

                              {item.status === 'PENDING' && (
                                <Button
                                  variant="contained"
                                  size="small"
                                  color="primary"
                                  onClick={() => handleOpenModalPaymentNow(item.id)}
                                  sx={{ textTransform: 'none', minWidth: 130 }}
                                >
                                  Thanh toán ngay
                                </Button>
                              )}
                            </TableCell>

                            <TableCell sx={{ py: 2 }}>
                              {item.status === 'PAID' && (
                                <>
                                  {item?.reviewId ? (
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      color="primary"
                                      onClick={() => handleOpenViewRatingModal(item)}
                                      startIcon={<Star />}
                                      sx={{ textTransform: 'none' }}
                                    >
                                      Xem đánh giá
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="contained"
                                      size="small"
                                      color="primary"
                                      onClick={() => handleOpenRatingModal(item)}
                                      startIcon={<StarBorder />}
                                      sx={{ textTransform: 'none' }}
                                    >
                                      Đánh giá
                                    </Button>
                                  )}
                                </>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Box sx={{ textAlign: 'center', py: 3 }}>
                          <History
                            sx={{
                              fontSize: 60,
                              color: 'var(--Primary-200)',
                              mb: 2,
                            }}
                          />
                          <Typography variant="h6" color="text.secondary">
                            Chưa có lịch sử đặt sân
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Các đơn đặt sân của bạn sẽ xuất hiện ở đây
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={history.length || 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
              labelRowsPerPage="Số hàng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} của ${count !== -1 ? count : `nhiều hơn ${to}`}`
              }
              sx={{
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                mt: 2,
                '.MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon, .MuiTablePagination-displayedRows':
                  {
                    color: 'var(--Primary-700)',
                  },
              }}
            />
          </CardContent>
        </Card>
      </Box>
      <AddRatingModal
        open={ratingModalOpen}
        onClose={handleCloseRatingModal}
        booking={currentBooking}
        onSubmit={(stars, comment) => {
          if (currentBooking) {
            const updatedHistory = history.map((item: any) => {
              if (item.id === currentBooking.id) {
                return {
                  ...item,
                  rating: { stars, comment },
                };
              }
              return item;
            });
            setHistory(updatedHistory);
          }
        }}
        onSubmitSuccess={fetchHistory}
      />

      <ViewRatingModal
        open={viewRatingModalOpen}
        onClose={handleCloseViewRatingModal}
        booking={currentBooking}
      />
      <RefundPopup
        open={openRefundPopup}
        onClose={() => setOpenRefundPopup(false)}
        onSubmit={handleRefundSubmit}
        selectedItem={selectedItem}
      />

      <PaymentNowPopUp
        open={openPaymentPopup}
        onClose={() => setOpenPaymentPopup(false)}
        data={selectedOrder}
      />
    </UserLayout>
  );
}
