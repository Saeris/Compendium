# MtG Compendium

## Setting up

Before you start, make sure you have a working [NodeJS](http://nodejs.org/) environment, preferably with NPM 3.

From the project folder, execute the following command:

```shell
npm install
```

This will install all required dependencies, including a local version of Webpack that is going to
build and bundle the app. There is no need to install Webpack globally.

> **Note**: In addition to running npm install, you must also make modifications to
node_modules/aurelia-templating-resources in order to support loading of .scss files!
More information can be found [here](https://github.com/aurelia/webpack-plugin/issues/14) and
an example of the required changes can be found [here](https://github.com/sickboy/templating-resources/commit/bdc0f1309109157c233ca75718abdf556dd7dfbc).
Webpack will fail to load .scss files without this change and the application will fail to
render properly. This issue may be resolved in a future update to Aurelia.

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

The production bundle includes all files that are required for deployment.
