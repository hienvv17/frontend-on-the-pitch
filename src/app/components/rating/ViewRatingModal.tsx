"use client"

import { Box, Typography, Button, Modal, Rating, Stack, Paper } from "@mui/material"

interface ViewRatingModalProps {
  open: boolean
  onClose: () => void
  booking: any | null
}

export default function ViewRatingModal({ open, onClose, booking }: ViewRatingModalProps) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="view-rating-modal-title">
      <Box
        sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            p: { xs: 2, sm: 3 },
            overflow: "hidden",
          }}
      >
        <Typography
        id="rating-modal-title"
        variant="h5"
        fontWeight={600}
        color="text.primary"
        gutterBottom
        >
      Đánh giá dịch vụ
    </Typography>

        {booking && booking.rating && (
          <>
            <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={500}>
            {booking.branchName} - {booking.sportFieldName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {booking.day} | {booking.startTime} - {booking.endTime}
            </Typography>
            </Box>

            <Stack spacing={3} sx={{ mt: 2 }}>
              <Box>
                <Typography component="legend" gutterBottom>
                  Số sao đánh giá
                </Typography>
                <Rating name="read-only-rating" value={booking.rating.stars} readOnly precision={0.5} size="large" />
              </Box>

              <Box>
                <Typography component="legend" gutterBottom>
                  Nhận xét của bạn
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: "rgba(0, 0, 0, 0.02)" }}>
                  <Typography variant="body2">{booking.rating.comment || "Không có nhận xét"}</Typography>
                </Paper>
              </Box>
            </Stack>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button onClick={onClose} color="primary">
                Đóng
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  )
}
