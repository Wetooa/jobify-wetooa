import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialState);
  const [notMatch, setNotMatch] = useState(false);

  const { isLoading, showAlert } = useAppContext();
  console.log(isLoading);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  // cool retype password feature + delay feature B)
  useEffect(() => {
    setTimeout(() => {
      if (
        values.password &&
        values.password2 &&
        values.password !== values.password2
      ) {
        return setNotMatch(true);
      } else {
        return setNotMatch(false);
      }
    }, 500);
  }, [values.password2, values.password]);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText="name"
          />
        )}

        {/* email field */}
        <FormRow
          type="text"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="email"
        />

        {/* password */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="password"
        />

        {/* retype password */}
        {!values.isMember && (
          <FormRow
            type="password"
            name="password2"
            value={values.password2}
            handleChange={handleChange}
            labelText="retype password"
            notMatch={notMatch}
          />
        )}

        <button type="submit" className="btn btn-block">
          Submit
        </button>

        <p>
          {values.isMember ? "Not a member yet? " : "Already a member? "}
          <button onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Register;
