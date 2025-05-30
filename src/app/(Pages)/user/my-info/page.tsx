'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import ImageKit from 'imagekit-javascript';

import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  CircularProgress,
  Paper,
  Card,
  CardContent,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid as MuiGrid,
  alpha,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import {
  Person,
  Clear,
  Save,
  LocalOffer,
  ExpandMore,
  CalendarMonth,
  CheckCircle,
  Edit,
  PhotoCamera,
} from '@mui/icons-material';
import UserLayout from '@/app/components/UserLayout';
import { AppContext } from '@/app/contexts/AppContext';
import { useUserApiPrivate } from '@/api/user/user';
import { UserInfo, UserUpdateData } from '@/types/UserType';
import { msgDetail, ROUTES } from '@/utility/constant';
import { useUploadAuthApi } from '@/api/auth/upload-auth';
import Image from '@/app/components/Image';
import { privateApi } from '@/api/base';

export default function MyInfo() {
  const { setIsChangeCtx, user, setUser, setOpenSnackBar } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(0);
  const [expandedVoucher, setExpandedVoucher] = useState<number | false>(false);
  const { GET_UPLOAD_AUTH } = useUploadAuthApi();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [myVouchers, setMyVouchers] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: '',
    phoneNumber: '',
    image: '',
    email: '',
  });

  const [updateData, setUpdateData] = useState<UserUpdateData>({
    fullName: '',
    phoneNumber: '',
    image: '',
  });

  const [isChange, setIsChange] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDiscard, setIsDiscard] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { GET_P, POST_P } = useUserApiPrivate();


  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await GET_P(ROUTES.USERS + '/profile');
        setUserInfo(data.user);
        setUpdateData({
          fullName: data.user.fullName,
          phoneNumber: data.user.phoneNumber,
          image: data.user.image ? data.user.image : '',
        });
        setUser((prev: any) => ({
          ...prev,
          fullName: data.user.fullName,
          phoneNumber: data.user.phoneNumber,
          image: data.user.image ? data.user.image : '',
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [isUpdate]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // console.log("file", file);
    if (file) {
      const maxSize = 2000 * 1024;
      if (file.size > maxSize) {
        setOpenSnackBar({ isOpen: true, msg: msgDetail[7], type: 'error' });
        return;
      }

      setOpenSnackBar({ isOpen: false, msg: msgDetail[16], type: 'info' });

      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdateData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
      setIsChange(false);
      setIsDiscard(false);
      // Đặt lại giá trị của input file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDiscard(false);
    const { name, value } = e.target;
    if (name === 'email') {
      return;
    }
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'phoneNumber') {
      setIsChange(true);
      return;
    }
    setIsChange(false);
  };

  const validatePhone = (value: string) => {
    const trimValue = value.replaceAll(' ', '');

    if (trimValue === '') {
      setOpenSnackBar({ isOpen: false, msg: msgDetail[16], type: 'info' });
      return;
    }

    const phoneRegex =
      /^([+]?84|0)((3[2-9]{1})|(5[2689]{1})|(7[06789]{1})|(8[123458]{1})|(9[01236789]{1}))[0-9]{7}$/;
    if (!phoneRegex.test(trimValue)) {
      setOpenSnackBar({ isOpen: true, msg: msgDetail[8], type: 'error' });
      setIsChange(true);
    } else {
      setOpenSnackBar({ isOpen: false, msg: msgDetail[16], type: 'info' });
      setIsChange(false);
    }
  };

  const handleBlur = () => {
    if (!updateData.phoneNumber) {
      return;
    }
    validatePhone(updateData.phoneNumber);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      let urlImage = '';
      if (selectedFile) {
        const data = await GET_UPLOAD_AUTH();
        const { signature, expire, token, publicKey } = data;
        const imagekit = new ImageKit({
          urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
          publicKey,
        });

        const uploadResponse = await imagekit.upload({
          file: selectedFile, // can be file object or base64 string
          fileName: selectedFile.name,
          token,
          expire,
          signature,
        });
        urlImage = uploadResponse.url;
        localStorage.setItem('userAvatar', JSON.stringify(urlImage));
        setIsChangeCtx((prev: boolean) => !prev);
      }
      await POST_P(ROUTES.USERS + '/update-profile', {
        fullName: updateData.fullName,
        phoneNumber: !updateData.phoneNumber ? '' : '0' + updateData.phoneNumber.slice(-9),
        image: urlImage || '',
      });
      setIsUpdate((prev) => !prev);
      setIsDiscard(true);
      setIsChange(true);
      setOpenSnackBar({ isOpen: true, msg: msgDetail[11], type: 'info' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setOpenSnackBar({
        isOpen: true,
        msg: 'Cập nhật thất bại',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    setUpdateData({
      fullName: userInfo.fullName,
      phoneNumber: userInfo.phoneNumber,
      image: userInfo.image ? userInfo.image : '',
    });
    setOpenSnackBar({ isOpen: true, msg: msgDetail[10], type: 'warning' });
    setIsDiscard(true);
    setIsChange(true);
    setSelectedFile(null); // Đặt lại selectedFile về null
    setIsUpdate((prev) => !prev);
  };


  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const getDataVouchers = async () => {
      try {
        setIsLoading(true);
        const configApi = privateApi('');
        const response = await configApi.get('/vouchers/my-voucher');
        setMyVouchers(response.data.items);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getDataVouchers();
  }, []);
  const handleCopyCode = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setOpenSnackBar({
          isOpen: true,
          msg: msgDetail[18] + code,
          type: 'info',
        });
      })
      .catch(() => {
        setOpenSnackBar({ isOpen: true, msg: msgDetail[19], type: 'error' });
      });
  };

  const handleVoucherExpand =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedVoucher(isExpanded ? panel : false);
    };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (isLoading && !user) {
    return (
      <UserLayout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
          }}
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: 'var(--Primary-500)',
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: 'var(--Primary-700)',
              fontWeight: 500,
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': { opacity: 0.6 },
                '50%': { opacity: 1 },
                '100%': { opacity: 0.6 },
              },
            }}
          >
            Đang tải thông tin...
          </Typography>
        </Box>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            mb: 4,
          }}
        >
          {/* Header with background */}
          <Box
            sx={{
              position: 'relative',
              height: 50,
              bgcolor: 'var(--Primary-500)',
              backgroundImage:
                'linear-gradient(135deg, var(--Primary-600) 0%, var(--Primary-400) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              px: 3,
              pb: 2,
            }}
          >
            <Typography variant="h5" fontWeight={700} color="white">
              Thông tin cá nhân
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                py: 2,
              },
              '& .Mui-selected': {
                color: 'var(--Primary-600)',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'var(--Primary-500)',
                height: 3,
              },
            }}
          >
            <Tab
              icon={<Person sx={{ mr: 1 }} />}
              iconPosition="start"
              label="Thông tin tài khoản"
              sx={{ display: 'flex' }}
            />
            <Tab
              icon={<LocalOffer sx={{ mr: 1 }} />}
              iconPosition="start"
              label="Voucher của tôi"
              sx={{ display: 'flex' }}
            />
          </Tabs>

          <CardContent sx={{ p: 0 }}>
            {/* Profile Tab */}
            {activeTab === 0 && (
              <Box
                sx={{
                  p: { xs: 2, md: 4 },
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Grid2 container spacing={4} justifyContent={"center"}>
                  {/* Avatar Section */}
                  <MuiGrid item xs={12} sm={4}
                    sx={{
                      height: { xs: "fit-content", lg: "100%" },
                      width: { xs: "100%", lg: "auto" }
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '100%', // đảm bảo cao bằng với form section nếu muốn
                        // width: { xs: "100%" }
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          width: 180,
                          height: 180,
                          mb: 2,
                        }}
                      >
                        {updateData.image ? (
                          <Image
                            src={updateData.image}
                            alt={userInfo.fullName || 'User'}
                            fill
                            style={{
                              objectFit: 'cover',
                              borderRadius: '50%',
                              border: '4px solid white',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                            }}
                          />
                        ) :
                          <Box
                            sx={{
                              borderRadius: '50%',
                              border: '4px solid white',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                              justifyItems: "center",
                              alignContent: "center",
                              height: "100%"
                            }}
                          >
                            <Typography>
                              Chưa có ảnh
                            </Typography>
                          </Box>}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            bgcolor: 'var(--Primary-500)',
                            borderRadius: '50%',
                            p: 0.5,
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                          }}
                        >
                          <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="change-avatar"
                            type="file"
                            onChange={handleFileChange}
                            ref={fileInputRef} // Thêm ref vào input
                          />
                          <Tooltip title="Thay đổi ảnh đại diện" placement="top">
                            <label htmlFor="change-avatar">
                              <IconButton
                                component="span"
                                size="small"
                                sx={{
                                  color: 'white',
                                  '&:hover': {
                                    bgcolor: alpha('#fff', 0.1),
                                  },
                                }}
                              >
                                <PhotoCamera fontSize="small" />
                              </IconButton>
                            </label>
                          </Tooltip>
                        </Box>
                      </Box>

                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {userInfo.fullName || 'Chưa cập nhật'}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        sx={{ mb: 2 }}
                      >
                        Dung lượng ảnh tối đa 2 MB
                        <br />
                        Định dạng: JPEG, JPG, PNG
                      </Typography>
                    </Paper>
                  </MuiGrid>

                  {/* Form Section */}
                  <MuiGrid item xs={12} sm={8}
                    sx={{
                      height: { xs: "fit-content", lg: "100%" },
                      width: { xs: "100%", lg: "auto" }
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: 'divider',
                        height: '100%',
                        // width: { xs: "100%" }
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
                      >
                        <Edit sx={{ mr: 1, color: 'var(--Primary-500)' }} fontSize="small" />
                        Chỉnh sửa thông tin
                      </Typography>

                      <Grid2 container spacing={{ xs: 3, md: 2 }} justifyContent={{ md: "space-between" }}>
                        <MuiGrid item xs={12} sm={4}
                          sx={{ width: { xs: "100%", md: "auto" } }}
                        >
                          <TextField
                            fullWidth
                            label="Họ tên"
                            name="fullName"
                            value={updateData.fullName || ''}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                              },
                            }}
                          />
                        </MuiGrid>

                        <MuiGrid item xs={12} sm={4}
                          sx={{ width: { xs: "100%", md: "auto" } }}
                        >
                          <TextField
                            fullWidth
                            disabled
                            label="Email"
                            name="email"
                            value={userInfo?.email || ''}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                              },
                            }}
                          />
                        </MuiGrid>

                        <MuiGrid item xs={12} sm={4}
                          sx={{ width: { xs: "100%", md: "auto" } }}
                        >
                          <TextField
                            fullWidth
                            label="Số điện thoại"
                            name="phoneNumber"
                            value={updateData?.phoneNumber || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                              },
                            }}
                          />
                        </MuiGrid>
                      </Grid2>

                      <Divider sx={{ my: 4 }} />

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 2,
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Clear />}
                          onClick={handleDiscard}
                          disabled={isDiscard}
                          sx={{
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                          }}
                        >
                          Hủy thay đổi
                        </Button>

                        <Button
                          variant="contained"
                          startIcon={isLoading ? null : <Save />}
                          onClick={handleSave}
                          disabled={isChange || isLoading}
                          sx={{
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            background:
                              'linear-gradient(90deg, var(--Primary-600) 0%, var(--Primary-500) 100%)',
                            '&:hover': {
                              background:
                                'linear-gradient(90deg, var(--Primary-700) 0%, var(--Primary-600) 100%)',
                            },
                          }}
                        >
                          {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            'Lưu thay đổi'
                          )}
                        </Button>
                      </Box>
                    </Paper>
                  </MuiGrid>
                </Grid2>
              </Box>
            )}

            {/* Vouchers Tab */}
            {activeTab === 1 && (
              <Box sx={{ p: { xs: 2, md: 4 } }}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
                >
                  <LocalOffer sx={{ mr: 1, color: 'var(--Primary-500)' }} fontSize="small" />
                  Voucher của tôi
                </Typography>

                {myVouchers.length > 0 ? (
                  <Box sx={{ mb: 4 }}>
                    {myVouchers.map((voucher) => (
                      <Accordion
                        key={voucher.id}
                        expanded={expandedVoucher === voucher.id}
                        onChange={handleVoucherExpand(voucher.id)}
                        sx={{
                          mb: 2,
                          borderRadius: '12px !important',
                          overflow: 'hidden',
                          border: '1px solid',
                          borderColor: 'divider',
                          '&:before': { display: 'none' },
                          boxShadow: 'none',
                          '&.Mui-expanded': {
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          sx={{
                            backgroundColor:
                              voucher.status === 'ACTIVE'
                                ? alpha('#f5f5f5', 0.5)
                                : alpha('#f5f5f5', 0.8),
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              width: '100%',
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                bgcolor:
                                  voucher.status === 'ACTIVE' ? 'var(--Primary-50)' : '#f5f5f5',
                                mr: 2,
                                border: '1px solid',
                                borderColor:
                                  voucher.status === 'ACTIVE' ? 'var(--Primary-200)' : 'divider',
                              }}
                            >
                              <LocalOffer
                                sx={{
                                  color:
                                    voucher.status === 'ACTIVE'
                                      ? 'var(--Primary-500)'
                                      : 'text.disabled',
                                }}
                              />
                            </Box>

                            <Box sx={{ flexGrow: 1 }}>
                              <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                sx={{
                                  color:
                                    voucher.status === 'ACTIVE' ? 'text.primary' : 'text.disabled',
                                }}
                              >
                                {voucher.code}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    voucher.status === 'ACTIVE'
                                      ? 'text.secondary'
                                      : 'text.disabled',
                                }}
                              >
                                Giảm {voucher.percentDiscount}% tối đa{' '}
                                {new Intl.NumberFormat('vi-VN').format(voucher.maxDiscountAmount)}đ
                                cho đơn từ{' '}
                                {new Intl.NumberFormat('vi-VN').format(voucher.minBookingAmount)}đ
                              </Typography>
                            </Box>

                            <Chip
                              label={voucher.status === 'ACTIVE' ? 'Còn hiệu lực' : 'Hết hạn'}
                              color={voucher.status === 'ACTIVE' ? 'success' : 'default'}
                              size="small"
                              sx={{ fontWeight: 500 }}
                            />
                          </Box>
                        </AccordionSummary>

                        <AccordionDetails sx={{ p: 3 }}>
                          <MuiGrid container spacing={2}>
                            <MuiGrid item xs={12} sm={8}>
                              <Typography variant="body1" fontWeight={500} gutterBottom>
                                {voucher.description}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" paragraph>
                                Áp dụng cho các đơn đặt sân có giá trị từ{' '}
                                {new Intl.NumberFormat('vi-VN').format(voucher.minBookingAmount)}
                                đ.
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  mt: 2,
                                }}
                              >
                                <Button
                                  variant="outlined"
                                  size="small"
                                  disabled={voucher.status == 'INACTIVE'}
                                  onClick={() => handleCopyCode(voucher.code)}
                                  sx={{
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                  }}
                                >
                                  Sao chép mã
                                </Button>
                              </Box>
                            </MuiGrid>

                            <MuiGrid item xs={12} sm={4}>
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 2,
                                  borderRadius: '10px',
                                  bgcolor: 'var(--Primary-50)',
                                  border: '1px dashed var(--Primary-200)',
                                }}
                              >
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  Thông tin
                                </Typography>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                  }}
                                >
                                  <CalendarMonth
                                    fontSize="small"
                                    sx={{ color: 'var(--Primary-500)', mr: 1 }}
                                  />
                                  <Typography variant="body2">
                                    HSD: {formatDate(voucher.validTo)}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <CheckCircle
                                    fontSize="small"
                                    sx={{
                                      color:
                                        voucher.status === 'ACTIVE'
                                          ? 'success.main'
                                          : 'text.disabled',
                                      mr: 1,
                                    }}
                                  />
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color:
                                        voucher.status === 'ACTIVE'
                                          ? 'text.primary'
                                          : 'text.disabled',
                                    }}
                                  >
                                    {voucher.status === 'ACTIVE' ? 'Có thể sử dụng' : 'Đã hết hạn'}
                                  </Typography>
                                </Box>
                              </Paper>
                            </MuiGrid>
                          </MuiGrid>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 6,
                      px: 2,
                      backgroundColor: 'var(--Primary-50)',
                      borderRadius: '16px',
                      border: '1px dashed var(--Primary-200)',
                    }}
                  >
                    <LocalOffer
                      sx={{
                        fontSize: 60,
                        color: 'var(--Primary-200)',
                        mb: 2,
                        opacity: 0.7,
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="var(--Primary-700)"
                      fontWeight={600}
                      gutterBottom
                    >
                      Bạn chưa có voucher nào
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ maxWidth: '600px', mx: 'auto', mb: 3 }}
                    >
                      Hãy tham gia các chương trình khuyến mãi hoặc tích điểm để nhận voucher giảm
                      giá.
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </UserLayout>
  );
}
