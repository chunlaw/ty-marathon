import { Box, SxProps, Theme } from "@mui/material";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import DbContext from "../context/DbContext";

interface RouteBtnProps {
  name: string;
}

const RouteBtn = ({ name }: RouteBtnProps) => {
  const navigate = useNavigate();
  const { setHoverRouteId } = useContext(AppContext);

  const handleMouseEvt = useCallback(
    (v: string) => () => {
      setHoverRouteId(v);
    },
    [setHoverRouteId]
  );

  const handleClick = useCallback(() => {
    navigate(`/map/${encodeURI(name)}`);
  }, [name, navigate]);

  return (
    <Box
      sx={{
        ...rootSx,
        backgroundImage: `url(/routes/${encodeURI(name)}/logo.png)`,
      }}
      onMouseEnter={handleMouseEvt(name)}
      onMouseLeave={handleMouseEvt("")}
      onClick={handleClick}
    />
  );
};

const rootSx: SxProps<Theme> = {
  width: 50,
  height: 50,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain",
  cursor: "pointer",
  transition: "all 0.2s ease-in",
  "&:hover": {
    width: 120,
    height: 120,
  },
};

const RoutePickers = () => {
  const { routes } = useContext(DbContext);
  return (
    <Box sx={fabContainer}>
      {routes.map(({ name }) => (
        <RouteBtn key={`${name}-btn`} name={name} />
      ))}
    </Box>
  );
};

const fabContainer: SxProps<Theme> = {
  position: "fixed",
  bottom: (t) => t.spacing(2),
  left: (t) => t.spacing(2),
  zIndex: 10000,
  display: "flex",
  gap: 2,
  alignItems: "flex-end",
};

export default RoutePickers;
