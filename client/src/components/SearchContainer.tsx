import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import { ChangeEvent, FormEvent, useEffect } from "react";

function SearchContainer() {
  const {
    isLoading,
    search,
    searchStatus,
    statusOptions,
    searchJobType,
    jobTypeOptions,
    sortOptions,
    sort,
    clearFilters,
    handleChange,
    getJobs,
  } = useAppContext();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearFilters();
  };

  useEffect(() => {
    getJobs();
  }, [search, searchJobType, searchStatus, sort]);

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            labelText="search"
            handleChange={handleSearch}
          />

          {/* btw good thing to note, spread operator, im dumb regarding this cuz im a python lover */}
          <FormRowSelect
            labelText="Status"
            name="searchStatus"
            value={searchStatus}
            list={["all", ...statusOptions]}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText="Job Type"
            name="searchJobType"
            value={searchJobType}
            list={["all", ...jobTypeOptions]}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText="Sort"
            name="sort"
            value={sort}
            list={sortOptions}
            handleChange={handleSearch}
          />
          <button
            type="submit"
            className="btn btn-danger btn-block"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
export default SearchContainer;
