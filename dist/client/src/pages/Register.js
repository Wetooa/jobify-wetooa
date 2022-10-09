"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterPage_1 = __importDefault(require("../assets/wrappers/RegisterPage"));
const components_1 = require("../components");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const appContext_1 = require("../context/appContext");
const initialState = {
    username: "",
    email: "",
    password: "",
    password2: "",
    isMember: true,
};
function Register() {
    const [values, setValues] = (0, react_1.useState)(initialState);
    const [notMatch, setNotMatch] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { isLoading, showAlert, user, displayAlert, setupUser } = (0, appContext_1.useAppContext)();
    const handleChange = (e) => {
        setValues(Object.assign(Object.assign({}, values), { [e.target.name]: e.target.value }));
    };
    const toggleMember = () => {
        setValues(Object.assign(Object.assign({}, values), { isMember: !values.isMember }));
    };
    // cool retype password feature + delay feature B)
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            if (values.password &&
                values.password2 &&
                values.password !== values.password2) {
                return setNotMatch(true);
            }
            else {
                return setNotMatch(false);
            }
        }, 500);
    }, [values.password2, values.password]);
    const onSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const { username, email, password, isMember } = values;
        if (!email || !password || (!isMember && !username)) {
            displayAlert();
            return;
        }
        yield setupUser(values);
    });
    // this has a problem, during the first render, this triggers so clicking on register immediately sends us back to the dashboard
    (0, react_1.useEffect)(() => {
        if (user) {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }, [user, navigate]);
    return (<RegisterPage_1.default>
      <form className="form" onSubmit={onSubmit}>
        <components_1.Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <components_1.Alert />}

        {/* name field */}
        {!values.isMember && (<components_1.FormRow type="text" name="username" value={values.username} handleChange={handleChange} labelText="username"/>)}

        {/* email field */}
        <components_1.FormRow type="text" name="email" value={values.email} handleChange={handleChange} labelText="email"/>

        {/* password */}
        <components_1.FormRow type="password" name="password" value={values.password} handleChange={handleChange} labelText="password"/>

        {/* retype password */}
        {!values.isMember && (<components_1.FormRow type="password" name="password2" value={values.password2} handleChange={handleChange} labelText="retype password" notMatch={notMatch}/>)}

        {/* add vibrate animation later */}
        <button type="submit" className="btn btn-block" disabled={isLoading || notMatch || (!values.isMember && !values.password2)}>
          {isLoading ? "Loading..." : "Submit"}
        </button>

        <p>
          {values.isMember ? "Not a member yet? " : "Already a member? "}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </RegisterPage_1.default>);
}
exports.default = Register;
