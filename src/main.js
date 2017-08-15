// we want font-awesome to load as soon as possible to show the fa-spinner
import "font-awesome/css/font-awesome.css"
import * as Bluebird from "bluebird"
import "whatwg-fetch"
import * as OfflinePluginRuntime from "offline-plugin/runtime"

Bluebird.config({ warnings: false })

LogManager.setLevel(window.location.hostname.match(`localhost`) ? LogManager.logLevel.debug : LogManager.logLevel.error)

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    // See documentation on organizing global resources and app features
    // http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/app-configuration-and-startup/6
    .feature(`app/components/core`)
    .feature(`app/components/resources`)
    .feature(`app/components/cards`)
    .feature(`app/components/containers`)
    .feature(`app/converters`)

  await aurelia.start()
  aurelia.setRoot(`app`)

  OfflinePluginRuntime.install()
}
