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
const DashboardFormPage_1 = __importDefault(require("../../assets/wrappers/DashboardFormPage"));
const components_1 = require("../../components");
const FormRowSelect_1 = __importDefault(require("../../components/FormRowSelect"));
const appContext_1 = require("../../context/appContext");
function AddJob() {
    const { isLoading, showAlert, isEditing, position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions, displayAlert, handleChange, clearValues, createJob, editJob, } = (0, appContext_1.useAppContext)();
    const handleJobInput = (e) => {
        handleChange({ name: e.target.name, value: e.target.value });
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!position || !company || !jobLocation) {
            displayAlert();
            return;
        }
        if (isEditing) {
            editJob();
        }
        else {
            createJob();
        }
    });
    return (<DashboardFormPage_1.default>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <components_1.Alert />}

        <div className="form-center">
          <components_1.FormRow name="position" labelText="position" type="text" value={position} handleChange={handleJobInput}/>

          <components_1.FormRow name="company" labelText="company" type="text" value={company} handleChange={handleJobInput}/>

          <components_1.FormRow name="jobLocation" labelText="location" type="text" value={jobLocation} handleChange={handleJobInput}/>

          {/* job type */}
          <FormRowSelect_1.default name="jobType" labelText="job type" value={jobType} handleChange={handleJobInput} list={jobTypeOptions}/>

          {/* job status */}
          <FormRowSelect_1.default name="status" labelText="status" value={status} handleChange={handleJobInput} list={statusOptions}/>

          <div className="btn-container">
            <button type="submit" className="btn btn-block submit-btn" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </button>
            <button type="button" className="btn btn-block clear-btn" onClick={clearValues}>
              Clear
            </button>
          </div>
        </div>
      </form>
    </DashboardFormPage_1.default>);
}
exports.default = AddJob;
