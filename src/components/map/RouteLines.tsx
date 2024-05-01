import { Polyline } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext } from "react";
import AppContext from "../../context/AppContext";
import DbContext from "../../context/DbContext";

const RouteLines = () => {
  const { routeId } = useParams();
  const { hoverRouteId } = useContext(AppContext);
  const { routes } = useContext(DbContext);
  const navigate = useNavigate();
  const handleClick = useCallback(
    (route: string) => {
      navigate(`/map/${route}`);
    },
    [navigate]
  );

  return (
    <>
      {routes
        .filter(({ name }) =>
          hoverRouteId || routeId ? name === (hoverRouteId || routeId) : true
        )
        .map((r) => (
          <Polyline
            key={`${r.name}-route`}
            positions={r.coordinates.map(({ lat, lng }) => [lat, lng])}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              click: () => {
                console.log(r.name);
                handleClick(r.name);
              },
            }}
            color={r.color}
          />
        ))}
    </>
  );
};

export default RouteLines;
