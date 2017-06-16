import snap from 'snapsvg-cjs'

export class AsSnapValueConverter {
  fromView = (svg) => snap(svg)
}
