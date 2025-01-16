import { homedir } from 'os';
import { mkdirSync } from 'fs';
import { execFileSync } from 'child_process'
import { exportVariable, info } from '@actions/core';

export async function configureSSHAgent(sshPrivateKey: string) {
    const sshPath = homedir() + '/.ssh';

    mkdirSync(sshPath, { recursive: true });

    execFileSync('ssh-agent').toString().split('\n').forEach((line) => {
        const matches = /^(SSH_AUTH_SOCK|SSH_AGENT_PID)=(.*); export \1/.exec(line);

        if (matches && matches.length > 0) {
            exportVariable(matches[1], matches[2])
        }
    });

    sshPrivateKey.split(/(?=-----BEGIN)/).forEach(function(key) {
        execFileSync('ssh-add', ['-'], { input: key.trim() + "\n" });
    });

    info('SSH Agent configured');

    execFileSync('ssh-add', ['-l'], { stdio: 'inherit' });
}
