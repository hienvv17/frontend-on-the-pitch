"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { publicApi } from "@/api/base";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const HeroVideo = styled("video")({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -1,
});

const HeroOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: -1,
});

const PaymentDonePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<null | "success" | "fail">(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apptransid = searchParams.get("apptransid");
    const paymentStatus = searchParams.get("status");

    if (!apptransid || !paymentStatus) {
      setStatus("fail");
      setLoading(false);
      return;
    }

    const checkStatus = async () => {
      try {
        const configApi = publicApi("");
        const response = await configApi.get("/payment/check-status", {
          params: {
            appTransId: apptransid,
            status: paymentStatus,
          },
        });

        if (paymentStatus === "1") {
          setStatus("success");
        } else {
          setStatus("fail");
        }
      } catch (error) {
        console.error("Check payment status failed:", error);
        setStatus("fail");
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [searchParams]);

  const handleGoHome = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography ml={2}>Đang kiểm tra trạng thái thanh toán...</Typography>
      </Box>
    );
  }

 return (
  <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
          <HeroVideo autoPlay muted loop>
            <source
              src="https://videos.pexels.com/video-files/5489581/5489581-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </HeroVideo>
          <HeroOverlay />
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      zIndex={1}
      position="relative"
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 3,
          textAlign: "center",
          maxWidth: 500,
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack spacing={3} alignItems="center">
          {status === "success" ? (
            <>
              <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
              <Typography variant="h4" fontWeight="bold" color="success.main">
                🎉 Thanh toán thành công!
              </Typography>
              <Typography variant="body1" color="text.secondary" fontSize="1.1rem">
                Chúng tôi đã nhận được thanh toán của bạn.
              </Typography>
              <Typography variant="body2" color="text.secondary" fontSize="1.1rem">
                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Chúc bạn có một trải nghiệm tuyệt vời trên sân cỏ! ⚽
              </Typography>
            </>
          ) : (
            <>
              <ErrorOutlineIcon color="error" sx={{ fontSize: 60 }} />
              <Typography variant="h4" fontWeight="bold" color="error.main">
                ❌ Thanh toán thất bại!
              </Typography>
              <Typography variant="body1" color="text.secondary" fontSize="1.1rem">
                Có thể giao dịch đã bị gián đoạn hoặc bị huỷ. <br />
                Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
              </Typography>
              <Typography variant="body1" color="text.secondary" fontSize="1.1rem">
                Nếu bạn đã bị trừ tiền mà không thấy đơn đặt sân, hãy liên hệ bộ phận hỗ trợ để được xử lý kịp thời.
              </Typography>
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleGoHome}
            sx={{ mt: 2 }}
          >
            Quay về trang chủ
          </Button>
        </Stack>
      </Paper>
    </Box>
  </Box>
);

};

export default PaymentDonePage;
