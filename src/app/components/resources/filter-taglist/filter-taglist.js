import './filter-taglist.scss'

@customElement(`filter-taglist`)
export class FilterTaglist {
  @bindable config = {}
  tags = {
    included: new Set,
    excluded: new Set
  }
  logic = false
  constructor() {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
  }
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
  attached() {
    $(this.list).keyup(e => {
      if (e.keyCode === 13 && $(this.list).val()) {
        if (e.shiftKey) {
          this.addTag(e)
        } else {
          this.addTag(e, true)
        }
      }
    })
    $(this.include).on(`click`, e => {
      if ($(this.list).val()) {
        this.addTag(e, true)
      }
    })
    $(this.exclude).on(`click`, e => {
      if ($(this.list).val()) {
        this.addTag(e)
      }
    })
  }

  addTag(e, list = false) {
    // Decide which list to add the tag to
    if (list || !this.config.excluded) {
      // If the tag already exists in the other list, remove it
      if ( this.tags.excluded.has($(this.list).val()) ) {
        this.tags.excluded.delete($(this.list).val())
      }
      this.tags.included.add($(this.list).val())
    } else {
      if ( this.tags.included.has($(this.list).val()) ) {
        this.tags.included.delete($(this.list).val())
      }
      this.tags.excluded.add($(this.list).val())
    }
    // Clear the input field
    $(this.list).val(``)
  }

  clearOptions(e) {
    for (let i = 0; i < this.config.options.length; i++) {
      this.config.options[i].value = false
    }
  }

  clearTags() {
    if (e.target.value === `included`) {
      this.logic = false
      this.tags.included.clear()
    } else {
      this.tags.excluded.clear()
    }
  }

  deleteTag(e) {
    let value = $(e.target).closest(`button`).val()
    if ($(e.target).closest(`div`).hasClass(`included`)) {
      this.tags.included.delete(value)
    } else {
      this.tags.excluded.delete(value)
    }
  }

  reset() {
    $(this.list).val(``)
    this.logic = false
    this.clearOptions()
    this.tags.included.clear()
    this.tags.excluded.clear()
  }
}
