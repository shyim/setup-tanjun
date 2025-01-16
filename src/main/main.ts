import { addPath, setFailed } from "@actions/core";
import { inputs } from './context';
import { install } from "./installer";
import { dirname } from 'path';
import { configureSSHAgent, configureSSHHosts } from "./ssh";

async function run() {
    try {
        const { bin, version } = await install(inputs.version);

        const releaser = dirname(bin);
        addPath(releaser);

        if (inputs.sshPrivateKey) {
            await configureSSHAgent(inputs.sshPrivateKey);
        }

        if (inputs.sshServerHost) {
            await configureSSHHosts(inputs.sshServerHost);
        }
    } catch (error) {
        if (error instanceof Error) {
            setFailed(error.message);
        }

        setFailed('Error is not an instance of Error');
    }
}

run();
