import { ComponentType } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { MarketStats } from "./MarketStats";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

type MarketCardType = {
  title: string;
  pair: string;
  percentChange: number;
  children?: React.ReactNode;
};

export const MarketCard: ComponentType<MarketCardType> = ({
  title,
  pair,
  percentChange,
  children,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Box>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography variant="h5" component="h2">
              Market: {pair}{" "}
              {percentChange && <MarketStats percentChange={percentChange} />}
            </Typography>
          </Box>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};
