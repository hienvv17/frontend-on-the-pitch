import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import { Box, Grid2 } from "@mui/material";
import Image from "./Image";
// import StarIcon from "@mui/icons-material/Star";
import RoomIcon from "@mui/icons-material/Room";
import { ALTER_IMG, DEFAULT_IMG } from "@/utility/constant";

interface SportCardProps {
  [key: string]: any; // Cho phép các props khác
}
export default function SportCard(props: SportCardProps) {
  // console.log("SportCard -> props", props);
  // console.log("SportCard -> props.data.sportCategoryName", props.data.sportCategoryName)
  // console.log("SportCard -> props.searchData.sportOption.label", props.searchData.sportOption?.label)

  let defaultImg = '';
  const sportType = props.data.sportCategoryName || props.searchData.sportOption.label;
  // console.log("sportType", sportType);
  switch (sportType) {
    case 'Bóng đá':
      defaultImg = ALTER_IMG[0];
      break;
    case 'Tenis':
      defaultImg = ALTER_IMG[1];
      break;
    case 'Cầu lông':
      defaultImg = ALTER_IMG[2];
      break;
    case 'Pickle ball':
      defaultImg = ALTER_IMG[3];
      break;
    default:
      defaultImg = ALTER_IMG[0];
      break;
  }

  const branchData = props.branchInfo.find((item: any) => item.id === props.searchData.branchValue);
  // console.log("branchData", branchData);

  const sportName = props.resData.sportFields.find(
    (item: any) => item.value === props.searchData.sportValue,
  )?.label;

  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider>
          <Card
            sx={{
              width: 260,
              boxShadow: "lg",
              ":hover": {
                boxShadow: "0 0 8px 2px var(--Primary-500)",
                transform: { xs: "none", sm: "scale(1.05)" },
                background: "var(--Primary-50)",
              },
              transition:
                "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
              my: 2,
            }}
          >
            <CardOverflow>
              <AspectRatio variant="outlined" ratio="16/9" objectFit="cover">
                <Image
                  alt="imgSportCard"
                  src={props.data.images !== null ? props.data.images[0] : defaultImg}
                  width={400}
                  height={240}
                  style={{
                    objectFit: "fill",
                  }}
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography level="body-xs">
                Mở cửa: {props.data.openTime ? props.data.openTime : "05:00"} -{" "}
                {props.data.closeTime ? props.data.closeTime : "23:00"}
              </Typography>
              <Box
                fontSize="h5.fontSize"
                component="div"
                overflow="hidden"
                whiteSpace="pre-line"
                textOverflow="ellipsis"
                height={60}
                sx={{ fontWeight: 500 }}
              >
                {props.data.name}
              </Box>
              <Grid2
                container
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ width: "100%" }}
                >
                  {/* <RoomIcon color="primary" fontSize="small" /> */}
                  <Typography fontSize="12px" sx={{ width: "100%" }}>
                    {!sportName ? props.data.sportCategoryName : sportName}
                  </Typography>
                </Box>
                {branchData.id && (
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    sx={{
                      position: "absolute",
                      top: 8, // Cách mép trên 8px
                      right: 8, // Cách mép phải 8px
                      zIndex: 99,
                      backgroundColor: "rgba(0, 0, 0, 0.8)", // Nền mờ giúp dễ đọc hơn
                      borderRadius: "4px", // Bo góc nhẹ
                      padding: "2px 6px", // Thêm padding để dễ nhìn
                    }}
                  >
                    <RoomIcon sx={{ color: "#FFD700" }} fontSize="small" />
                    <Typography sx={{ color: "#FFD700" }} fontSize="12px">
                      {branchData.district}
                    </Typography>
                  </Box>
                )}
              </Grid2>
            </CardContent>
            <CardOverflow>
              <Button
                variant="solid"
                size="lg"
                sx={{ background: "var(--Primary-500)" }}
                onClick={props.onClick}
              >
                Đặt sân
              </Button>
            </CardOverflow>
          </Card>
        </CssVarsProvider>
      </StyledEngineProvider>
    </>
  );
}
