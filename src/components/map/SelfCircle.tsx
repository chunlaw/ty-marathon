import { useEffect, useState } from "react";
import { Circle } from "react-leaflet";

const SelfCircle = () => {
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    const watcherId = navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        setCenter({ lat: latitude, lng: longitude });
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watcherId);
    };
  }, []);

  if (center === null) {
    return null;
  }

  return <Circle center={center} radius={25} />;
};

export default SelfCircle;
