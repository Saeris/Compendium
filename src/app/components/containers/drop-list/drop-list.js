import "./drop-list.scss"

@customElement(`drop-list`)
@containerless
export class DropList {
  @bindable
  config = {
    id: ``,
    direction: false
  }
}
