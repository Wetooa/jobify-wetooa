import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Job from "./Job";
import Loading from "./Loading";
import { IndividualJobProps } from "./interfaces";
import PageBtnContainer from "./PageBtnContainer";
import { useEffect } from "react";

function JobsContainer() {
  const { isLoading, jobs, totalJobs, numOfPages, page, getJobs } =
    useAppContext();

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
      {numOfPages > 1 && <PageBtnContainer />}
      <div className="jobs">
        {jobs.map((job: IndividualJobProps) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
}
export default JobsContainer;
