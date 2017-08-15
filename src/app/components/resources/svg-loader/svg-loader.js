import "./svg-loader.scss"

@customElement(`svg-loader`)
@containerless
export class SVGLoader {
  @bindable src = ``

  loadSVG(url) {
    /*
    *  Snap.svg's load function is asynchronous, but doesn't use promises.
    *  So to make things work, wrap the load function in a promise, then use
    *  the Async/Await feature of ES7 to continue working synchronously.
    */
    return new Promise((resolve, reject) => {
      Snap.load(url, (loadedFragment) => resolve(loadedFragment))
    })
  }

  async attached() {
    let svg = this.svg
    if (this.src) {
      let fragment = await this.loadSVG(this.src)
      let contents = fragment.select(`svg`)
      let attributes = {
        preserveAspectRatio: `xMidYMid meet`
      }
      for (let i = 0; i < contents.node.attributes.length; i++) {
        attributes[contents.node.attributes[i].name] = contents.node.attributes[i].value
      }
      for (let i = 0; i < contents.node.children.length; i++) {
        svg.append(contents.node.children[i])
      }
      svg.attr(attributes)
    }
  }
}
