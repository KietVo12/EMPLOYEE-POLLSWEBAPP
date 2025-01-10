import LoadingStatus from "./loading_status";

export default interface IState<T> {
  entities: T;
  loading: LoadingStatus;
  error?: string;
}
