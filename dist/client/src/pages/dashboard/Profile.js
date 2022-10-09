"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const components_1 = require("../../components");
const DashboardFormPage_1 = __importDefault(require("../../assets/wrappers/DashboardFormPage"));
const appContext_1 = require("../../context/appContext");
function Profile() {
    const { user, isLoading, showAlert, displayAlert, updateUser } = (0, appContext_1.useAppContext)();
    const [username, setUsername] = (0, react_1.useState)(user === null || user === void 0 ? void 0 : user.username);
    const [lastname, setLastname] = (0, react_1.useState)(user === null || user === void 0 ? void 0 : user.lastname);
    const [email, setEmail] = (0, react_1.useState)(user === null || user === void 0 ? void 0 : user.email);
    const [location, setLocation] = (0, react_1.useState)(user === null || user === void 0 ? void 0 : user.location);
    const handleSubmit = (e) => {
        e.preventDefault();
        // remove while testing to see server trix
        if (!username || !email || !lastname || !location) {
            displayAlert();
            return;
        }
        updateUser({ username, email, lastname, location });
    };
    return (<DashboardFormPage_1.default>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <components_1.Alert />}
        <div className="form-center">
          <components_1.FormRow type="text" name="name" value={username} handleChange={(e) => setUsername(e.target.value)} labelText="Username"/>
          <components_1.FormRow type="text" name="lastname" value={lastname} handleChange={(e) => setLastname(e.target.value)} labelText="Lastname"/>
          <components_1.FormRow type="email" name="email" value={email} handleChange={(e) => setEmail(e.target.value)} labelText="Email"/>
          <components_1.FormRow type="text" name="location" value={location} handleChange={(e) => setLocation(e.target.value)} labelText="Location"/>

          <button type="submit" disabled={isLoading} className="btn btn-block">
            {isLoading ? "Please wait..." : "Save changes"}
          </button>
        </div>
      </form>
    </DashboardFormPage_1.default>);
}
exports.default = Profile;
