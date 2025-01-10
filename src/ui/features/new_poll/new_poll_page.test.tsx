import { Route, Routes } from "react-router-dom";
import { AppStore, setupStore } from "../../../state/store";
import NewPollPage from "./new_poll_page";
import PageRoutes from "../../../state/types/page_routes";
import { renderWithProvidersAndRouter } from "../../../state/utils/test-utils";
import { setAuthedUser } from "../../../state/modules/authedUser";
import { handleInitialData } from "../../../state/modules/shared/actions";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as hooks from "../../app/hooks";
import * as router from "react-router";
let store: AppStore;

const page = (
  <Routes>
    <Route path={PageRoutes.New} element={<NewPollPage />} />
  </Routes>
);

describe("NewPollPage", () => {
  beforeAll(async () => {
    store = setupStore();
    await store.dispatch(handleInitialData());
    store.dispatch(setAuthedUser("tylermcginnis"));
  });

  it("should render the component", () => {
    const { container } = renderWithProvidersAndRouter(<NewPollPage />);
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it("should submit a new poll and navigate", async () => {
    renderWithProvidersAndRouter(page, { store }, PageRoutes.New);

    const optionOneTextField = screen.getByTestId("option-one-text-field");
    const optionTwoTextField = screen.getByTestId("option-two-text-field");
    const submitButton = screen.getByTestId("submit-poll-button");

    expect(optionOneTextField).toBeInTheDocument();
    expect(optionTwoTextField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    const useDispatchMock = jest.spyOn(hooks, "useAppDispatch");
    const useNavigateMock = jest.spyOn(router, "useNavigate");

    fireEvent.change(optionOneTextField, {
      target: { value: "Be a java developer" },
    });
    fireEvent.change(optionTwoTextField, {
      target: { value: "Be a javascript developer" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => expect(useDispatchMock).toBeCalled());
    expect(useNavigateMock).toBeCalled();
  });
});
