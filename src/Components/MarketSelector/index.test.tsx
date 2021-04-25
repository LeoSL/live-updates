import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TicketPairType } from "../../models/pairs";
import { MarketSelector } from ".";

describe("MarketSelector component", () => {
  const ticketPair: TicketPairType = "BTC-USD";
  const markets: TicketPairType[] = ["BTC-USD", "BTC-CAD"];

  const props = {
    ticketPair,
    markets,
    handleChange: () => "click",
  };

  it("renders properly", () => {
    const { container } = render(<MarketSelector {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("renders the select options properly", () => {
    render(<MarketSelector {...props} />);

    const linkElementPair = screen.getByText(ticketPair);

    // Click to open the selector dropdown
    userEvent.click(screen.getByRole("button"));

    const linkElementMarkets = screen.getByText(markets[1]);

    // Check if the initial BTC-USD option is visible
    expect(linkElementPair).toBeInTheDocument();

    // Check if the BTC-CAD option is visible
    expect(linkElementMarkets).toBeInTheDocument();
  });
});
