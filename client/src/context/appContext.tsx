import React, { useContext, useReducer } from "react";
import {
  AddToLocalStorageProps,
  AppContextProps,
  SetupDetails,
} from "../components/interfaces";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
} from "./actions";
import reducer from "./reducer";
import axios from "axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  token: token || "",
  user: user ? JSON.parse(user) : null,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
};

const AppContext = React.createContext({
  ...initialState,
  displayAlert: () => {},
  setupUser: async (currentUser: SetupDetails) => {},
  removeUserToLocalStorage: () => {},
});

const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = (): void => {
    dispatch({
      type: DISPLAY_ALERT,
    });
    clearAlert();
  };

  const clearAlert = (): void => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 2000);
  };

  const setupUser = async (currentUser: SetupDetails): Promise<void> => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { isMember } = currentUser;
      const response = await axios.post(
        `/api/v1/auth/${isMember ? "login" : "register"}`,
        currentUser
      );

      const { user, token, location } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          msg: `${
            isMember ? "Login successful!" : "Registration Successful!"
          } Redirecting...`,
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error: any) {
      console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  const addUserToLocalStorage = ({
    user,
    token,
    location,
  }: AddToLocalStorageProps): void => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("location", location);
  };

  const removeUserToLocalStorage = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        removeUserToLocalStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
