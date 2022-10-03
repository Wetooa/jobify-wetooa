import {
  IndividualJobProps,
  InitialStateProps,
  JobsInitialState,
  ReducerActionProp,
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
  GET_JOB_BEGIN,
  GET_JOB_SUCCESS,
  SET_EDIT_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  DELETE_JOB_BEGIN,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (
  state: InitialStateProps,
  action: ReducerActionProp
): InitialStateProps => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload?.token!,
      user: action.payload?.user!,
      userLocation: action.payload?.location!,
      jobLocation: action.payload?.location!,
      showAlert: true,
      alertType: "success",
      alertText: action.payload?.msg!,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload?.msg!,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOG_OUT) {
    return {
      ...initialState,
      token: "",
      user: null,
      jobLocation: "",
      userLocation: "",
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload!.name!]: action.payload!.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState: JobsInitialState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobType: "fulltime",
      status: "pending",
      jobLocation: state.userLocation,
    };
    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === CREATE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Successfully added job!",
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload?.msg!,
    };
  }
  if (action.type === GET_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload?.jobs!,
      totalJobs: action.payload?.totalJobs!,
      numOfPages: action.payload?.numOfPages!,
    };
  }
  if (action.type === SET_EDIT_JOB) {
    const job: IndividualJobProps = state.jobs.find(
      (job: IndividualJobProps) => job._id === action.payload?.id
    );
    const { _id, company, position, jobType, jobLocation, status } = job;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      company,
      position,
      jobLocation,
      jobType,
      status,
    };
  }
  if (action.type === EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Successfully edited job!",
    };
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload?.msg!,
    };
  }
  if (action.type === DELETE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload?.stats!,
      monthlyApplications: action.payload?.monthlyApplications!,
    };
  }
  throw new Error(`No matching actions: ${action.type}`);
};

export default reducer;
