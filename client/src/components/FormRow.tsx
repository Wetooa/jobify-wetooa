import { ChangeEventHandler } from "react";

type FormRowProps = {
  type: string;
  name: string;
  value: string;
  handleChange: ChangeEventHandler;
  labelText: string;
  notMatch?: boolean;
};

function FormRow({
  type,
  name,
  value,
  handleChange,
  labelText,
  notMatch,
}: FormRowProps) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        className={notMatch ? `form-input form-input-error` : `form-input`}
        onChange={handleChange}
      />
    </div>
  );
}
export default FormRow;
