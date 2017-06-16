export default class Utilities {
  scrollbarWidth = 0

  getScrollbarWidth(el) {
    let container = $(el)
    container.append(`<div id="test"></div>`)
    let scrollDiv = container.find(`#test`)
    scrollDiv.css({
      'width': `100px`,
      'height': `100px`,
      'overflow': `scroll`,
      'position': `absolute`,
      'top': `-9999px`
    })
    this.scrollbarWidth = scrollDiv[0].offsetWidth - scrollDiv[0].clientWidth
    container.remove()
  }
}
