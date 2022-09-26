interface InitialStateProps {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  token: string;
  user: any;
  userLocation: string;
  jobLocation: string;
  showSidebar: boolean;
}
interface ParentNodesProps {
  children: React.ReactNode;
}
interface ReducerActionProp {
  type: string;
  payload?: {
    user?: string;
    token?: string;
    location?: string;
    msg?: string;
  };
}
interface AddToLocalStorageProps {
  user: {};
  token: string;
  location: string;
}
interface SetupDetails {
  email: string;
  password: string;
  username?: string;
  password2?: string;
  isMember: boolean;
}

export type {
  InitialStateProps,
  ParentNodesProps,
  ReducerActionProp,
  AddToLocalStorageProps,
  SetupDetails,
};
