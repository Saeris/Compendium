# MtG Compendium

## Setting up

Before you start, make sure you have a working [NodeJS](http://nodejs.org/) environment,
with NPM 3. Preferably use [Yarn](https://yarnpkg.com/) instead of NPM for installation
of packages to ensure that you'll use the same dependencies as the project.

From the project folder, execute the following command:

```shell
npm install
```

Or if you are using Yarn, execute this command instead:

```shell
yarn
```

This will install all required dependencies, including a local version of Webpack that is going to
build and bundle the app. No need to install Webpack globally.

To run the app execute the following command:

```shell
npm start
```

This command starts the Webpack development server that serves the built bundles.
You can now browse the app at http://localhost:9000. Changes in the code will automatically
build and reload the app.

## Bundling

To build a development bundle (output to /build) execute:

```shell
npm run build
```

To build an optimized, minified production bundle (output to /dist) execute:

```shell
npm run build:prod
```

The production bundle includes all files required for deployment.
