import React, { useContext, useReducer } from "react";
import {
  AddToLocalStorageProps,
  AppContextProps,
} from "../components/interfaces";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
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
  registerUser: async (currentUser: {}) => {},
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
    }, 3000);
  };

  const registerUser = async (currentUser: {}): Promise<void> => {
    // begin with dispatch statement that triggers loading
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      // get data
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { user, token, location } = response.data;
      console.log(response.data);

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });

      // add to local storage
      addUserToLocalStorage({ user, token, location });
    } catch (error: any) {
      // handle error
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
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
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
