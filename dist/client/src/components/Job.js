"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const appContext_1 = require("../context/appContext");
const fa_1 = require("react-icons/fa");
const moment_1 = __importDefault(require("moment"));
const Job_1 = __importDefault(require("../assets/wrappers/Job"));
const JobInfo_1 = __importDefault(require("./JobInfo"));
function Job({ _id, company, position, jobLocation, jobType, status, createdAt, }) {
    const { setEditJob, deleteJob } = (0, appContext_1.useAppContext)();
    let date = (0, moment_1.default)(createdAt);
    date = date.format("MMM Do, YYYY");
    return (<Job_1.default>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <JobInfo_1.default icon={<fa_1.FaLocationArrow />} text={jobLocation}/>
          <JobInfo_1.default icon={<fa_1.FaCalendarAlt />} text={date}/>
          <JobInfo_1.default icon={<fa_1.FaBriefcase />} text={jobType}/>
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <react_router_dom_1.Link to="/add-job" className="btn edit-btn" onClick={() => setEditJob(_id)}>
            edit
          </react_router_dom_1.Link>
          <button type="button" className="btn delete-btn" onClick={() => deleteJob(_id)}>
            delete job
          </button>
        </footer>
      </div>
    </Job_1.default>);
}
exports.default = Job;
