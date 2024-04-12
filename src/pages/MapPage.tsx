import { useCallback, useContext, useEffect, useRef } from "react";
import Leaflet from "leaflet";
import {
  MapContainer,
  TileLayer,
  Polyline,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { Box, SxProps, Theme } from "@mui/material";
import AppContext from "../context/AppContext";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Outlet, useNavigate } from "react-router-dom";
import OverlayTextLogo from "../components/layouts/OverlayTextLogo";

export default function MapPage() {
  const {
    routes,
    map: { center, zoom },
  } = useContext(AppContext);
  const navigate = useNavigate();
  const mapRef = useRef<any>(null);

  const handleClick = useCallback(
    (name: string) => () => {
      navigate(`/map/${encodeURI(name)}`);
    },
    [navigate]
  );

  const handleResize = useCallback(() => {
    mapRef.current?.invalidateSize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box sx={rootSx}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          crossOrigin="anonymous"
          detectRetina
          maxZoom={Leaflet.Browser.retina ? 20 : 19}
          maxNativeZoom={18}
          keepBuffer={10}
          updateWhenIdle={true}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />
        <MarkerClusterGroup
          chunkedLoading
          polygonOptions={{
            fillColor: "#006",
            color: "transparent",
            fillOpacity: 0.3,
          }}
        >
          {routes.map(({coordinates, name}) => (
            <Polyline
              key={`route-${name}`}
              positions={coordinates.map(({lat, lng}) => [lat, lng])}
              eventHandlers={{
                click: handleClick(name)
              }}
            />
          ))} 
        </MarkerClusterGroup>
        <ChangeView />
      </MapContainer>
      <Outlet />
      <OverlayTextLogo />
    </Box>
  );
}

const ChangeView = () => {
  const {
    map: { center, zoom },
  } = useContext(AppContext);
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const rootSx: SxProps<Theme> = {
  overflow: "clip",
  flex: 1,
};
