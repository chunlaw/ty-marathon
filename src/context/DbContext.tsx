import React, { ReactNode, useState, useEffect } from "react";
import { Landmark, Route } from "../data";
import GpxParser from "gpxparser";
import routes from "../routes.json";

interface DbContextState {
  routes: Route[];
  landmarks: Landmark[];
}

interface DbContextValue extends DbContextState {}

const DbContext = React.createContext({} as DbContextValue);

interface DbContextProviderProps {
  children: ReactNode;
}

export const DbContextProvider = ({ children }: DbContextProviderProps) => {
  const [state, setState] = useState<DbContextState>(DEFAULT_STATE);

  useEffect(() => {
    Promise.all(
      routes.map(({ name, landmarks }) =>
        Promise.all([
          fetch(`/routes/${name}/route.gpx`).then((r) => r.text()),
          fetch(`/routes/${name}/description.md`).then((r) => r.text()),
        ]).then(([gpx, description]) => {
          const gpxParser = new GpxParser();
          gpxParser.parse(gpx);
          return {
            name,
            description,
            coordinates: gpxParser.tracks[0].points.map(({ lat, lon }) => ({
              lat,
              lng: lon,
            })),
            landmarks,
          };
        })
      )
    ).then((routes) => {
      setState((prev) => ({
        ...prev,
        routes,
      }));
    });

    Promise.all(
      routes
        .map(({ landmarks }) => landmarks)
        .flat()
        .map((name) =>
          Promise.all([
            fetch(`/landmarks/${name}/${name}.gpx`).then((r) => r.text()),
            fetch(`/landmarks/${name}/${name}.md`).then((r) => r.text()),
          ]).then(([gpx, description]) => {
            const gpxParser = new GpxParser();
            gpxParser.parse(gpx);
            return {
              name,
              description,
              coordinate: gpxParser.waypoints.map(({ lat, lon }) => ({
                lat,
                lng: lon,
              }))[0],
            };
          })
        )
    ).then((landmarks) => {
      setState((prev) => ({
        ...prev,
        landmarks,
      }));
    });
  }, []);

  return (
    <DbContext.Provider value={{ ...state }}>{children}</DbContext.Provider>
  );
};

export default DbContext;

const DEFAULT_STATE: DbContextState = {
  routes: [],
  landmarks: [],
};
