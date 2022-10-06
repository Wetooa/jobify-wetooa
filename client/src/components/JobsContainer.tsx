import Wrapper from "../assets/wrappers/JobsContainer";
import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Job from "./Job";
import Loading from "./Loading";
import { IndividualJobProps } from "./interfaces";

function JobsContainer() {
  const { isLoading, jobs, totalJobs, numOfPages, getJobs } = useAppContext();

  useEffect(() => {
    getJobs();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs && jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs > 1 && "s"} Found
      </h5>
      <div className="jobs">
        {jobs.map((job: IndividualJobProps) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
}
export default JobsContainer;
