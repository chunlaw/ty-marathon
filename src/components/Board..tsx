import { useContext, useMemo } from "react";
import AppContext from "../context/AppContext";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
} from "@mui/icons-material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useNavigate, useParams } from "react-router-dom";

type BoardParams = {
  routeId: string;
};

const Board = () => {
  const { routeId } = useParams<BoardParams>();
  const navigate = useNavigate();
  const { routes } =
    useContext(AppContext);

  const route = useMemo(() => {
    for ( let i=0;i<routes.length;++i ) {
      if ( routes[i].name === routeId ) {
        return routes[i]
      }
    }
    return null
  }, [routes, routeId])

  if (!route) {
    return null;
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        ...rootSx,
        left: 8,
      }}
    >
      <Paper sx={paperSx}>
        <Box sx={titleSx}>
          <Typography variant="h6">
            {route.name}
          </Typography>
          <IconButton onClick={() => navigate("/map")}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={contentSx}>
          <ReactMarkdown>{route.description}</ReactMarkdown>
        </Box>
      </Paper>
    </Container>
  );
};

export default Board;

const rootSx: SxProps<Theme> = {
  position: "fixed",
  top: (t) => t.spacing(8),
  left: (t) => t.spacing(8),
  zIndex: 1000,
  "@media (max-width: 500px)": {
    width: "80%",
  },
};

const paperSx: SxProps<Theme> = {
  // height: "100%",
  height: "80vh",
  display: "flex",
  flexDirection: "column",
};

const titleSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "left",
  p: 2,
};

const contentSx: SxProps<Theme> = {
  textAlign: "left",
  p: 2,
  overflow: "scroll",
  flex: 1,
};
