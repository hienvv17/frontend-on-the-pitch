"use client"
import { useEffect, useState } from "react"
import UserLayout from "@/app/components/UserLayout"
import { useUserApiPrivate } from "@/api/user/user"
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
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

  // Function to determine status chip color
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

  // Format currency
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
          width: "100%",
          py: 3,
          px: { xs: 2, md: 4 },
          background: ""
        }}
      >
        <Card
          elevation={3}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box
            sx={{
              p: { xs: 2, md: 3 },
              borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
              background: "linear-gradient(90deg, var(--Primary-500) 0%, var(--Primary-400) 100%)",
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, }}>
              <History fontSize="large" />
              <Typography variant="h5" fontWeight="700">
                Lịch sử đặt sân
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
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
                    // Loading skeleton
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
                      // For demo purposes, using mock data since the actual data structure is unknown
                      const mockStatus = ["PAID", "PENDING", "REFUND"]
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

            <TablePagination
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
            />
          </CardContent>
        </Card>
      </Box>
    </UserLayout>
  )
}
