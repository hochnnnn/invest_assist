import { startApiServer } from "./server";
import { writeDevApiPort } from "./devPort";

const host = process.env.HOST ?? "127.0.0.1";
const port = Number(process.env.API_PORT ?? "0");

void startApiServer({ host, port })
  .then((app) => {
    const address = app.server.address();

    if (address && typeof address === "object") {
      writeDevApiPort(address.port);
      console.log(`API listening on http://${host}:${address.port}`);
    }
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
