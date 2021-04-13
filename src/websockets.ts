import WebSocket from "ws";

const baseUrl = "wss://socket.btcmarkets.net/v2";
const channels = ["trade", "heartbeat"];
const marketIds = ["BTC-CAD", "ETH-CAD", "LTC-CAD"];

function run() {
  const ws = new WebSocket(baseUrl);

  let request = {
    marketIds: marketIds,
    channels: channels,
    messageType: "subscribe",
  };

  ws.on("open", function open() {
    ws.send(JSON.stringify(request));
  });

  ws.on("message", function incoming(data: any) {
    console.log(data);
  });

  ws.on("close", function close() {
    console.log("socket closed");
  });

  ws.on("error", function error(err: any) {
    console.error("error with websocket ", err);
  });
}
export default run;
