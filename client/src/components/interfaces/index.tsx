import { ChangeEventHandler } from "react";

interface UserProps {
  username?: string;
  location?: string;
  email?: string;
  lastname?: string;
}
interface InitialStateProps {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  token: string;
  user: UserProps | null;
  userLocation: string;
  jobLocation: string;
  showSidebar: boolean;
  isEditing: boolean;
  editJobId: string;
  position: string;
  company: string;
  jobType: string;
  status: string;
  jobTypeOptions: string[];
  statusOptions: string[];
}
interface ParentNodesProps {
  children: React.ReactNode;
}

interface ReducerActionProp {
  type: string;
  payload?: AddToLocalStorageProps & HandleChangeProps;
}
interface AddToLocalStorageProps {
  user?: UserProps;
  token?: string;
  location?: string;
  msg?: string;
}
interface HandleChangeProps {
  name?: string;
  value?: string;
}

interface SetupDetails {
  email: string;
  password: string;
  username?: string;
  password2?: string;
  isMember: boolean;
}
interface LinkProps {
  id: number;
  text: string;
  path: string;
  icon: any;
  toggleSidebar?: () => void;
}
interface FormRowProps {
  type?: string;
  name: string;
  value: string;
  handleChange: ChangeEventHandler;
  labelText?: string;
  notMatch?: boolean;
}
interface SelectFromRowProps extends FormRowProps {
  list: string[];
}
interface JobsInitialState {
  isEditing: boolean;
  editJobId: string;
  position: string;
  company: string;
  jobType: string;
  status: string;
  jobLocation: string;
}

export type {
  InitialStateProps,
  ParentNodesProps,
  ReducerActionProp,
  AddToLocalStorageProps,
  HandleChangeProps,
  SetupDetails,
  LinkProps,
  FormRowProps,
  UserProps,
  SelectFromRowProps,
  JobsInitialState,
};
