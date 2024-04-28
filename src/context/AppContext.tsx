import React, { ReactNode, useState, useCallback, useMemo } from "react";

interface AppContextState {
  hoverRouteId: string;
}

interface AppContextValue extends AppContextState {
  setHoverRouteId: (routeId: string) => void;
}

const AppContext = React.createContext({} as AppContextValue);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, setState] = useState<AppContextState>(DEFAULT_STATE);

  const setHoverRouteId = useCallback((hoverRouteId: string) => {
    setState((prev) => ({
      ...prev,
      hoverRouteId,
    }));
  }, []);

  const contextValue: AppContextValue = useMemo(
    () => ({
      ...state,
      setHoverRouteId,
    }),
    [state, setHoverRouteId]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;

const DEFAULT_STATE: AppContextState = {
  hoverRouteId: "",
};
