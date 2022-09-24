interface InitialStateProps {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  token: string;
  user: any;
  userLocation: string;
  jobLocation: string;
}
interface AppContextProps {
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

export type {
  InitialStateProps,
  AppContextProps,
  ReducerActionProp,
  AddToLocalStorageProps,
};
