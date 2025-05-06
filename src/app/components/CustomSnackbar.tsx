import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
// import { Typography } from "@mui/material";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ErrorIcon from '@mui/icons-material/Error';
// import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from "@mui/icons-material/Warning";

// interface snackbar {
//     isOpen: boolean,
//     msg: string,
//     type: string,
// }
interface CustomSnackbarProps {
  [key: string]: any; // Cho phép các props khác
}

const CustomSnackbar = (props: CustomSnackbarProps) => {
  const { isOpen, msg, type } = props.snackBar;
  // console.log('openSnackbar', isOpen)
  const handleSnackBarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpenSnackBar((prev: any) => ({
      ...prev,
      isOpen: false,
      msg: msg,
      type: type,
    }));
  };

  // const formatMessage = (msg: string) => {
  //     const targetString = 'Abcd1@34';
  //     // console.log('msg', msg)
  //     if (msg == '') {
  //         return msg;
  //     }
  //     if (msg.includes(targetString)) {
  //         const parts = msg.split(targetString);
  //         return (
  //             <>
  //                 {parts[0]}
  //                 <strong><em>{targetString}</em></strong>
  //                 {parts[1]}
  //             </>
  //         );
  //     }

  //     return msg;
  // };

  const getIconColor = () => {
    switch (type) {
      // case 'success':
      //     return '#388e3c'; // Màu của biểu tượng thành công
      // case 'error':
      //     return '#d32f2f'; // Màu của biểu tượng lỗi
      // case 'info':
      //     return '#ffffff'; // Màu của biểu tượng thông tin
      case "warning":
        return "#ffffff"; // Màu của biểu tượng cảnh báo
      default:
        return "#000000"; // Màu mặc định nếu không khớp với bất kỳ loại nào
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#e8f5e9"; // Màu nền cho thông báo thành công
      case "error":
        return "#ff0000"; // Màu nền cho thông báo lỗi
      case "info":
        return "var(--Primary-500)"; // Màu nền cho thông báo thông tin
      case "warning":
        return "#ffad33"; // Màu nền cho thông báo cảnh báo
      default:
        return "#ffffff"; // Màu nền mặc định nếu không khớp với bất kỳ loại nào
    }
  };

  const iconMapping = {
    // success: <CheckCircleIcon sx={{ color: getIconColor() }} />,
    // error: <ErrorIcon sx={{ color: getIconColor() }} />,
    // info: <InfoIcon sx={{ color: getIconColor() }} />,
    warning: <WarningIcon sx={{ color: getIconColor() }} />,
  };

  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={props.duration ? props.duration : 6000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ zIndex: 9999999 }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={type as AlertColor}
          variant="filled"
          iconMapping={iconMapping}
          sx={{
            width: "100%",
            bgcolor: getBackgroundColor(),
          }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomSnackbar;
