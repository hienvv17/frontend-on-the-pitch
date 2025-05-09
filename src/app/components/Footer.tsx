import { Divider, IconButton, Typography, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useRouter } from "next/navigation";

export default function Footer() {
  const branches = [
    "",
    "Cầu lông Tiến Minh",
    "Hoàng Gia Tenis Club",
    "Sân cỏ nhân tạo Star",
  ];
  const router = useRouter();

  return (
    <>
      <Box sx={{ bgcolor: "#000", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, mb: 3 }}
              >
                On The Pitch
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}
              >
                Cách dễ nhất để đặt chỗ các cơ sở thể thao trên toàn quốc. Đặt
                sân bóng đá, cầu lông và tennis chỉ với vài cú nhấp chuột.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <IconButton sx={{ color: "white" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </IconButton>
                <IconButton sx={{ color: "white" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </IconButton>
                <IconButton sx={{ color: "white" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography
                variant="subtitle1"
                sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, mb: 2 }}
              >
                Chi nhánh
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {branches.slice(1, 5).map((branch) => (
                  <Typography
                    key={branch}
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      "&:hover": { color: "white", cursor: "pointer" },
                    }}
                  >
                    {branch}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography
                variant="subtitle1"
                sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, mb: 2 }}
              >
                Sports
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "white", cursor: "pointer" },
                  }}
                >
                  Bóng đá
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "white", cursor: "pointer" },
                  }}
                >
                  Cầu lông
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "white", cursor: "pointer" },
                  }}
                >
                  Tennis
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography
                variant="subtitle1"
                sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, mb: 2 }}
              >
                Company
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&:hover": { color: "white", cursor: "pointer" },
                  }}
                  onClick={() => router.push("/about")}
                >
                  Về chúng tôi
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "white", cursor: "pointer" },
                  }}
                  onClick={() => router.push("/lien-he")}
                >
                  Liên hệ
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "white", cursor: "pointer" },
                  }}
                >
                  Blogs
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography
                variant="subtitle1"
                sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, mb: 2 }}
              >
                Legal
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "white", cursor: "pointer" },
                  }}
                >
                  Điều khoản dịch vụ
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "white", cursor: "pointer" },
                  }}
                >
                  Chính sách bảo mật
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "white", cursor: "pointer" },
                  }}
                >
                  Chính sách Cookie
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "white", cursor: "pointer" },
                  }}
                  onClick={() => router.push("/chinh-sach-hoan-tien")}
                >
                  Chính sách hoàn tiền
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "center", sm: "flex-start" },
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
              © {new Date().getFullYear()} On The Pitch. All rights reserved.
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": { color: "white", cursor: "pointer" },
                }}
              >
                Trung tâm trợ giúp
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": { color: "white", cursor: "pointer" },
                }}
                onClick={() => router.push("/faq")}
              >
                FAQ
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": { color: "white", cursor: "pointer" },
                }}
              >
                Hỗ trợ
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
