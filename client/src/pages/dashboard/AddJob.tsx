import { ChangeEvent, FormEvent } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, Alert } from "../../components";
import FormRowSelect from "../../components/FormRowSelect";
import { useAppContext } from "../../context/appContext";

function AddJob() {
  const {
    showAlert,
    isEditing,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    displayAlert,
    handleChange,
    clearValues,
  } = useAppContext();

  const handleJobInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    handleChange({ name: e.target!.name, value: e.target!.value });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    console.log("create job");
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            name="position"
            labelText="position"
            type="text"
            value={position}
            handleChange={handleJobInput}
          />

          <FormRow
            name="company"
            labelText="company"
            type="text"
            value={company}
            handleChange={handleJobInput}
          />

          <FormRow
            name="jobLocation"
            labelText="location"
            type="text"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          {/* job status */}
          <FormRowSelect
            name="status"
            labelText="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          <div className="btn-container">
            <button className="btn btn-block submit-btn">Submit</button>
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={clearValues}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}
export default AddJob;
