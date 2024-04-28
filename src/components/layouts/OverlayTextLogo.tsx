import { Box, SxProps, Theme, Typography } from "@mui/material";

const OverlayTextLogo = () => {
  return (
    <Box sx={rootSx}>
      <Typography variant="h2">青衣島民</Typography>
    </Box>
  );
};

export default OverlayTextLogo;

const rootSx: SxProps<Theme> = {
  position: "fixed",
  pointerEvents: "none",
  bottom: 0,
  right: 0,
  mb: 4,
  mr: 8,
  zIndex: 100000,
  color: "gray",
  opacity: 0.4,
};
