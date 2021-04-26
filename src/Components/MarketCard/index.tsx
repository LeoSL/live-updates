import { ComponentType } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

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
  loading: boolean;
  percentChange?: number;
  children?: React.ReactNode;
};

export const MarketCard: ComponentType<MarketCardType> = ({
  title,
  pair,
  loading,
  percentChange,
  children,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        {loading ? (
          <Box>
            <Skeleton animation="wave" />
            <Skeleton variant="rect" width="100%" height={620} />
          </Box>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};
