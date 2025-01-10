import { Routes, Route } from "react-router-dom";
import { setAuthedUser } from "../../../state/modules/authedUser";
import { handleInitialData } from "../../../state/modules/shared/actions";
import { screen } from "@testing-library/react";
import { AppStore, setupStore } from "../../../state/store";
import PageRoutes from "../../../state/types/page_routes";
import {
  renderWithProviders,
  renderWithProvidersAndRouter,
} from "../../../state/utils/test-utils";
import HomePage from "./home_page";
let store: AppStore;

const page = (
  <Routes>
    <Route path={PageRoutes.Home} element={<HomePage />} />
  </Routes>
);

describe("HomePage", () => {
  beforeAll(async () => {
    store = setupStore();
    await store.dispatch(handleInitialData());
    store.dispatch(setAuthedUser("tylermcginnis"));
  });
  it("should render the component", () => {
    const { container } = renderWithProviders(<HomePage />);
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });
  it("should display unanswered polls by default", () => {
    renderWithProvidersAndRouter(page, { store }, PageRoutes.Home);
    expect(screen.getByTestId("unanswered-poll-container")).toBeInTheDocument();
    expect(
      screen.queryByTestId("answered-poll-container")
    ).not.toBeInTheDocument();
  });
});
