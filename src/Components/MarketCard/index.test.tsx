import { render, screen } from "@testing-library/react";
import { MarketCard } from ".";

it("renders Card component properly", () => {
  const props = {
    title: "Card",
    pair: "BTC-CAD",
    loading: false,
    percentChange: 1.23,
  };

  render(<MarketCard {...props} />);

  const linkElementTitle = screen.getByText(/Card/i);
  const linkElementPair = screen.getByText(/BTC-CAD/i);
  expect(linkElementTitle).toBeInTheDocument();
  expect(linkElementPair).toBeInTheDocument();
});
