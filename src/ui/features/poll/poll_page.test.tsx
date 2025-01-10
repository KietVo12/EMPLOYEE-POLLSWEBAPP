import { Route, Routes } from "react-router-dom";
import { setAuthedUser } from "../../../state/modules/authedUser";
import { AppStore, setupStore } from "../../../state/store";
import { renderWithProvidersAndRouter } from "../../../state/utils/test-utils";
import PollPage from "./poll_page";
import { handleInitialData } from "../../../state/modules/shared/actions";
import { fireEvent, screen } from "@testing-library/react";
import PageRoutes from "../../../state/types/page_routes";

let store: AppStore;
const page = (
  <Routes>
    <Route path={PageRoutes.Question} element={<PollPage />} />
  </Routes>
);
describe("PollPage", () => {
  beforeAll(async () => {
    store = setupStore();
    await store.dispatch(handleInitialData());
    store.dispatch(setAuthedUser("tylermcginnis"));
  });

  it("should render the component", () => {
    const { container } = renderWithProvidersAndRouter(<PollPage />);
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it("should render AnswerPoll form if user has not voted on the poll", () => {
    renderWithProvidersAndRouter(
      page,
      { store },
      "/questions/8xf0y6ziyjabvozdd253nd"
    );
    expect(screen.getByTestId("answer-poll-container")).toBeInTheDocument();
  });

  it("should render PollResults if user has already voted on the poll", () => {
    renderWithProvidersAndRouter(
      page,
      { store },
      "/questions/vthrdm985a262al8qx3do"
    );
    expect(screen.getByTestId("poll-results-container")).toBeInTheDocument();
  });

  it("should redirect to PollResults once the user votes on an option", async () => {
    renderWithProvidersAndRouter(
      page,
      { store },
      "/questions/8xf0y6ziyjabvozdd253nd"
    );
    expect(screen.getByTestId("answer-poll-container")).toBeInTheDocument();

    const submitButton = screen.getByTestId("submit-choice-one-container");

    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);
    await screen.findByTestId("poll-results-container");

    expect(screen.getByTestId("poll-results-container")).toBeInTheDocument();
    expect(
      screen.queryByTestId("answer-poll-container")
    ).not.toBeInTheDocument();
  });
});
