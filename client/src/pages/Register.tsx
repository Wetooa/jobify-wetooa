import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
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

  const { isLoading, showAlert, displayAlert, registerUser } = useAppContext();

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
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };
    if (isMember) {
      console.log("already a member");
    } else {
      registerUser(currentUser);
    }
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

        {/* add vibrate animation later */}
        <button
          type="submit"
          className="btn btn-block"
          disabled={isLoading || notMatch || !values.password2}
        >
          Submit
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
