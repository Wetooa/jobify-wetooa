"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobsContainer_1 = __importDefault(require("../assets/wrappers/JobsContainer"));
const appContext_1 = require("../context/appContext");
const Job_1 = __importDefault(require("./Job"));
const Loading_1 = __importDefault(require("./Loading"));
const PageBtnContainer_1 = __importDefault(require("./PageBtnContainer"));
const react_1 = require("react");
function JobsContainer() {
    const { isLoading, jobs, totalJobs, numOfPages, page, getJobs } = (0, appContext_1.useAppContext)();
    (0, react_1.useEffect)(() => {
        getJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);
    if (isLoading) {
        return <Loading_1.default center/>;
    }
    if (jobs && jobs.length === 0) {
        return (<JobsContainer_1.default>
        <h2>No jobs to display...</h2>
      </JobsContainer_1.default>);
    }
    return (<JobsContainer_1.default>
      <h5>
        {totalJobs} job{totalJobs > 1 && "s"} Found
      </h5>
      {numOfPages > 1 && <PageBtnContainer_1.default />}
      <div className="jobs">
        {jobs.map((job) => {
            return <Job_1.default key={job._id} {...job}/>;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer_1.default />}
    </JobsContainer_1.default>);
}
exports.default = JobsContainer;
