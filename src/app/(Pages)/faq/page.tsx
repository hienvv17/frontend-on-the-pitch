'use client';

'use client';

import React from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  Box,
  Card,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import UserLayout from '@/app/components/UserLayout';

const faqItems = [
  {
    question: 'Làm thế nào để đặt sân?',
    answer: 'Bạn có thể đặt sân qua website. Chọn sân, ngày giờ và thanh toán để hoàn tất đặt sân.',
  },
  {
    question: 'Phương thức thanh toán nào được chấp nhận?',
    answer:
      'Chúng tôi chấp nhận thanh toán online qua ZaloPay.',
  },
  {
    question: 'Tôi đã đặt sân, bây giờ tôi muốn hủy',
    answer:
      'Bạn có thể hủy đặt sân trước ngày sử dụng 48 giờ để được hoàn tiền 100%, từ 24 - 48 giờ trước ngày sử dụng sẽ được hoàn 70%, trước 24 giờ ngày sử dụng sẽ được hoàn 50%. Ít hơn 24 giờ sẽ không được hoàn tiền.',
  },
  {
    question: 'Sân có cung cấp dụng cụ thể thao không?',
    answer:
      'Một số sân có cung cấp dụng cụ thể thao, bạn vui lòng liên hệ số hỗ trợ khách hàng <strong>0989 789 789</strong>.',
  },
  {
    question: 'Tôi có thể đặt sân cho nhóm lớn không?',
    answer:
      'Có, bạn có thể liên hệ với chúng tôi để được tư vấn và đặt sân phù hợp với số lượng người chơi trong nhóm của bạn.',
  },
  {
    question: 'Giờ hoạt động của hệ thống là khi nào?',
    answer: 'Hệ thống hoạt động và nhận đặt sân từ 5 giờ sáng đến 23 giờ tối hàng ngày.',
  },
];

let theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff',
    },
    primary: {
      main: '#ff4e50',
    },
    text: {
      primary: '#222222',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: 1,
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#f9f9f9',
          color: '#222222',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          marginBottom: '12px',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '& .MuiAccordionSummary-expandIconWrapper svg': {
            color: '#ff4e50',
            fontSize: '1.6rem',
          },
        },
        content: {
          fontWeight: 600,
          fontSize: '1.1rem',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          color: '#444444',
          paddingTop: '0.5rem',
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

export default function FaqPage() {
  const isMobile = useMediaQuery('(max-width:400px)');
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
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
            height: 'fit-content',
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
              FAQ
            </Typography>
          </Box>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                // height: '100vh',
                py: 4,
                px: 2,
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Container
                disableGutters
                sx={{
                  width: '100%',
                  bgcolor: 'transparent',
                  borderRadius: 3,
                  p: 3,
                  height: 'auto',
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  userSelect: 'none',
                  boxSizing: 'border-box',
                }}
                aria-label="Câu hỏi thường gặp - Hệ thống cho thuê sân thể thao"
                role="region"
              >
                {faqItems.map(({ question, answer }, index) => (
                  <Accordion
                    key={index}
                    disableGutters
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`faq-content-${index}`}
                      id={`faq-header-${index}`}
                    >
                      {question}
                    </AccordionSummary>
                    <AccordionDetails id={`faq-content-${index}`}>
                      <Typography>{answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Container>
            </Box>
          </ThemeProvider>
        </Card>
      </Container>
    </UserLayout>
  );
}
