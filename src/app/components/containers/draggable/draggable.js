import {bindable, customElement, containerless} from 'aurelia-framework';
import './draggable.scss';

@customElement('draggable')
@containerless
export class Draggable {
  @bindable config = {
    container: ''
  }
}
