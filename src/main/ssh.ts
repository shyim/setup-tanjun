import { homedir } from 'os';
import { appendFileSync, mkdirSync } from 'fs';
import { execFileSync, execSync } from 'child_process'
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

export async function configureSSHHosts(hosts: string) {
    const sshPath = homedir() + '/.ssh';

    mkdirSync(sshPath, { recursive: true });

    hosts.split('\n').forEach(function(host) {
        const trimmedHost = host.trim();
        if (!trimmedHost) {
            return;
        }

        try {
            const keyscanOutput = execSync(
                `ssh-keyscan -H -t rsa,ecdsa,ed25519 ${trimmedHost}`, 
                { encoding: 'utf-8' }
            ); 
    
            if (keyscanOutput) {
                appendFileSync(sshPath + '/known_hosts', keyscanOutput);
            }
        } catch (error) {
            console.error(`Failed to get keys for ${trimmedHost}: ${error}`);
        }
    });
}