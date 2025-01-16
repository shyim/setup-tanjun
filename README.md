# Setup Tanjun

A GitHub Action to set up [Tanjun](https://tanjun.sh), a CLI tool to deploy and manage your applications.

## Usage

```yaml
- uses: shyim/setup-tanjun@v1
```

## Inputs

| Name              | Required | Default | Description                                        |
|-------------------|----------|---------|----------------------------------------------------|
| `version`         | false    | latest  | Specific Tanjun version to install                |
| `ssh-private-key` | false    |         | SSH Private Key to configure to use as SSH-Agent  |
| `ssh-server-host` | false    |         | Server Host for Keyscan                          |
| `tools`           | false    |         | Additional tools to install together with Tanjun  |


Right now only `1password` is supported as a tool to allow to fetch 1Password secrets in CI/CD.

## Example workflow

```yaml
name: My Workflow
on: [push]

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: shyim/setup-tanjun@v1
              with:
                    ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
                    ssh-server-host: ${{ secrets.SSH_SERVER_HOST }}
            - run: tanjun deploy
```

## License

MIT License - see [LICENSE](LICENSE) for details.
