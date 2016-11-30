import Snap from 'snapsvg-cjs';

export class AsSnapValueConverter {
  fromView(svg) {
    return Snap(svg);
  }
}
