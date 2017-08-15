import './draggable.scss'

@customElement(`draggable`)
@containerless
export class Draggable {
  @bindable config = {
    container: ``
  }
  constructor() {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
  }
}
