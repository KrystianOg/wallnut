import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const PORT = 8000;

const app = express();

app.get("/", (_, res) => {
  res.send("Hello world");
});
const httpServer = http.createServer(app);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    console.log("received: %s", data);
    console.log("clients", wss.clients);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ kind: message, data }), {
          binary: isBinary,
        });
      }
    });
  });

  let i = 0;

  setInterval(() => {
    ws.send(i++);
  }, 1000);
});

httpServer.listen(PORT, () => {
  console.log(`[server]: Server is running at http::localhost:${PORT}`);
});
