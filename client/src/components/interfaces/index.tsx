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
  jobTypeOptions: string[];
  jobType: string;
  statusOptions: string[];
  status: string;
}
interface ParentNodesProps {
  children: React.ReactNode;
}
interface ReducerActionProp {
  type: string;
  payload?: AddToLocalStorageProps;
}
interface AddToLocalStorageProps {
  user?: UserProps;
  token?: string;
  location?: string;
  msg?: string;
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
  type: string;
  name: string;
  value: string;
  handleChange: ChangeEventHandler;
  labelText?: string;
  notMatch?: boolean;
}

export type {
  InitialStateProps,
  ParentNodesProps,
  ReducerActionProp,
  AddToLocalStorageProps,
  SetupDetails,
  LinkProps,
  FormRowProps,
  UserProps,
};
