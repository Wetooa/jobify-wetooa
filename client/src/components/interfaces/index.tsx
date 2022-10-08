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
  jobs: any;
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: StatsProps;
  monthlyApplications: any[];
  search: string;
  searchStatus: string;
  searchJobType: string;
  sortOptions: string[];
  sort: string;
}
interface ParentNodesProps {
  children: React.ReactNode;
}

interface ReducerActionProp {
  type: string;
  payload?: AddToLocalStorageProps &
    HandleChangeProps &
    GetJobProps &
    EditJobProps &
    ShowStatsProps &
    ChangePageProps;
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
interface GetJobProps {
  jobs?: {}[];
  totalJobs?: number;
  numOfPages?: number;
}
interface EditJobProps {
  id?: string;
}
interface ShowStatsProps {
  stats?: StatsProps;
  monthlyApplications?: string[];
}
interface ChangePageProps {
  page?: number;
}
interface StatsProps {
  pending: number;
  interview: number;
  declined: number;
}
interface FiltersInitialState {
  search: string;
  searchStatus: string;
  searchJobType: string;
  sort: string;
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
  icon: JSX.Element;
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
interface IndividualJobProps {
  _id: string;
  company: string;
  position: string;
  status: string;
  jobType: string;
  jobLocation: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface JobInfoProps {
  icon: JSX.Element;
  text: string;
}
interface EditedJobProps {
  position: string;
  company: string;
  location: string;
  jobType: string;
  status: string;
}
interface StatItemProps {
  title: string;
  count: number;
  icon: JSX.Element;
  color: string;
  bcg: string;
}

interface ChartDataProps {
  data: {
    date: string;
    count: number;
  }[];
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
  IndividualJobProps,
  JobInfoProps,
  EditedJobProps,
  StatItemProps,
  ChartDataProps,
  FiltersInitialState,
};
