import { ComponentType } from "react";
import { Box, Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { OrdersTable } from "./OrdersTable";
import { Orderbook } from "../../models/pairs";

type AggregatedDataProps = {
  average: string;
  close: string;
  high: string;
  low: string;
  orderbook: Orderbook;
};

export const AggregatedData: ComponentType<AggregatedDataProps> = ({
  average,
  close,
  high,
  low,
  orderbook,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Average:</strong> {average}
            </TableCell>
            <TableCell>
              <strong>Close:</strong> {close}
            </TableCell>
            <TableCell>
              <strong>High:</strong> {high}
            </TableCell>
            <TableCell>
              <strong>Low:</strong> {low}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box>
        <OrdersTable {...orderbook} />
      </Box>
    </Box>
  );
};
