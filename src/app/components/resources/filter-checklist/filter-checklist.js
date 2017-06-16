import './filter-checklist.scss'

@customElement(`filter-checklist`)
export class FilterChecklist {
  @bindable config = {}
  values = new Map()
  /*  Filter-Taglist:
   *
   *  - A datalist input that creates lists of tags
   *  - When a tag is added, it will go in either an included or excluded list
   *  - Pressing enter in the text field adds to included, shift-Enter adds to excluded
   *  - If a tag already exists in another list, adding it again will place it in the new list
   *  - Tag lists are hidden when empty
   *  - Each list can be cleared entirely, or tags can be removed individually
   *
   *  Usage:
   *
   *  From the parent view model, use Aurelia's @child decorator to get a reference
   *  to this element's view model. The 'value' of this input is the 'tags'
   *  property, and must be explicitly called to get it's current value, such as
   *  inside a form submission function.
   */
  constructor() {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
  }

  attached() {
    this.reset()
  }

  reset() {
    for (let i = 0; i < this.config.items.length; i++) {
      this.values[this.config.items[i].id] = this.config.setting
    }
  }
}
