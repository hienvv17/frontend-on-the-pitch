"use client"

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
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid",
                        borderColor: "divider",
                        mb: 4,
                    }}
                >
                    {/* Header with background */}
                    <Box
                        sx={{
                            position: "relative",
                            height: { xs: 20, md: 50 },
                            bgcolor: "var(--Primary-500)",
                            backgroundImage:
                                "linear-gradient(135deg, var(--Primary-600) 0%, var(--Primary-400) 100%)",
                            display: "flex",
                            alignItems: "flex-end",
                            px: 3,
                            pb: 2,
                        }}
                    >
                        <Typography variant="h5" fontWeight={700} color="white">
                            Liên hệ
                        </Typography>
                    </Box>

                    <Container sx={{ py: 4 }}>
                        <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
                            Chúng tôi rất hân hạnh được phục vụ bạn! Nếu bạn có bất kỳ thắc mắc nào về việc đặt sân hoặc các dịch vụ của chúng tôi,
                            vui lòng liên hệ qua các kênh dưới đây hoặc gửi tin nhắn trực tiếp qua mẫu liên hệ.
                        </Typography>

                        <Grid container spacing={4}>
                            {/* Contact Info */}
                            <Grid item xs={12} md={5}>
                                <Paper elevation={3} sx={{ p: 3, height: '100%', bgcolor: 'background.paper' }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Thông tin liên hệ
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <PhoneIcon color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1" noWrap>
                                            <strong>Số điện thoại:</strong> 0123 456 789
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <EmailIcon color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1" noWrap>
                                            <strong>Email:</strong> support@sandanththethao.vn
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            <strong>Địa chỉ:</strong> Số 123, Đường Thể Thao, Quận 1, TP. Hồ Chí Minh
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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

                                    <Box sx={{ mt: 3 }}>
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            Theo dõi chúng tôi
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <Link href="https://facebook.com/sandanththethao" target="_blank" rel="noopener" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <FacebookIcon color="primary" /> Facebook
                                            </Link>
                                            <Link href="https://instagram.com/sandanththethao" target="_blank" rel="noopener" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <InstagramIcon color="secondary" /> Instagram
                                            </Link>
                                            <Link href="https://zalo.me/sandanththethao" target="_blank" rel="noopener" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <SmsIcon color="success" /> Zalo
                                            </Link>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Contact Form */}
                            <Grid item xs={12} md={7}>
                                <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', height: '100%' }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Mẫu liên hệ nhanh
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
                            </Grid>
                        </Grid>

                        {/* Map Section */}
                        <Box sx={{ mt: 10 }}>
                            <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
                                Bản đồ vị trí
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
                                    title="Vị trí sân thể thao"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.274934404955!2d106.69520611526055!3d10.771567762316404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed60c5aa8a9%3A0x65db4ab372f5e401!2zU2FuZyDEkeG6uWkgVMOgbmggQuG7g24gVGjhuqFjIEPhuqduIFRo4bqhbywgUXXhuq1uIDEgTmfDsywgVFAuIEjDoCBOaOG6rXAsIEjDoCBOaOG7pyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1692573928846!5m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </Box>
                        </Box>

                        <Box sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
                            <Typography variant="body2">
                                Nếu bạn cần hỗ trợ khẩn cấp, hãy gọi ngay số điện thoại trên hoặc nhắn tin để được trợ giúp nhanh nhất.
                            </Typography>
                        </Box>
                    </Container>
                </Card>
            </Container>
        </UserLayout>
    );
}
// </content>
// </create_file>

// <attempt_completion>
// Tôi đã tạo sẵn một trang Liên hệ hiện đại, responsive, sử dụng Next.js, React và Material-UI với đầy đủ các nội dung bằng tiếng Việt mà bạn mong muốn:

// - Hiển thị thông tin liên hệ (SĐT, email, địa chỉ, giờ làm việc)
// - Mẫu form liên hệ với các trường hợp lệ và thông báo lỗi rõ ràng
// - Liên kết mạng xã hội Facebook, Instagram, Zalo
// - Bản đồ vị trí Google Maps nhúng sẵn
// - Thiết kế thân thiện với người dùng trên thiết bị di động, vừa vặn không cần cuộn màn hình quá nhiều.

// Bạn có thể lưu file này với tên `pages/contact.js` trong dự án Next.js của bạn và chạy dev server (`npm run dev` hoặc `yarn dev`) để xem kết quả.

// Nếu bạn muốn tôi hỗ trợ thêm về backend gửi form hoặc cải tiến giao diện, bạn cứ nói nhé!
// </attempt_completion>
