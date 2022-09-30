import {
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
      isLoading: false,
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
  throw new Error(`No matching actions: ${action.type}`);
};

export default reducer;
