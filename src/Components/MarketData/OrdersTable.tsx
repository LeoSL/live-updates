import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
} from "@material-ui/core";

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

const mapOrdersByType = (type: any, orders: any) =>
  orders.map((o: any) => ({ ...o, type }));

const shuffleArr = (arr: any) => {
  const newArr = [];
  const randomRecord: number[] = [];

  for (let index = 0; index < arr.length; index++) {
    const randomInt = Math.floor(Math.random() * arr.length);
    if (!randomRecord.includes(randomInt)) {
      randomRecord.push(randomInt);
      newArr.push(arr[randomInt]);
    } else {
      index--;
    }
  }

  return newArr;
};

export const OrdersTable = ({ orderbook }: any) => {
  const classes = useStyles();
  const { asks, bids } = orderbook;

  const orders = mapOrdersByType("asks", asks).concat(
    mapOrdersByType("bids", bids)
  );

  return (
    <Table cellPadding={0} className={classes.root}>
      <TableBody>
        {shuffleArr(orders).map((props: any) => (
          <MarketDataRow key={Math.random()} {...props} />
        ))}
      </TableBody>
    </Table>
  );
};
