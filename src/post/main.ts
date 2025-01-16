import { info } from "@actions/core";
import { execSync } from "child_process";

async function run() {
  const pid = process.env.SSH_AGENT_PID;

  if (pid) {
    execSync(`kill ${pid}`);
    info('SSH Agent killed');
  }

  process.exit(0);
}

run();