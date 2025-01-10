import { Routes, Route } from "react-router-dom";
import { renderWithProvidersAndRouter } from "../../../state/utils/test-utils";
import PageRoutes from "../../../state/types/page_routes";
import Login from "./login_page";
import { setAuthedUser } from "../../../state/modules/authedUser";
import { handleInitialData } from "../../../state/modules/shared/actions";
import { AppStore, setupStore } from "../../../state/store";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as hooks from "../../app/hooks";
import * as router from "react-router";
let store: AppStore;

const page = (
  <Routes>
    <Route path={PageRoutes.Login} element={<Login />} />
  </Routes>
);

describe("Login", () => {
  beforeAll(async () => {
    store = setupStore();
    await store.dispatch(handleInitialData());
    store.dispatch(setAuthedUser("tylermcginnis"));
  });

  it("should render the component", () => {
    const { container } = renderWithProvidersAndRouter(<Login />);
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it("should login after user submits login information", async () => {
    renderWithProvidersAndRouter(page, { store }, PageRoutes.Login);
    const users = store.getState().users.entities;
    const user = Object.keys(users)[0];

    const selector = screen.getByTestId("username-select-menu");
    const submitButton = screen.getByTestId("login-button");

    expect(selector).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    const useDispatchMock = jest.spyOn(hooks, "useAppDispatch");
    const useNavigateMock = jest.spyOn(router, "useNavigate");

    fireEvent.change(selector, { target: { value: user } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(useDispatchMock).toBeCalled());

    expect(useNavigateMock).toBeCalled();
  });
});
