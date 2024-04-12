import { Box, SxProps, Theme } from "@mui/material";
import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <Box sx={containerSx}>
    <Outlet />
  </Box>
);

export default AppLayout;

const containerSx: SxProps<Theme> = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};
