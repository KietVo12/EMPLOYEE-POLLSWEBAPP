import { Middleware } from "redux";

const logger: Middleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("The action: ", action);
  const returnValue = next(action);
  console.log("The new state: ", store.getState());
  return returnValue;
};
export default logger;
