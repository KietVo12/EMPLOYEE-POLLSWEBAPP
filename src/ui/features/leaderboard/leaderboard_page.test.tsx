import LeaderboardPage from "./leaderboard_page";
import { renderWithProviders } from "../../../state/utils/test-utils";
import { setAuthedUser } from "../../../state/modules/authedUser";
import { handleInitialData } from "../../../state/modules/shared/actions";
import { AppStore, setupStore } from "../../../state/store";
import { User } from "../../../state/modules/users";
import { screen } from "@testing-library/react";
import LoadingStatus from "../../../state/types/loading_status";
let store: AppStore;

const users: Record<string, User> = {
  sarahedo: {
    id: "sarahedo",
    password: "password123",
    name: "Sarah Edo",
    avatarURL: "",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  tylermcginnis: {
    id: "tylermcginnis",
    password: "abc321",
    name: "Tyler McGinnis",
    avatarURL: "",
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
};

describe("LeaderboardPage", () => {
  beforeAll(async () => {
    store = setupStore();
    await store.dispatch(handleInitialData());
    store.dispatch(setAuthedUser("tylermcginnis"));
  });

  it("should render the component", () => {
    const { container } = renderWithProviders(<LeaderboardPage />);
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });
  it("should render the leaderboard table with users", () => {
    const { container } = renderWithProviders(<LeaderboardPage />, {
      preloadedState: {
        users: { entities: users, loading: LoadingStatus.succeeded },
      },
    });
    const leaderboardBody = screen.getByTestId("leaderboard-table-body");
    expect(leaderboardBody).toHaveTextContent(/Sarah Edo/i);
    expect(leaderboardBody).toHaveTextContent(/tylermcginnis/i);
    expect(container).toMatchSnapshot();
  });
});
