import { useEffect, useRef } from "react";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { Box, SxProps, Theme } from "@mui/material";
import { Outlet } from "react-router-dom";
import OverlayTextLogo from "../components/layouts/OverlayTextLogo";
import RouteLines from "../components/map/RouteLines";
import LandmarkMarkers from "../components/map/LandmarkMarkers";
import RoutePickers from "../components/RoutePickers";
import SelfCircle from "../components/map/SelfCircle";

export default function MapPage() {
  const mapRef = useRef<Leaflet.Map | null>(null);

  useEffect(() => {
    const handleResize = () => {
      mapRef.current?.invalidateSize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box sx={rootSx}>
      <OverlayTextLogo />
      <MapContainer
        center={DEFAULT_MAP_VIEW.center}
        zoom={DEFAULT_MAP_VIEW.zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: "100dvh" }}
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
        <ZoomControl position="topright" />
        <RouteLines />
        <LandmarkMarkers />
        <SelfCircle />
      </MapContainer>
      <RoutePickers />
      <Outlet />
    </Box>
  );
}

const rootSx: SxProps<Theme> = {
  overflow: "clip",
  flex: 1,
};

const DEFAULT_MAP_VIEW = {
  center: {
    lat: 22.345983,
    lng: 114.102759,
  },
  zoom: 14,
};
