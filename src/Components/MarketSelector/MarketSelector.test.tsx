import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TicketPairType } from "../../models/pairs";
import { MarketSelector } from ".";

it("renders MarketSelector component properly", () => {
  const ticketPair: TicketPairType = "BTC-USD";
  const markets: TicketPairType[] = ["BTC-USD", "BTC-CAD"];

  const props = {
    ticketPair,
    markets,
    handleChange: () => "click",
  };

  render(<MarketSelector {...props} />);

  const linkElementPair = screen.getByText(ticketPair);

  userEvent.click(screen.getByRole("button"));

  const linkElementMarkets = screen.getByText(markets[1]);

  expect(linkElementPair).toBeInTheDocument();
  expect(linkElementMarkets).toBeInTheDocument();
});
