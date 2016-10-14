// we want font-awesome to load as soon as possible to show the fa-spinner
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });
import 'whatwg-fetch';

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    // See documentation on organizing global resources and app features
    // http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/app-configuration-and-startup/6
    .feature('app/components/core')
    .feature('app/components/resources')
    .feature('app/components/cards')
    .feature('app/components/containers')
    .feature('app/converters');

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

  await aurelia.start();
  aurelia.setRoot('app');

  // if you would like your website to work offline (Service Worker),
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}
