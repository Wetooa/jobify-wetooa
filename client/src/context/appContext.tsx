import React, { useContext, useReducer } from "react";
import {
  AddToLocalStorageProps,
  EditedJobProps,
  HandleChangeProps,
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
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOB_SUCCESS,
  SET_EDIT_JOB,
  GET_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  DELETE_JOB_BEGIN,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
} from "./actions";
import reducer from "./reducer";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  showSidebar: false,
  alertText: "",
  alertType: "",
  token: token || "",
  user: user ? JSON.parse(user) : null,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["fulltime", "partime", "remote", "internship"],
  jobType: "fulltime",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {
    pending: 0,
    interview: 0,
    declined: 0,
  },
  monthlyApplications: [
    {
      date: "",
      count: 0,
    },
  ],
};

const AppContext = React.createContext({
  ...initialState,
  displayAlert: () => {},
  setupUser: async (currentUser: SetupDetails) => {},
  toggleSidebar: () => {},
  signOut: () => {},
  updateUser: async (currentUser: UserProps) => {},
  handleChange: ({ name, value }: HandleChangeProps) => {},
  clearValues: () => {},
  createJob: async () => {},
  getJobs: async () => {},
  setEditJob: (id: string) => {},
  deleteJob: async (id: string) => {},
  editJob: async () => {},
  showStats: async () => {},
});

const AppProvider: React.FC<ParentNodesProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios.defaults.headers.common["authorization"] = `Bearer ${state.token}`;

  const authfetch = axios.create({
    baseURL: "/api/v1",
  });

  authfetch.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.headers!["authorization"] = `Bearer ${state.token}`;
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

  const createJob = async (): Promise<void> => {
    dispatch({ type: CREATE_JOB_BEGIN });
    console.log(state);

    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authfetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      clearValues();
    } catch (error: any) {
      if (error.response.status !== 401) return;

      dispatch({
        type: CREATE_JOB_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
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

  const handleChange = ({ name, value }: HandleChangeProps): void => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: {
        name,
        value,
      },
    });
  };

  const clearValues = (): void => {
    dispatch({ type: CLEAR_VALUES });
  };

  const getJobs = async (): Promise<void> => {
    dispatch({ type: GET_JOB_BEGIN });
    let url = "/jobs";
    try {
      const { data } = await authfetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOB_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error: any) {
      signOut();
    }
    clearAlert();
  };

  const setEditJob = (id: string): void => {
    dispatch({
      type: SET_EDIT_JOB,
      payload: {
        id,
      },
    });
  };

  const editJob = async (): Promise<void> => {
    dispatch({ type: EDIT_JOB_BEGIN });
    let url = `/jobs/${state.editJobId}`;

    const job: EditedJobProps = {
      position: state.position,
      company: state.company,
      location: state.jobLocation,
      jobType: state.jobType,
      status: state.status,
    };

    try {
      const { data } = await authfetch.patch(url, { ...job });
      dispatch({ type: EDIT_JOB_SUCCESS });
    } catch (error: any) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteJob = async (id: string): Promise<void> => {
    dispatch({ type: DELETE_JOB_BEGIN });
    let url = `/jobs/${id}`;

    try {
      await authfetch.delete(url);
      getJobs();
    } catch (error) {
      signOut();
    }
    clearAlert();
  };

  const showStats = async (): Promise<void> => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authfetch.get("/jobs/stats");

      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error: any) {
      signOut();
    }
    clearAlert();
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
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
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
