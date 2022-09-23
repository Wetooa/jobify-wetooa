import reducer from "./reducer";
import axios from "axios";
import React, { useContext, useReducer } from "react";
import { AppContextProps } from "../components/interfaces";
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  token: "",
  user: {},
  userLocation: "",
};

const AppContext = React.createContext({
  ...initialState,
  displayAlert: () => {},
  registerUser: async (currentUser: {}) => {},
});

const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = (): void => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = (): void => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const registerUser = async (currentUser: {}): Promise<void> => {
    try {
      console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
