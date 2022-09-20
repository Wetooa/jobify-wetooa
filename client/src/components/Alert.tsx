import { useAppContext } from "../context/appContext";

function Alert() {
  const { alertType, alertText, clearAlert } = useAppContext();

  clearAlert();

  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
}
export default Alert;
