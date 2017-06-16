import './app-header.scss'

@customElement(`app-header`)
@containerless
export class AppHeader {
  @bindable router;
  constructor() {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
  }
}
