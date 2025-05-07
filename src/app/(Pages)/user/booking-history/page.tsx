<<<<<<< HEAD
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import UserLayout from "@/app/components/UserLayout";
import {
  Container,
  Grid2 as Grid,
=======
"use client"
import { useEffect, useState } from "react"
import UserLayout from "@/app/components/UserLayout"
import { useUserApiPrivate } from "@/api/user/user"
import {
  Box,
  Typography,
>>>>>>> 5ad2726 (fix: layout booking historys)
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
<<<<<<< HEAD
  Typography,
} from "@mui/material";
import { useUserApiPrivate } from "@/api/user/user";
import { useEffect, useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";

const useStyles = {
  table: {
    minWidth: 650,
  },
  tableRow: {
    height: 45,
    padding: "15px",
  },
  tableHeader: {
    paddingTop: "0px",
    paddingBottom: "0px",
    backgroundColor: "#F4F6F8",
  },
  tableCell: {
    paddingTop: "0px",
    paddingBottom: "0px",
    // marginBottom: '15px'
    borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
  },
};

export default function BookingHistory() {
  const classes = useStyles;

  const { POST_P } = useUserApiPrivate();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await POST_P("/field-bookings/history");
      // console.log('data', data.data);
      setHistory(data.data.items);
    };
    getData();
    // console.log("history", history);
  }, []);

  const handleChangePage = () => {
    return;
  };

  return (
    <>
      <UserLayout>
        <Grid
          container
          direction={"row"}
          sx={{
            borderRadius: "20px",
            height: "fit-content",
            justifyContent: "center",
            width: "100%",
            zIndex: 100,
            // mt: { xs: "-10vh", sm: "-20vh", md: "-25vh", lg: "-35vh", xl: "-21%" },
=======
  Paper,
  Chip,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material"
import { History, Receipt, CalendarMonth, Payments, Circle } from "@mui/icons-material"

export default function BookingHistory() {
  const { POST_P } = useUserApiPrivate()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const data = await POST_P("/field-bookings/history")
        setHistory(data.data.items)
      } catch (error) {
        console.error("Error fetching booking history:", error)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "PAID":
        return { color: "success", label: "Hoàn thành" }
      case "PENDING":
        return { color: "warning", label: "Đang xử lý" }
      case "REFUND":
        return { color: "error", label: "Đã hủy" }
      default:
        return { color: "default", label: status }
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0)
  }

  return (
    <UserLayout>
      <Box
        sx={{
          width: "96%",
          py: 3,
          px: { xs: 1, md: 3 },
           
        }}
      >
        <Card
          elevation={3}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
>>>>>>> 5ad2726 (fix: layout booking historys)
          }}
        >
          <Box
            sx={{
<<<<<<< HEAD
              width: "fit-content",
              background: { xs: "none", sm: "white" },
              borderRadius: "inherit",
            }}
          >
            <Container
              // elevation={5}
              sx={{
                width: "95vw",
                mt: 2,
                mb: "30px",
                border: "2px solid var(--Primary-200)",
                position: "relative",
                zIndex: 99,
                backgroundColor: "var(--Primary-50)",
                borderRadius: "20px",
                boxShadow: "0px 5px 5.8px 0px rgba(0, 0, 0, 0.10)",
                py: { xs: "16px", sm: "24px" },
                gap: "60px",
              }}
            >
              <Grid
                container
                direction={"column"}
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Grid
                  container
                  direction={"row"}
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    width: "100%",
                    // backgroundColor: "var(--Primary-800)",
                    // padding: "15px 30px",
                    borderRadius: "8px 8px 0px 0px",
                  }}
                >
                  <AssignmentIcon sx={{ color: "var(--Primary-500)" }} />
                  <Typography
                    variant="h5"
                    color="var(--Primary-500)"
                    sx={{ fontWeight: "bold" }}
                  >
                    Lịch sử đặt sân
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                direction="column"
                sx={{
                  // borderRadius: '20px',
                  display: "flex",
                  width: "100%",
                  // flexGrow: 1,
                  height: "552px", // Phải có để alignItems hoạt động
                  // backgroundColor: "yellow",
                }}
              >
                <Box>
                  <TableContainer
                    sx={
                      {
                        // borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
                        // m: '0px',
                        // p: '0px',
                        // flex: 1,
                        // maxHeight: '60vh',
                        // height: '100%',
                        // display: 'flex',
                        // flexDirection: 'column',
                      }
                    }
                  >
                    <Table stickyHeader aria-label="simple table">
                      <TableHead sx={{ backgroundColor: "#F4F6F8" }}>
                        <TableRow sx={classes.tableRow}>
                          <TableCell
                            sx={{ ...classes.tableHeader }}
                            colSpan={1}
                          >
                            Mã đơn
                          </TableCell>
                          <TableCell
                            sx={{ ...classes.tableHeader }}
                            colSpan={2}
                          >
                            Ngày đặt
                          </TableCell>
                          <TableCell
                            sx={{ ...classes.tableHeader }}
                            colSpan={4}
                          >
                            Tổng tiền
                          </TableCell>
                          <TableCell
                            sx={{ ...classes.tableHeader }}
                            colSpan={3}
                          >
                            Trạng thái
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {history.length > 0 ? (
                          history.map((index) => (
                            <TableRow
                              key={index}
                              hover
                              sx={{ ...classes.tableRow }}
                            >
                              <TableCell
                                sx={{
                                  ...classes.tableCell,
                                  textAlign: "center",
                                }}
                                colSpan={1}
                              >
                                id
                              </TableCell>
                              <TableCell
                                sx={{
                                  ...classes.tableCell,
                                  textAlign: "center",
                                }}
                                colSpan={2}
                              >
                                day
                              </TableCell>
                              <TableCell
                                sx={{
                                  ...classes.tableCell,
                                  textAlign: "center",
                                }}
                                colSpan={4}
                              >
                                total
                              </TableCell>
                              <TableCell
                                sx={{
                                  ...classes.tableCell,
                                  textAlign: "center",
                                }}
                                colSpan={3}
                              >
                                status
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow hover sx={{ ...classes.tableRow }}>
                            <TableCell
                              sx={{ ...classes.tableCell, textAlign: "center" }}
                              colSpan={10}
                            >
                              (trống)
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

                <Box
                  sx={{
                    mt: "auto",
                  }}
                >
                  <TablePagination
                    labelRowsPerPage=""
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={history.length}
                    // rowsPerPage={rowsPerPage}
                    // page={page}
                    onPageChange={handleChangePage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}

                    // count={10}
                    rowsPerPage={10}
                    page={0}
                  />
                </Box>
              </Grid>
            </Container>
          </Box>
        </Grid>
      </UserLayout>
    </>
  );
=======
              p: { xs: 1, md: 2 },
              borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
              background: "linear-gradient(90deg, var(--Primary-500) 0%, var(--Primary-400) 100%)",
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <History fontSize="large" sx={{ color: "#fff"}} />
              <Typography variant="h5" fontWeight="700" sx={{ color: "#fff"}}>
                Lịch sử đặt sân
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9, color: "#fff" }}>
              Xem lại các đơn đặt sân của bạn và trạng thái của chúng
            </Typography>
          </Box>

          <CardContent sx={{ p: { xs: 1, md: 2 } }}>
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                borderRadius: "8px",
                maxHeight: "60vh",
                backgroundColor: "transparent",
              }}
            >
              <Table stickyHeader aria-label="booking history table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "var(--Primary-50)",
                        color: "var(--Primary-700)",
                        borderBottom: "2px solid var(--Primary-200)",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Receipt fontSize="small" />
                        Mã đơn
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "var(--Primary-50)",
                        color: "var(--Primary-700)",
                        borderBottom: "2px solid var(--Primary-200)",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CalendarMonth fontSize="small" />
                        Ngày đặt
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "var(--Primary-50)",
                        color: "var(--Primary-700)",
                        borderBottom: "2px solid var(--Primary-200)",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Payments fontSize="small" />
                        Tổng tiền
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "var(--Primary-50)",
                        color: "var(--Primary-700)",
                        borderBottom: "2px solid var(--Primary-200)",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Circle fontSize="small" />
                        Trạng thái
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading ? (
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
                      </TableRow>
                    ))
                  ) : history.length > 0 ? (
                    history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                      const mockStatus = ["PAID", "PENDING", "REFUND"][Math.floor(Math.random() * 3)]
                      const statusInfo = getStatusColor(mockStatus)

                      return (
                        <TableRow
                          key={index}
                          hover
                          sx={{
                            "&:nth-of-type(odd)": { backgroundColor: "rgba(0, 0, 0, 0.02)" },
                            transition: "all 0.2s",
                            "&:hover": {
                              backgroundColor: "rgba(var(--Primary-rgb), 0.05) !important",
                              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
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
                              {item.day || new Date().toLocaleDateString("vi-VN")}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Typography variant="body2" fontWeight={500} sx={{ color: "var(--Primary-700)" }}>
                              {formatCurrency(item.total || Math.floor(Math.random() * 1000000) + 500000)}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Chip
                              label={statusInfo.label}
                              color={statusInfo.color}
                              size="small"
                              sx={{
                                fontWeight: 500,
                                minWidth: "90px",
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                        <Box sx={{ textAlign: "center", py: 3 }}>
                          <History sx={{ fontSize: 60, color: "var(--Primary-200)", mb: 2 }} />
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

            {/* <TablePagination
              component="div"
              count={history.length || 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Số hàng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
              sx={{
                borderTop: "1px solid rgba(0, 0, 0, 0.08)",
                mt: 2,
                ".MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon, .MuiTablePagination-displayedRows":
                  {
                    color: "var(--Primary-700)",
                  },
              }}
            /> */}
          </CardContent>
        </Card>
      </Box>
    </UserLayout>
  )
>>>>>>> 5ad2726 (fix: layout booking historys)
}
