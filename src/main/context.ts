import { platform, arch } from 'os';
import { getInput } from '@actions/core';

export const osPlat: string = platform();
export const osArch: string = arch();

export const inputs = {
  version: getInput('version') || 'latest',
  sshPrivateKey: getInput('ssh-private-key'),
  sshServerHost: getInput('ssh-server-host'),
};