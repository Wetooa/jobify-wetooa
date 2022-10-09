"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("./actions");
const appContext_1 = require("./appContext");
const reducer = (state, action) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    if (action.type === actions_1.DISPLAY_ALERT) {
        return Object.assign(Object.assign({}, state), { showAlert: true, alertType: "danger", alertText: "Please provide all values!" });
    }
    if (action.type === actions_1.CLEAR_ALERT) {
        return Object.assign(Object.assign({}, state), { showAlert: false, alertType: "", alertText: "" });
    }
    if (action.type === actions_1.SETUP_USER_BEGIN) {
        return Object.assign(Object.assign({}, state), { isLoading: true });
    }
    if (action.type === actions_1.SETUP_USER_SUCCESS) {
        return Object.assign(Object.assign({}, state), { isLoading: false, token: (_a = action.payload) === null || _a === void 0 ? void 0 : _a.token, user: (_b = action.payload) === null || _b === void 0 ? void 0 : _b.user, userLocation: (_c = action.payload) === null || _c === void 0 ? void 0 : _c.location, jobLocation: (_d = action.payload) === null || _d === void 0 ? void 0 : _d.location, showAlert: true, alertType: "success", alertText: (_e = action.payload) === null || _e === void 0 ? void 0 : _e.msg });
    }
    if (action.type === actions_1.SETUP_USER_ERROR) {
        return Object.assign(Object.assign({}, state), { isLoading: false, showAlert: true, alertType: "danger", alertText: (_f = action.payload) === null || _f === void 0 ? void 0 : _f.msg });
    }
    if (action.type === actions_1.TOGGLE_SIDEBAR) {
        return Object.assign(Object.assign({}, state), { showSidebar: !state.showSidebar });
    }
    if (action.type === actions_1.LOG_OUT) {
        return Object.assign(Object.assign({}, appContext_1.initialState), { token: "", user: null, jobLocation: "", userLocation: "" });
    }
    if (action.type === actions_1.HANDLE_CHANGE) {
        return Object.assign(Object.assign({}, state), { [action.payload.name]: action.payload.value });
    }
    if (action.type === actions_1.CLEAR_VALUES) {
        const initialState = {
            isEditing: false,
            editJobId: "",
            position: "",
            company: "",
            jobType: "fulltime",
            status: "pending",
            jobLocation: state.userLocation,
        };
        return Object.assign(Object.assign({}, state), initialState);
    }
    if (action.type === actions_1.CREATE_JOB_BEGIN) {
        return Object.assign(Object.assign({}, state), { isLoading: true });
    }
    if (action.type === actions_1.CREATE_JOB_SUCCESS) {
        return Object.assign(Object.assign({}, state), { isLoading: false, showAlert: true, alertType: "success", alertText: "Successfully added job!" });
    }
    if (action.type === actions_1.CREATE_JOB_ERROR) {
        return Object.assign(Object.assign({}, state), { isLoading: false, showAlert: true, alertType: "danger", alertText: (_g = action.payload) === null || _g === void 0 ? void 0 : _g.msg });
    }
    if (action.type === actions_1.GET_JOB_BEGIN) {
        return Object.assign(Object.assign({}, state), { isLoading: true, showAlert: false });
    }
    if (action.type === actions_1.GET_JOB_SUCCESS) {
        return Object.assign(Object.assign({}, state), { isLoading: false, jobs: (_h = action.payload) === null || _h === void 0 ? void 0 : _h.jobs, totalJobs: (_j = action.payload) === null || _j === void 0 ? void 0 : _j.totalJobs, numOfPages: (_k = action.payload) === null || _k === void 0 ? void 0 : _k.numOfPages });
    }
    if (action.type === actions_1.SET_EDIT_JOB) {
        const job = state.jobs.find((job) => { var _a; return job._id === ((_a = action.payload) === null || _a === void 0 ? void 0 : _a.id); });
        const { _id, company, position, jobType, jobLocation, status } = job;
        return Object.assign(Object.assign({}, state), { isEditing: true, editJobId: _id, company,
            position,
            jobLocation,
            jobType,
            status });
    }
    if (action.type === actions_1.EDIT_JOB_BEGIN) {
        return Object.assign(Object.assign({}, state), { isLoading: true });
    }
    if (action.type === actions_1.EDIT_JOB_SUCCESS) {
        return Object.assign(Object.assign({}, state), { isLoading: false, showAlert: true, alertType: "success", alertText: "Successfully edited job!" });
    }
    if (action.type === actions_1.EDIT_JOB_ERROR) {
        return Object.assign(Object.assign({}, state), { isLoading: false, showAlert: true, alertType: "danger", alertText: (_l = action.payload) === null || _l === void 0 ? void 0 : _l.msg });
    }
    if (action.type === actions_1.DELETE_JOB_BEGIN) {
        return Object.assign(Object.assign({}, state), { isLoading: true });
    }
    if (action.type === actions_1.SHOW_STATS_BEGIN) {
        return Object.assign(Object.assign({}, state), { isLoading: true, showAlert: false });
    }
    if (action.type === actions_1.SHOW_STATS_SUCCESS) {
        return Object.assign(Object.assign({}, state), { isLoading: false, stats: (_m = action.payload) === null || _m === void 0 ? void 0 : _m.stats, monthlyApplications: (_o = action.payload) === null || _o === void 0 ? void 0 : _o.monthlyApplications });
    }
    if (action.type === actions_1.CLEAR_FILTERS) {
        const initialState = {
            search: "",
            searchStatus: "all",
            searchJobType: "all",
            sort: "latest",
        };
        return Object.assign(Object.assign({}, state), initialState);
    }
    if (action.type === actions_1.CHANGE_PAGE) {
        return Object.assign(Object.assign({}, state), { page: (_p = action.payload) === null || _p === void 0 ? void 0 : _p.page });
    }
    throw new Error(`No matching actions: ${action.type}`);
};
exports.default = reducer;
