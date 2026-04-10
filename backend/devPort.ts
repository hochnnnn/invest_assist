import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const devApiPortFile = resolve(process.cwd(), ".api-port.json");

export function writeDevApiPort(port: number) {
  writeFileSync(devApiPortFile, JSON.stringify({ port }, null, 2), "utf8");
}

export function readDevApiPort(defaultPort = 3002) {
  const envPort = Number(process.env.API_PORT);

  if (Number.isFinite(envPort) && envPort > 0) {
    return envPort;
  }

  if (!existsSync(devApiPortFile)) {
    return defaultPort;
  }

  try {
    const raw = readFileSync(devApiPortFile, "utf8");
    const parsed = JSON.parse(raw) as { port?: unknown };
    const filePort = Number(parsed.port);

    return Number.isFinite(filePort) && filePort > 0 ? filePort : defaultPort;
  } catch {
    return defaultPort;
  }
}
