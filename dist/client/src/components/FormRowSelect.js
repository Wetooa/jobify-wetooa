"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function FormRowSelect({ labelText, name, value, handleChange, list, }) {
    return (<div className="form-row">
      <label htmlFor="jobType" className="form-label">
        {labelText}
      </label>
      <select name={name} value={value} onChange={handleChange} className="form-select">
        {list.map((itemValue, index) => {
            return (<option value={itemValue} key={index}>
              {itemValue}
            </option>);
        })}
      </select>
    </div>);
}
exports.default = FormRowSelect;
