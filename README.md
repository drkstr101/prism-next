# prism-next

Realtime chat demo with NextJs and Express.

## Get Started

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/drkstr101/prism-next)

Run `docker compose up --detach && yarn start` to launch all applications and services in development mode. Run `yarn build` to prepare a production release. Any build artifacts will be stored in the `dist/` directory, ready to be deployed.

Other top-level tasks include: `format`, `lint`, `test`, and `e2e`. Running the `e2e` task may require some [additional system requirements](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements) unless using the provided GitPod environment.

### Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `yarn nx list` to get a list of available plugins and whether they have generators. Then run `yarn nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

### Running tasks

To execute tasks with Nx use the following syntax:

```shell
yarn nx <target> <project> <...options>
```

You can also run multiple targets:

```shell
yarn nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```shell
yarn nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

### Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.
