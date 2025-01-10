import { render } from "@testing-library/react";
import NotFoundPage from "./not_found_page";

describe("NotFoundPage", () => {
  it("should render the component", () => {
    const { container } = render(<NotFoundPage />);
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });
});
