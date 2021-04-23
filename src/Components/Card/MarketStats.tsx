import { ComponentType } from "react";
import { makeStyles } from "@material-ui/core";

type StyleProps = {
  marketPositive: string;
};

const useStyles = makeStyles({
  percentColor: {
    color: (props: StyleProps) => props.marketPositive,
  },
});

const pickColor = (percentChange: number): string => {
  if (percentChange === 0) return "gray";
  if (percentChange > 0) return "green";
  return "red";
};

export const MarketStats: ComponentType<{ percentChange: number }> = ({
  percentChange,
}) => {
  const classes = useStyles({ marketPositive: pickColor(percentChange) });

  return percentChange === 0 ? (
    <span className={classes.percentColor}>{percentChange.toFixed(2)}%</span>
  ) : (
    <span className={classes.percentColor}>
      {percentChange > 0
        ? `📈 +${percentChange.toFixed(2)}%`
        : `📉 ${percentChange.toFixed(2)}%`}
    </span>
  );
};
