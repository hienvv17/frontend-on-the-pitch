"use client";

import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { Grid } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/legacy/image";
import { formatPrice } from "@/utility/formatPrice";

export default function PaymentPopUp(props: any) {
  // const data = props.data;
  console.log("bookingData", props.bookingData);

  return (
    <>
      {props.open && (
        <Dialog
          closeAfterTransition={false}
          open={props.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          // maxWidth="xs"
          // aria-hidden={false}
          // slotProps={blueBlurDialogSlotProps}
          slotProps={{
            paper: {
              sx: {
                boxShadow: "0 0 30px rgba(0, 128, 255, 0.86)",
                borderRadius: "8px",
                width: "fit-content",
              },
            },
            backdrop: {
              sx: {
                backgroundColor: "rgba(0, 128, 255, 0.1)",
                backdropFilter: "blur(6px)",
              },
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              direction={"row"}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="flex-start"
                direction={"column"}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  {props.title}
                </Typography>
              </Grid>
            </Grid>
            {/* <Divider /> */}
          </DialogTitle>
          <DialogContent sx={{ pb: 0, mb: 1, justifyItems: "center" }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "fit-content" }}
            >
              <Grid
                container
                direction="column"
                alignContent={"center"}
                justifyContent={"center"}
                sx={{
                  border: "1px solid",
                  borderColor: "lightgrey",
                  borderRadius: "10px",
                  width: "fit-content",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignContent={"center"}
                  sx={{ m: 1 }}
                >
                  <Image
                    src={
                      "https://res.cloudinary.com/dv8qmimg8/image/upload/v1746363574/coit0qtuytrz3bf2bjow.png"
                    }
                    alt={"QR code"}
                    width={200}
                    height={200}
                  />
                </Grid>
                <Grid
                  container
                  direction="column"
                  spacing={0}
                  alignContent={"center"}
                  sx={{ mb: 1 }}
                >
                  <Typography fontSize="0.7rem">04:59</Typography>
                </Grid>
                <Grid
                  container
                  direction="column"
                  spacing={0.5}
                  alignContent={"center"}
                  justifyContent={"center"}
                  sx={{ width: "100%", mb: 2 }}
                >
                  <Typography
                    fontSize="0.75rem"
                    sx={{
                      flexGrow: 1,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Ngân hàng: Vietcom Bank
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{
                      flexGrow: 1,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Số TK:{" "}
                    {String(22334455667788).replace(/(\d{4})(?=\d)/g, "$1 ")}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{
                      flexGrow: 1,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Chủ TK: NGUYEN VAN AN
                  </Typography>
                </Grid>
                <Divider aria-hidden="true" />
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  alignContent={"center"}
                  justifyContent={"space-between"}
                  sx={{ m: 1.5 }}
                >
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: "red", fontWeight: "bold" }}
                  >
                    Tổng số tiền:{" "}
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    alignContent={"center"}
                    justifyContent={"flex-end"}
                  >
                    <Typography
                      fontSize="0.75rem"
                      sx={{ color: "red", fontWeight: "bold", flex: 1 }}
                    >
                      {formatPrice(props.bookingData.totalPrice)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {/* 
                            <Grid container direction="column" justifyContent="center" sx={{ width: "100%" }}>
                                <BookingInfoTable data={data} hourCount={selectedSlots} orderInfo={props.orderInfo} setBookingData={props.setBookingData} />
                            </Grid> */}

              {/* <Grid container direction="column" sx={{
                                height: "100%",
                                width: "100%",
                                // justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Grid size={12}>
                                    <TextField fullWidth required
                                        label={props.label}
                                        name={props.name}
                                        placeholder="Vui lòng nhập email"
                                        variant="outlined"
                                        value={email}
                                        size="small"
                                        margin="normal"
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={handleBlur}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                            htmlInput: { sx: { fontSize: '0.85rem' } }
                                        }}
                                    />
                                </Grid>
                            </Grid> */}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid
              container
              direction="row"
              spacing={{ xs: 2, sm: 4 }}
              justifyContent={"flex-end"}
              alignItems={"center"}
              sx={{
                width: "100%",
                mt: 2,
                px: 2,
              }}
            >
              {/* <Button variant="contained" startIcon={<CheckIcon />}
                                sx={{ textTransform: "none" }}
                                onClick={props.handleConfirmOrder}
                                disabled={isDisableBtn}
                            >
                                Xác nhận
                            </Button> */}

              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                sx={{ textTransform: "none" }}
                color="error"
                onClick={props.onClose}
              // disabled={isDiscard}
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
