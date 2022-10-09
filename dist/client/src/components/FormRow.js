"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function FormRow({ type, name, value, handleChange, labelText, notMatch, }) {
    return (<div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input type={type} name={name} placeholder={name} value={value} className={notMatch ? `form-input form-input-error` : `form-input`} onChange={handleChange}/>
    </div>);
}
exports.default = FormRow;
