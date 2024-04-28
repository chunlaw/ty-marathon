import { useCallback, useContext, useMemo } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Marker, Tooltip } from "react-leaflet";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import DbContext from "../../context/DbContext";

const LandmarkMarkers = () => {
  const { routes, landmarks } = useContext(DbContext);
  const { routeId } = useParams();
  const navigate = useNavigate();
  const handleClick = useCallback(
    (landmark: string) => {
      for (let i = 0; i < routes.length; ++i) {
        if (routes[i].landmarks.includes(landmark)) {
          navigate(`/map/${routes[i].name}/${landmark}`);
          return;
        }
      }
    },
    [navigate, routes]
  );

  const availableLandmarks = useMemo(() => {
    const route = routes.filter(({ name }) => name === routeId)[0];
    if (!route) return landmarks;
    return landmarks.filter(({ name }) => route.landmarks.includes(name));
  }, [routes, routeId, landmarks]);

  return (
    <MarkerClusterGroup
      chunkedLoading
      polygonOptions={{
        fillColor: "#006",
        color: "transparent",
        fillOpacity: 0.3,
      }}
    >
      {availableLandmarks.map(({ name, coordinate }) => (
        <Marker
          key={name}
          position={coordinate}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup(),
            click: () => handleClick(name),
          }}
        >
          <Tooltip direction="bottom" offset={[-15, 30]}>
            <Typography variant="caption">{name}</Typography>
            <Box
              sx={{
                ...imgSx,
                backgroundImage: `url(/landmarks/${name}/${name}.jpg)`,
              }}
            />
          </Tooltip>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};

export default LandmarkMarkers;

const imgSx: SxProps<Theme> = {
  width: 150,
  height: 100,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
};
