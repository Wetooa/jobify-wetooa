import e from "express";
import { ChangeEvent, FormEvent } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";

function AddJob() {
  const {
    showAlert,
    isEditing,
    position,
    company,
    jobLocation,
    status,
    jobType,
  } = useAppContext();

  const handleJobInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`name: ${name} val: ${value}`);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    console.log("e");
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

          <FormRow
            name="status"
            labelText="status"
            type="text"
            value={status}
            handleChange={handleJobInput}
          />

          <FormRow
            name="jobType"
            labelText="job type"
            type="text"
            value={jobType}
            handleChange={handleJobInput}
          />

          <div className="btn-container">
            <button className="btn btn-block submit-btn">Submit</button>
            <button className="btn btn-block clear-btn">Clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}
export default AddJob;
