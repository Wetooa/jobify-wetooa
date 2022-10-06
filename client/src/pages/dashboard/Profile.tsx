import { ChangeEvent, FormEvent, useState } from "react";
import { FormRow, Alert } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";

function Profile() {
  const { user, isLoading, showAlert, displayAlert, updateUser } =
    useAppContext();

  const [username, setUsername] = useState(user?.username);
  const [lastname, setLastname] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // remove while testing to see server trix
    if (!username || !email || !lastname || !location) {
      displayAlert();
      return;
    }
    updateUser({ username, email, lastname, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={username}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            labelText="Username"
          />
          <FormRow
            type="text"
            name="lastname"
            value={lastname}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLastname(e.target.value)
            }
            labelText="Lastname"
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            labelText="Email"
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLocation(e.target.value)
            }
            labelText="Location"
          />

          <button type="submit" disabled={isLoading} className="btn btn-block">
            {isLoading ? "Please wait..." : "Save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
export default Profile;
