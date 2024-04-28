import { Polyline } from "react-leaflet";
import { useParams } from "react-router-dom";
import { useContext, useMemo } from "react";
import AppContext from "../../context/AppContext";
import DbContext from "../../context/DbContext";

const RouteLine = () => {
  const { routeId } = useParams();
  const { hoverRouteId } = useContext(AppContext);
  const { routes } = useContext(DbContext);
  const selectedRoute = useMemo(() => {
    return routes.filter((v) => v.name === (hoverRouteId || routeId))[0];
  }, [routes, routeId, hoverRouteId]);

  return (
    <Polyline
      positions={
        selectedRoute
          ? selectedRoute.coordinates.map(({ lat, lng }) => [lat, lng])
          : []
      }
    />
  );
};

export default RouteLine;
