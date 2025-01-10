import authedUser from "./modules/authedUser";
import questions from "./modules/questions";
import users from "./modules/users";
import logger from "./middlewares/logger";
import prefrences from "./modules/prefrences/prefrencesSlice";
import snackbar from "./modules/snackbar/snackbarSlice";
import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

const reducers = { authedUser, users, questions, prefrences, snackbar };

const rootReducer = combineReducers(reducers);

const middleWares = [logger];

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(...middleWares),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
