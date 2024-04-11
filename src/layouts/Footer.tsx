import { Theme } from "@emotion/react";
import { Link, Paper, SxProps, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Paper sx={rootSx} square>
      <Link
        href="https://www.pscollabhk.com/"
        underline="hover"
        target="_blank"
        color="text.secondary"
      >
        <Typography variant="caption">
          Macro Lo @ {new Date().getFullYear()}
        </Typography>
      </Link>
    </Paper>
  );
}

const rootSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 1,
  px: 2,
};
