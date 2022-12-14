import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const initialState = {
  username: "",
  email: "",
  password: "",
  password2: "",
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialState);
  const [notMatch, setNotMatch] = useState(false);
  const navigate: NavigateFunction = useNavigate();

  const { isLoading, showAlert, user, displayAlert, setupUser } =
    useAppContext();

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

  const onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const { username, email, password, isMember } = values;
    if (!email || !password || (!isMember && !username)) {
      displayAlert();
      return;
    }
    await setupUser(values);
  };

  // this has a problem, during the first render, this triggers so clicking on register immediately sends us back to the dashboard
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

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
            name="username"
            value={values.username}
            handleChange={handleChange}
            labelText="username"
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

        {/* add vibrate animation later */}
        <button
          type="submit"
          className="btn btn-block"
          disabled={
            isLoading || notMatch || (!values.isMember && !values.password2)
          }
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>

        <p>
          {values.isMember ? "Not a member yet? " : "Already a member? "}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Register;
