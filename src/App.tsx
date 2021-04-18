import { Box, Divider, makeStyles } from "@material-ui/core";

import logo from "./logo.svg";
import { MarketChart } from "./Components/MarketChart";
import { MarketDataHttp, MarketDataWebSocket } from "./Components/MarketData";

const useStyles = makeStyles({
  "@keyframes appLogoSpin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  app: {
    backgroundColor: "#282c34",
  },
  appLogo: {
    height: "10vmin",
    pointerEvents: "none",
    animation: "$appLogoSpin infinite 20s linear",
  },
  appHeader: {
    minHeight: "10vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.app}>
      <header className={classes.appHeader}>
        <img src={logo} className={classes.appLogo} alt="spinning logo" />
      </header>
      <MarketChart ticketPair={"BTCCAD"} />
      <Divider />
      <MarketDataHttp baseTicker="BTC" quoteTicker="CAD" />
      <MarketDataWebSocket />
    </Box>
  );
};

export default App;
