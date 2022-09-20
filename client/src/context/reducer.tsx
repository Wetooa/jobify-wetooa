import { InitialStateProps, ReducerActionProp } from "../components/interfaces";
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";
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
      alertText: "Please provide all values",
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
  throw new Error(`No matching actions: ${action.type}`);
};

export default reducer;
