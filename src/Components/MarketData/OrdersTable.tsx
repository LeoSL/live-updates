import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
} from "@material-ui/core";

import { addOrdersType, evenSmarterShuffledArray } from "../../lib/utils";

const RED = "#e5210e15";
const GREEN = "#00923915";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
  },
});

const MarketDataRow = ({ type, price }: any) => {
  return (
    <TableRow>
      <TableCell
        key={price}
        style={{
          width: "33vw",
          padding: "3px 0px",
          backgroundColor: `${type === "asks" ? GREEN : RED}`,
        }}
        align={type === "asks" ? "right" : "left"}
      >
        {price}
      </TableCell>
    </TableRow>
  );
};

export const OrdersTable = ({ orderbook }: any) => {
  const classes = useStyles();
  const { asks, bids } = orderbook;

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
