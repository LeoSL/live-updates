import { ComponentType } from "react";
import { Box, Select, MenuItem, makeStyles } from "@material-ui/core";

import { TicketPairType } from "../../models/pairs";

type MarketSelectorType = {
  ticketPair: TicketPairType;
  markets: TicketPairType[];
  handleChange: any;
};

const useStyles = makeStyles({
  marketSelect: {
    color: "white",
    fontSize: "42px",
  },
});

export const MarketSelector: ComponentType<MarketSelectorType> = ({
  ticketPair,
  markets,
  handleChange,
}) => {
  const classes = useStyles();

  return (
    <Box pr={2} pt={2}>
      <Select
        value={ticketPair}
        onChange={(event) => handleChange(event.target.value)}
        className={classes.marketSelect}
      >
        {markets.map((pair) => (
          <MenuItem key={pair} value={pair}>
            {pair}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
