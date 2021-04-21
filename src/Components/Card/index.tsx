import { ComponentType } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";

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
  displaySymbol: string;
  marketSymbol: string;
};

export const MarketCard: ComponentType<MarketCardType> = ({
  title,
  displaySymbol,
  marketSymbol,
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
              Market: {displaySymbol} {marketSymbol}
            </Typography>
          </Box>
          <Box>{children}</Box>
        </Box>
      </CardContent>
    </Card>
  );
};
