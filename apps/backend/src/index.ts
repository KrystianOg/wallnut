import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import { randomUUID } from "crypto";

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

  ws.on("open", () => {
    console.log(store);
  });

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ kind: message, data }), {
          binary: isBinary,
        });
      }
    });
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(
    `[server]: Server is running at http::localhost:${process.env.PORT}`,
  );
});
