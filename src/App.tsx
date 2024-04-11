import { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Board from "./components/Board.";
import MapPage from "./components/pages/MapPage";

const App = (): React.ReactNode => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="map" element={<MapPage />}>
          <Route path=":routeId" element={<Board />} />
        </Route>
      </Route>
      <Route index element={<DefaultRoute />} />
    </Routes>
  );
}

export default App;

const DefaultRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/map");
  }, []);
  return <></>;
};
