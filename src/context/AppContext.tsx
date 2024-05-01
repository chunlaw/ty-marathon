import React, { ReactNode, useState, useCallback, useMemo } from "react";

interface AppContextState {
  hoverRouteId: string;
}

interface AppContextValue extends AppContextState {
  setHoverRouteId: (routeId: string) => void;
  isMobile: boolean;
}

const AppContext = React.createContext({} as AppContextValue);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, setState] = useState<AppContextState>(DEFAULT_STATE);
  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);

  const setHoverRouteId = useCallback((hoverRouteId: string) => {
    setState((prev) => ({
      ...prev,
      hoverRouteId,
    }));
  }, []);

  const contextValue: AppContextValue = useMemo(
    () => ({
      ...state,
      isMobile,
      setHoverRouteId,
    }),
    [state, isMobile, setHoverRouteId]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;

const DEFAULT_STATE: AppContextState = {
  hoverRouteId: "",
};
