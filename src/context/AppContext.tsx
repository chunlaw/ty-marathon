import React, { ReactNode, useState, useCallback } from "react";
import { Coordinate, Route } from "../data";
import routes from "../routes.json"

interface AppContextState {
  searchString: string;
  map: {
    center: Coordinate;
    zoom: number;
  };
}

interface AppContextValue extends AppContextState {
  routes: Route[];
  setSearchString: (searchString: string) => void;
  setRoute: (route: string) => void;
}

const AppContext = React.createContext({} as AppContextValue);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, setState] = useState<AppContextState>(DEFAULT_STATE);

  const setSearchString = useCallback(
    (searchString: string) => {
      setState((prev) => ({
        ...prev,
        searchString,
      }));
    },
    [setState]
  );

  const setRoute = useCallback((route: string) => {
    setState((prev) => ({
      ...prev,
      route,
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        routes: routes as Route[],
        setSearchString,
        setRoute,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

const DEFAULT_STATE: AppContextState = {
  searchString: "",
  map: {
    center: {
      lat: 22.345983,
      lng: 114.102759,
    },
    zoom: 14,
  },
};

