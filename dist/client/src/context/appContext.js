"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.useAppContext = exports.initialState = exports.AppProvider = void 0;
const react_1 = __importStar(require("react"));
const actions_1 = require("./actions");
const reducer_1 = __importDefault(require("./reducer"));
const axios_1 = __importDefault(require("axios"));
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
    monthlyApplications: [{ date: "", count: 0 }],
    search: "",
    searchStatus: "all",
    searchJobType: "all",
    sortOptions: [
        "latest",
        "oldest",
        "a-z company",
        "a-z position",
        "z-a company",
        "z-a position",
    ],
    sort: "latest",
};
exports.initialState = initialState;
const AppContext = react_1.default.createContext(Object.assign(Object.assign({}, initialState), { displayAlert: () => { }, setupUser: (currentUser) => __awaiter(void 0, void 0, void 0, function* () { }), toggleSidebar: () => { }, signOut: () => { }, updateUser: (currentUser) => __awaiter(void 0, void 0, void 0, function* () { }), handleChange: ({ name, value }) => { }, clearValues: () => { }, createJob: () => __awaiter(void 0, void 0, void 0, function* () { }), getJobs: () => __awaiter(void 0, void 0, void 0, function* () { }), setEditJob: (id) => { }, deleteJob: (id) => __awaiter(void 0, void 0, void 0, function* () { }), editJob: () => __awaiter(void 0, void 0, void 0, function* () { }), showStats: () => __awaiter(void 0, void 0, void 0, function* () { }), clearFilters: () => { }, changePage: (page) => { } }));
const AppProvider = ({ children }) => {
    const [state, dispatch] = (0, react_1.useReducer)(reducer_1.default, initialState);
    const authfetch = axios_1.default.create({
        baseURL: "/api/v1",
    });
    authfetch.interceptors.request.use((config) => {
        config.headers["authorization"] = `Bearer ${state.token}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    authfetch.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        var _a;
        // sign out if Unauthenticated Error
        if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
            signOut();
        }
        return Promise.reject(error);
    });
    // alerts
    const displayAlert = () => {
        dispatch({
            type: actions_1.DISPLAY_ALERT,
        });
        clearAlert();
    };
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type: actions_1.CLEAR_ALERT,
            });
        }, 2000);
    };
    // user requests
    const setupUser = (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch({ type: actions_1.SETUP_USER_BEGIN });
        try {
            const { isMember } = currentUser;
            const response = yield axios_1.default.post(`/api/v1/auth/${isMember ? "login" : "register"}`, currentUser);
            const { user, token, location } = response.data;
            dispatch({
                type: actions_1.SETUP_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location,
                    msg: `${isMember ? "Login successful!" : "Registration Successful!"} Redirecting...`,
                },
            });
            addUserToLocalStorage({ user, token, location });
        }
        catch (error) {
            // only display setup user error when its unauthenticated error cuz we might see the alert in the register page since its a global state and all that
            dispatch({
                type: actions_1.SETUP_USER_ERROR,
                payload: {
                    msg: error.response.data.msg,
                },
            });
        }
        clearAlert();
    });
    const updateUser = (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch({ type: actions_1.SETUP_USER_BEGIN });
        try {
            const { data } = yield authfetch.patch("auth/updateUser", currentUser);
            const { user, token, location } = data;
            dispatch({
                type: actions_1.SETUP_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location,
                    msg: "Successfully updated user profile!",
                },
            });
            addUserToLocalStorage({ user, token, location });
        }
        catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: actions_1.SETUP_USER_ERROR,
                    payload: {
                        msg: error.response.data.msg,
                    },
                });
            }
        }
        clearAlert();
    });
    const signOut = () => {
        dispatch({ type: actions_1.LOG_OUT });
        removeFromLocalStorage();
    };
    const createJob = () => __awaiter(void 0, void 0, void 0, function* () {
        dispatch({ type: actions_1.CREATE_JOB_BEGIN });
        console.log(state);
        try {
            const { position, company, jobLocation, jobType, status } = state;
            yield authfetch.post("/jobs", {
                position,
                company,
                jobLocation,
                jobType,
                status,
            });
            dispatch({ type: actions_1.CREATE_JOB_SUCCESS });
            clearValues();
        }
        catch (error) {
            if (error.response.status !== 401)
                return;
            dispatch({
                type: actions_1.CREATE_JOB_ERROR,
                payload: {
                    msg: error.response.data.msg,
                },
            });
        }
        clearAlert();
    });
    // local storage functions
    const addUserToLocalStorage = ({ user, token, location, }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("location", location);
    };
    const removeFromLocalStorage = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("location");
    };
    // app functionality
    const toggleSidebar = () => {
        dispatch({ type: actions_1.TOGGLE_SIDEBAR });
    };
    const handleChange = ({ name, value }) => {
        dispatch({
            type: actions_1.HANDLE_CHANGE,
            payload: {
                name,
                value,
            },
        });
    };
    const clearValues = () => {
        if (state.isEditing) {
            dispatch({
                type: actions_1.SET_EDIT_JOB,
                payload: {
                    id: state.editJobId,
                },
            });
        }
        else {
            dispatch({
                type: actions_1.CLEAR_VALUES,
            });
        }
    };
    const getJobs = () => __awaiter(void 0, void 0, void 0, function* () {
        dispatch({ type: actions_1.GET_JOB_BEGIN });
        const { search, searchJobType, searchStatus, sort, page } = state;
        let url = `/jobs?&jobType=${searchJobType}&status=${searchStatus}&sort=${sort}`;
        if (search) {
            url += `&search=${search}&page=1`;
        }
        else {
            url += `&page=${page}`;
        }
        try {
            const { data } = yield authfetch(url);
            const { jobs, totalJobs, numOfPages } = data;
            dispatch({
                type: actions_1.GET_JOB_SUCCESS,
                payload: {
                    jobs,
                    totalJobs,
                    numOfPages,
                },
            });
        }
        catch (error) {
            signOut();
        }
        clearAlert();
    });
    const setEditJob = (id) => {
        dispatch({
            type: actions_1.SET_EDIT_JOB,
            payload: {
                id,
            },
        });
    };
    const editJob = () => __awaiter(void 0, void 0, void 0, function* () {
        dispatch({ type: actions_1.EDIT_JOB_BEGIN });
        let url = `/jobs/${state.editJobId}`;
        const job = {
            position: state.position,
            company: state.company,
            location: state.jobLocation,
            jobType: state.jobType,
            status: state.status,
        };
        try {
            yield authfetch.patch(url, Object.assign({}, job));
            dispatch({ type: actions_1.EDIT_JOB_SUCCESS });
        }
        catch (error) {
            if (error.response.status === 401)
                return;
            dispatch({
                type: actions_1.EDIT_JOB_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    });
    const deleteJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch({ type: actions_1.DELETE_JOB_BEGIN });
        let url = `/jobs/${id}`;
        try {
            yield authfetch.delete(url);
            getJobs();
        }
        catch (error) {
            signOut();
        }
        clearAlert();
    });
    const showStats = () => __awaiter(void 0, void 0, void 0, function* () {
        dispatch({ type: actions_1.SHOW_STATS_BEGIN });
        try {
            const { data } = yield authfetch.get("/jobs/stats");
            dispatch({
                type: actions_1.SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.defaultStats,
                    monthlyApplications: data.monthlyApplications,
                },
            });
        }
        catch (error) {
            signOut();
        }
        clearAlert();
    });
    const clearFilters = () => {
        dispatch({ type: actions_1.CLEAR_FILTERS });
    };
    const changePage = (page) => {
        dispatch({
            type: actions_1.CHANGE_PAGE,
            payload: {
                page,
            },
        });
    };
    return (<AppContext.Provider value={Object.assign(Object.assign({}, state), { displayAlert,
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
            clearFilters,
            changePage })}>
      {children}
    </AppContext.Provider>);
};
exports.AppProvider = AppProvider;
const useAppContext = () => {
    return (0, react_1.useContext)(AppContext);
};
exports.useAppContext = useAppContext;
