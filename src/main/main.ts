import { setFailed } from "@actions/core";
import { inputs } from './context';
import { install } from "./installer";

async function run() {
    try {
        const { bin, version } = await install(inputs.version);
    } catch (error) {
        if (error instanceof Error) {
            setFailed(error.message);
        }

        setFailed('Error is not an instance of Error');
    }
}

run();