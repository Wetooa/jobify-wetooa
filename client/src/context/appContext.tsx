import React, { useContext, useReducer } from "react";
import { AppContextProps } from "../components/interfaces";
import reducer from "./reducer";
import { DISPLAY_ALERT } from "./actions";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

const AppContext = React.createContext(initialState);

const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
