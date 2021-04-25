import { ComponentType } from "react";
import { Box, makeStyles } from "@material-ui/core";

import logo from "../../assets/logo.svg";

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
});

type HeaderProps = {
  children?: React.ReactNode;
};

export const Header: ComponentType<HeaderProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <img src={logo} className={classes.appLogo} alt="spinning logo" />
      {children}
    </Box>
  );
};
