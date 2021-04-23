import { ComponentType } from "react";
import { Box, Select, MenuItem, makeStyles } from "@material-ui/core";

import logo from "../../logo.svg";
import { TicketPairType } from "../../models/pairs";

type MarketSelectorType = {
  ticketPair: TicketPairType;
  markets: TicketPairType[];
  handleChange: any;
};

const useStyles = makeStyles({
  "@keyframes appLogoSpin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  appLogo: {
    maxHeight: "8vh",
    pointerEvents: "none",
    animation: "$appLogoSpin infinite 20s linear",
  },
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
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <img src={logo} className={classes.appLogo} alt="spinning logo" />
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
    </Box>
  );
};
