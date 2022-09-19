import { InitialStateProps, ReducerActionProp } from "../components/interfaces";
import { DISPLAY_ALERT } from "./actions";

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
  throw new Error(`No matching actions: ${action.type}`);
};

export default reducer;
