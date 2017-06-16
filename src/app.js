import Store from './app/services/store'
import './sass/global.scss'

@inject(EventAggregator, Store)
export class App {
  constructor(ea, store) {
    this.log = LogManager.getLogger(`Saeris.io/${this.constructor.name}`)
    this.ea = ea
    this.store = store
    this.state = store.state
  }

  attached() {
    this.id = this.router.currentInstruction.config.name
    this.subscription = this.ea.subscribe(`router:navigation:success`, ::this.navigationSuccess)
  }

  detached() {
    this.subscription.dispose()
  }

  navigationSuccess({ instruction }) {
    this.id = instruction.config.name
  }

  configureRouter(config, router) {
    this.router = router
    config.title = `Compendium`
    config.options.pushState = true
    config.options.root = `/`
    config.map([
      { route: [``], name: `home`, moduleId: `app/routes/home/home`, nav: true, title: `Home`},
      { route: [`test`], name: `test`, moduleId: `app/routes/test/test`, nav: true, title: `Test`}
    ])
    config.mapUnknownRoutes(`app/routes/home/home`)
  }
}
