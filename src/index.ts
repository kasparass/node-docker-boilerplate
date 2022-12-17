import express from "express";
import { SERVER_PORT } from "./config/config";
import expressLoader from "./loaders/express";
import Postgres from "./loaders/postgres";

async function startServer() {
  const app = express();

  expressLoader(app);
  await Postgres.init();

  app.listen(SERVER_PORT, () =>
    console.log(`Server is listening on port ${SERVER_PORT}`)
  );
}

const gracefulShutdown = () => {
  Postgres.instance?.teardown().then(() => process.exit());
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("SIGUSR2", gracefulShutdown);

startServer();
