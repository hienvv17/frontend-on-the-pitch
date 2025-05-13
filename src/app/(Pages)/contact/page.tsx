'use client';

import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  Paper,
  useMediaQuery,
  useTheme,
  Card,
  Grid2,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import SmsIcon from '@mui/icons-material/Sms';
import UserLayout from '@/app/components/UserLayout';

export default function ContactPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formErrors, setFormErrors] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
    setSubmitSuccess(false);
  };

  const validate = () => {
    const errors = { name: '', email: '', phone: '', message: '' };
    if (!formData.name.trim()) errors.name = 'Vui lòng nhập họ tên';
    if (!formData.email.trim()) {
      errors.email = 'Vui lòng nhập email';
    } else {
      // basic email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) errors.email = 'Email không hợp lệ';
    }
    if (!formData.phone.trim()) errors.phone = 'Vui lòng nhập số điện thoại';
    if (!formData.message.trim()) errors.message = 'Vui lòng nhập nội dung liên hệ';
    return errors;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      // Here you would normally send the message to your backend or API
      // For demo, just show success message
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      setFormErrors(errors);
      setSubmitSuccess(false);
    }
  };

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
              height: { xs: 20, md: 50 },
              bgcolor: 'var(--Primary-500)',
              backgroundImage:
                'linear-gradient(135deg, var(--Primary-600) 0%, var(--Primary-400) 100%)',
              display: 'flex',
              alignItems: 'center',
              px: 3,
              py: 2,
            }}
          >
            <Typography variant="h5" fontWeight={700} color="white">
              Liên hệ
            </Typography>
          </Box>

          <Container sx={{ py: 4 }}>
            <Typography variant="body1" align="center" sx={{ mb: 4, color: 'var(--Primary-700)' }}>
              Chúng tôi rất hân hạnh được phục vụ bạn! Nếu có bất kỳ thắc mắc nào về việc đặt sân
              hoặc các dịch vụ của chúng tôi, vui lòng liên hệ qua các kênh dưới đây.
            </Typography>

            <Grid container spacing={4}>
              {/* Contact Info */}
              <Grid item xs={12} md={12}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    py: 2,
                    height: '100%',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Grid2 container direction="column" sx={{ gap: 2, height: '100%' }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Thông tin liên hệ
                    </Typography>
                    <Grid2
                      container
                      direction="column"
                      sx={{ gap: 2, justifyContent: 'space-between' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PhoneIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1" noWrap>
                          <strong>Số điện thoại:</strong> 0989 789 789
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <EmailIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1" noWrap>
                          <strong>Email:</strong> supportOTP@gmail.com
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1">
                          <strong>Địa chỉ:</strong> Số 123, Đường Lê Lai, Quận 1, TP. Hồ Chí Minh
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          mb: 1,
                        }}
                      >
                        <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Giờ làm việc:
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 3 }}>
                            Thứ 2 - Thứ 6: 8:00 - 21:00
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 3 }}>
                            Thứ 7 - Chủ nhật: 8:00 - 22:00
                          </Typography>
                        </Box>
                      </Box>
                    </Grid2>
                  </Grid2>
                </Paper>
              </Grid>

              {/* Contact Form */}
              {/* <Grid item xs={12} md={7}>
                                <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', height: '100%' }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Biểu mẫu liên hệ
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 2 }}>
                                        Vui lòng điền thông tin bên dưới, chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <TextField
                                            label="Họ tên"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            error={!!formErrors.name}
                                            helperText={formErrors.name}
                                            fullWidth
                                            required
                                        />
                                        <TextField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            error={!!formErrors.email}
                                            helperText={formErrors.email}
                                            fullWidth
                                            required
                                        />
                                        <TextField
                                            label="Số điện thoại"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            error={!!formErrors.phone}
                                            helperText={formErrors.phone}
                                            fullWidth
                                            required
                                        />
                                        <TextField
                                            label="Nội dung"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            error={!!formErrors.message}
                                            helperText={formErrors.message}
                                            multiline
                                            rows={4}
                                            fullWidth
                                            required
                                        />
                                        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
                                            <Button variant="contained" color="primary" type="submit" size="large">
                                                Gửi liên hệ
                                            </Button>
                                        </Box>
                                        {submitSuccess && (
                                            <Typography variant="body1" sx={{ color: 'success.main' }}>
                                                Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                                            </Typography>
                                        )}
                                    </Box>
                                </Paper>
                            </Grid> */}
            </Grid>

            {/* Map Section */}
            <Box sx={{ mt: 10 }}>
              <Typography
                component="h2"
                gutterBottom
                sx={{ textAlign: 'center', color: 'var(--Primary-700)' }}
              >
                Bản đồ vị trí trụ sở
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: isMobile ? 300 : 400,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                }}
              >
                <iframe
                  title="Vị trí trụ sở"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2771.5327454303615!2d106.69310304658048!3d10.769952811527578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4742c26a41%3A0xf609e1e707f70bba!2zxJAuIEzDqiBMYWksIFF14bqtbiAxLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1746715619180!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Box>

            {/* <Box sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
                            <Typography variant="body2">
                                Nếu bạn cần hỗ trợ khẩn cấp, hãy gọi ngay số điện thoại trên hoặc nhắn tin để được trợ giúp nhanh nhất.
                            </Typography>
                        </Box> */}
          </Container>
        </Card>
      </Container>
    </UserLayout>
  );
}
