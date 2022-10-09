"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SearchContainer_1 = __importDefault(require("../assets/wrappers/SearchContainer"));
const _1 = require(".");
const appContext_1 = require("../context/appContext");
const react_1 = require("react");
function SearchContainer() {
    const { isLoading, search, searchStatus, statusOptions, searchJobType, jobTypeOptions, sortOptions, sort, clearFilters, handleChange, getJobs, } = (0, appContext_1.useAppContext)();
    const handleSearch = (e) => {
        handleChange({ name: e.target.name, value: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        clearFilters();
    };
    (0, react_1.useEffect)(() => {
        getJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, searchJobType, searchStatus, sort]);
    return (<SearchContainer_1.default>
      <form className="form">
        <h4>Search Form</h4>
        <div className="form-center">
          <_1.FormRow type="text" name="search" value={search} labelText="search" handleChange={handleSearch}/>

          {/* btw good thing to note, spread operator, im dumb regarding this cuz im a python lover */}
          <_1.FormRowSelect labelText="Status" name="searchStatus" value={searchStatus} list={["all", ...statusOptions]} handleChange={handleSearch}/>
          <_1.FormRowSelect labelText="Job Type" name="searchJobType" value={searchJobType} list={["all", ...jobTypeOptions]} handleChange={handleSearch}/>
          <_1.FormRowSelect labelText="Sort" name="sort" value={sort} list={sortOptions} handleChange={handleSearch}/>
          <button type="submit" className="btn btn-danger btn-block" onClick={handleSubmit} disabled={isLoading}>
            Clear Filters
          </button>
        </div>
      </form>
    </SearchContainer_1.default>);
}
exports.default = SearchContainer;
