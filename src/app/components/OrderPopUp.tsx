"use client"

import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Tooltip } from "@mui/material";
import { Grid } from "@mui/system";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { emailRegex, msgDetail } from "@/utility/constant";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import moment from "moment";
import BookingInfoTable from "./BookingInfoTable";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { blueBlurDialogSlotProps } from "@/utility/dialogSlotProps";

export default function OrderPopUp(props: any) {

    // const getPricePerHour = (startTime: number): number => {
    //     const timeInMinutes = startTime * 60;

    //     const matchedSlot = props.data.field.timsSlots.find((slot: any) => {
    //         const slotStart = parseInt(slot.startTime.split(":")[0]) * 60 + parseInt(slot.startTime.split(":")[1]);
    //         const slotEnd = parseInt(slot.endTime.split(":")[0]) * 60 + parseInt(slot.endTime.split(":")[1]);
    //         return timeInMinutes >= slotStart && timeInMinutes < slotEnd;
    //     });

    //     return matchedSlot ? matchedSlot.pricePerHour : props.data.field.defaultPrice;
    // };



    const [isDisableBtn, setIsDisableBtn] = useState(true);

    // console.log("OrderPopUp -> props", props);

    // const unitPrice = props.startSlot && getPricePerHour(props.startSlot.getHours());
    // console.log("OrderPopUp -> unitPrice", unitPrice);


    const data = props.data;

    const selectedSlots = props.selectedSlots;

    const { setOpenSnackBar } = useContext(AppContext);

    const [email, setEmail] = useState('');

    const validateEmail = (value: string) => {
        setOpenSnackBar({ isOpen: false, msg: msgDetail[16], type: 'info' });

        const trimValue = value.replaceAll(" ", "");

        if (trimValue === "") {
            // console.log("2value", value);
            setTimeout(() => {
                setOpenSnackBar({ isOpen: true, msg: msgDetail[12], type: 'error' });
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
        }
    };

    // useEffect(() => {
    //     console.log("OrderPopUp nhận orderInfo mới:", props.orderInfo);
    // }, [props.orderInfo]);

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
            bookingDate: props.searchData.dayPicked !== null ? props.searchData.dayPicked.format("YYYY-MM-DD") : '',
            totalPrice: 0,
            email: '',
            sportFieldId: 0
        }));
        props.setSelectedSlots([]);
        props.setStartSlot(null);
        props.setOpen(false);
    };

    const handleBack = () => {
        props.onClose();
        props.handleOpenDialog2();
    };



    return (
        <>
            {props.open &&
                <Dialog
                    closeAfterTransition={false}
                    open={props.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    maxWidth="xs"
                    // aria-hidden={false}
                    slotProps={blueBlurDialogSlotProps}
                >
                    <DialogTitle sx={{ fontWeight: 'bold' }}>
                        <Grid container justifyContent="space-between" alignItems="center" direction={"row"}

                        >
                            <Tooltip title="Quay lại">
                                <IconButton color="info" onClick={handleBack} sx={{ p: 1 }}>
                                    <ArrowBackIcon
                                        aria-label="close"

                                        sx={{ position: 'absolute', right: "auto", top: "auto", }}

                                    />
                                </IconButton>
                            </Tooltip>
                            <Grid container justifyContent="center" alignItems="center" direction={"column"} sx={{ flex: 1 }}>

                                <Typography sx={{ fontWeight: "bold" }}>
                                    {props.title}
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* <Divider /> */}
                    </DialogTitle>
                    <DialogContent sx={{ pb: 0, mb: 1 }}>
                        <Grid container direction="column"
                            sx={{ gap: 1 }}
                        >
                            <Grid container direction="row" sx={{ width: "100%" }}>
                                <Grid container direction="column" spacing={1} sx={{ width: "100%" }}>

                                    <Grid container direction="row" spacing={2} sx={{ width: "100%" }}>
                                        <Grid size={4}>
                                            <Typography fontSize="0.75rem">Sân:</Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <Typography fontSize="0.75rem">{props.data.field.name}</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" spacing={2} sx={{ width: "100%" }}>
                                        <Grid size={4}>
                                            <Typography fontSize="0.75rem">Ngày:</Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <Typography fontSize="0.75rem">{moment(props.orderInfo.bookingDate).format("DD/MM/YYYY")}</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" spacing={2} sx={{ width: "100%" }}>
                                        <Grid size={4}>
                                            <Typography fontSize="0.75rem">Giờ:</Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <Typography fontSize="0.75rem">{props.orderInfo.startTime + " - " + props.orderInfo.endTime}</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" spacing={2} sx={{ width: "100%" }}>
                                        <Grid size={4}>
                                            <Typography fontSize="0.75rem">Cụm sân:</Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <Typography fontSize="0.75rem">{props.data.branch[0].name}</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" spacing={2} sx={{ width: "100%" }}>
                                        <Grid size={4}>
                                            <Typography fontSize="0.75rem">Địa chỉ:</Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <Typography fontSize="0.75rem">{props.data.branch[0].street + ", " + props.data.branch[0].district + ", " + props.data.branch[0].city}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container direction="column" justifyContent="center" sx={{ width: "100%" }}>
                                <BookingInfoTable data={data} hourCount={selectedSlots} orderInfo={props.orderInfo} setBookingData={props.setBookingData} />
                            </Grid>

                            <Grid container direction="column" sx={{
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
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid container direction="row" spacing={{ xs: 2, sm: 4 }} justifyContent={"center"} alignItems={"center"}
                            sx={{
                                width: '100%',
                                // my: 2
                            }}
                        >

                            <Button variant="contained" startIcon={<CheckIcon />}
                                sx={{ textTransform: "none" }}
                                onClick={props.handleConfirmOrder}
                                disabled={isDisableBtn}
                            >
                                Xác nhận
                            </Button>



                            <Button variant="outlined" startIcon={<ClearIcon />}
                                sx={{ textTransform: "none" }}
                                color="error"
                                onClick={handleClose}
                            // disabled={isDiscard}
                            >
                                Hủy
                            </Button>

                        </Grid>
                    </DialogActions>
                </Dialog >
            }
        </>
    );
};
