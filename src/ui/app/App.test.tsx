import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithProvidersAndRouter } from "../../state/utils/test-utils";
import { AppStore, setupStore } from "../../state/store";
import { handleInitialData } from "../../state/modules/shared/actions";
import { setAuthedUser } from "../../state/modules/authedUser";

let store: AppStore;

describe("App", () => {
  beforeAll(async () => {
    store = setupStore();
    await store.dispatch(handleInitialData());
  });

  it("should render the component", () => {
    const { container } = renderWithProvidersAndRouter(<App />);
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it("should render the login page if user is not logged in", () => {
    renderWithProvidersAndRouter(<App />);
    expect(screen.getByTestId("login-container")).toBeInTheDocument();
    expect(screen.queryByTestId("header-appbar")).not.toBeInTheDocument();
  });

  it("should render the home page if user is logged in", async () => {
    store.dispatch(setAuthedUser("tylermcginnis"));
    renderWithProvidersAndRouter(<App />, { store });
    expect(screen.getByTestId("home-container")).toBeInTheDocument();
  });

  it("should render the header if user is logged in", async () => {
    renderWithProvidersAndRouter(<App />, { store });
    expect(screen.getByTestId("header-appbar")).toBeInTheDocument();
  });
});

