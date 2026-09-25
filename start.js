// Optional Node.js launcher wrapper for cross-platform support and graceful shutdown
import { spawn } from "node:child_process";

const port = process.env.PORT || "20128";
console.log(`[OmniRoute Runner] Starting OmniRoute on port ${port}...`);

const child = spawn(
  "npx",
  ["-y", "omniroute", "serve", "--port", port, "--no-open"],
  {
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      PORT: port,
      OMNIROUTE_PORT: port,
    },
  }
);

const forwardSignal = (signal) => {
  if (child && !child.killed) {
    child.kill(signal);
  }
};

process.on("SIGINT", () => forwardSignal("SIGINT"));
process.on("SIGTERM", () => forwardSignal("SIGTERM"));

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
