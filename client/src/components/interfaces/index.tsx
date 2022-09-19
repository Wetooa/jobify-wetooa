interface InitialStateProps {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
}
interface AppContextProps {
  children: React.ReactNode;
}
interface ReducerActionProp {
  type: string;
}

export type { InitialStateProps, AppContextProps, ReducerActionProp };
