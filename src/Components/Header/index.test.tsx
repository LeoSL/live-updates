import { render } from "@testing-library/react";
import { Header } from ".";

it("renders correctly", () => {
  const { container } = render(<Header />);
  expect(container).toMatchSnapshot();
});
