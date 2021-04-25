import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ComponentType } from "react";
import { Orderbook } from ".";

import { addOrdersType, evenSmarterShuffledArray } from "../../lib/utils";

const RED = "#e5210e15";
const RED_TEXT = "#e5210e";
const GREEN = "#00923915";
const GREEN_TEXT = "#009239";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
  },
  priceCell: {
    "& p:hover": {
      fontWeight: "bold",
      cursor: "pointer",
    },
  },
});

type MarketDataRowProps = {
  type: string;
  price: string;
};

const MarketDataRow: ComponentType<MarketDataRowProps> = ({ type, price }) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell
        key={price}
        style={{
          width: "33vw",
          padding: "3px 10px",
          color: `${type === "asks" ? GREEN_TEXT : RED_TEXT}`,
          backgroundColor: `${type === "asks" ? GREEN : RED}`,
        }}
        align={type === "asks" ? "right" : "left"}
      >
        <div className={classes.priceCell}>
          <Typography>{price}</Typography>
        </div>
      </TableCell>
    </TableRow>
  );
};

export const OrdersTable: ComponentType<Orderbook> = ({ asks, bids }) => {
  const classes = useStyles();
  const orders = addOrdersType("asks", asks).concat(
    addOrdersType("bids", bids)
  );

  return (
    <Table cellPadding={0} className={classes.root}>
      <TableBody>
        {evenSmarterShuffledArray(orders).map((props: any) => (
          <MarketDataRow key={Math.random()} {...props} />
        ))}
      </TableBody>
    </Table>
  );
};
