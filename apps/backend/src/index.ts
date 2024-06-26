import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import { randomUUID } from "crypto";

const PORT = 8000;

const app = express();

app.get("/", (_, res) => {
  res.send("Hello world");
});
const httpServer = http.createServer(app);

const wss = new WebSocketServer({ server: httpServer });

/**
 * as in connection id and some Json stringified object
 */
const store = new Map<string, string>();

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  const ID = randomUUID();

  store.set(ID, JSON.stringify({}));

  ws.on("message", (data, isBinary) => {
    console.log("data", data.toString(), isBinary);
  });

  // ws.on("message", function message(data, isBinary) {
  //   wss.clients.forEach((client) => {
  //     if (client.readyState === WebSocket.OPEN) {
  //       client.send(JSON.stringify({ kind: message, data }), {
  //         binary: isBinary,
  //       });
  //     }
  //   });
  // });
});

httpServer.listen(PORT, () => {
  console.log(`[server]: Server is running at http::localhost:${PORT}`);
});
