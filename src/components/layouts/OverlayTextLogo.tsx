import { Box, SxProps, Theme } from "@mui/material";

const OverlayTextLogo = () => {
  return (
    <Box sx={rootSx}>
      <Box sx={backgroundSx} />
    </Box>
  );
};

export default OverlayTextLogo;

const rootSx: SxProps<Theme> = {
  position: "fixed",
  pointerEvents: "none",
  bottom: 0,
  right: 0,
  mb: 8,
  mr: 4,
  zIndex: 1000,
  color: "gray",
  opacity: 0.4,
};

const backgroundSx: SxProps<Theme> = {
  position: "absolute",
  bottom: "5%",
  right: "5%",
  width: 192,
  height: 192,
  // filter: "invert(1)",
  opacity: 1,
  pointerEvents: "none",
  backgroundImage: "url(/typeople.png)",
  backgroundRepeat: "no-repeat",
  backgroundBlendMode: "difference",
};
