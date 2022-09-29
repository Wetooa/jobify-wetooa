import React, { useContext, useReducer } from "react";
import {
  AddToLocalStorageProps,
  ParentNodesProps,
  SetupDetails,
  UserProps,
} from "../components/interfaces";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOG_OUT,
} from "./actions";
import reducer from "./reducer";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

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
  showSidebar: false,
};

const AppContext = React.createContext({
  ...initialState,
  displayAlert: () => {},
  setupUser: async (currentUser: SetupDetails) => {},
  toggleSidebar: () => {},
  signOut: () => {},
  updateUser: async (currentUser: UserProps) => {},
});

const AppProvider: React.FC<ParentNodesProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios.defaults.headers.common["authorization"] = `Bearer ${state.token}`;

  const authfetch = axios.create({
    baseURL: "/api/v1",
  });

  authfetch.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // config.headers!["authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  authfetch.interceptors.response.use(
    (response: AxiosRequestConfig) => {
      return response;
    },
    (error: AxiosError) => {
      // sign out if Unauthenticated Error
      if (error.response?.status === 401) {
        signOut();
      }
      return Promise.reject(error);
    }
  );

  // alerts
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

  // user requests
  const setupUser = async (currentUser: SetupDetails): Promise<void> => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { isMember } = currentUser;
      const response = await axios.post(
        `/api/v1/auth/${isMember ? "login" : "register"}`,
        currentUser
      );

      const { user, token, location }: AddToLocalStorageProps = response.data;
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
      // only display setup user error when its unauthenticated error cuz we might see the alert in the register page since its a global state and all that
      dispatch({
        type: SETUP_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  const updateUser = async (currentUser: UserProps): Promise<void> => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await authfetch.patch("auth/updateUser", currentUser);
      const { user, token, location }: AddToLocalStorageProps = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          msg: "Successfully updated user profile!",
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error: any) {
      if (error.response.status !== 401) {
        dispatch({
          type: SETUP_USER_ERROR,
          payload: {
            msg: error.response.data.msg,
          },
        });
      }
    }
    clearAlert();
  };

  const signOut = (): void => {
    dispatch({ type: LOG_OUT });
    removeFromLocalStorage();
  };

  // local storage functions
  const addUserToLocalStorage = ({
    user,
    token,
    location,
  }: AddToLocalStorageProps): void => {
    localStorage.setItem("token", token!);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("location", location!);
  };

  const removeFromLocalStorage = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  // app functionality
  const toggleSidebar = (): void => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        signOut,
        updateUser,
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
