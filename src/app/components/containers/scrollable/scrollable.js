import {bindable, customElement, containerless, inject} from 'aurelia-framework';
import Utilities from '../../../services/utilities';

@inject(Utilities)
@customElement('scrollable')
export class Scrollable {
  scrollDirection     = 'vert';
  scrollOffsetAttr    = 'scrollTop';
  sizeAttr            = 'height';
  scrollSizeAttr      = 'scrollHeight';
  offsetAttr          = 'top';

  // NOTE: https://github.com/Grsmto/simplebar/blob/master/src/simplebar.js#L42
  // TODO: Add custom configuration options
  constructor(utilities, config) {
    this.utilities = utilities;
  }

  attached() {
    $(this.container).css({'margin-right': ((this.utilities.scrollbarWidth + 10) * -1)});
    $(this.scrollbar).on('mousedown', e => {
      this.startDrag(e);
    });
    $(this.container).on('scroll', e => {
      this.startScroll(e);
    });
    $(this.container).on('mouseenter', e => {
      this.resizeScrollbar();
      this.setVisibility();
    });
  }

  startScroll(e) {
    $(this.scrollbar).trigger(e);

    this.resizeScrollbar();
  }

  startDrag(e) {
    e.preventDefault();
    let eventOffset = this.scrollDirection === 'horiz' ? e.pageX : e.pageY;
    this.dragOffset = eventOffset - $(this.scrollbar).offset()[this.offsetAttr];
    $(document).on('mousemove', $.proxy(this.drag, this));
    $(document).on('mouseup', $.proxy(this.endDrag, this));
  }

  drag(e) {
    e.preventDefault();
    // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
    let eventOffset = this.scrollDirection === 'horiz' ? e.pageX : e.pageY,
        dragPos     = null,
        dragPerc    = null,
        scrollPos   = null;
    dragPos = eventOffset - $(this.track).offset()[this.offsetAttr] - this.dragOffset;
    // Convert the mouse position into a percentage of the scrollbar height/width.
    dragPerc = dragPos / $(this.track)[this.sizeAttr]();
    // Scroll the content by the same percentage.
    scrollPos = dragPerc * $(this.container)[0][this.scrollSizeAttr];

    $(this.container)[this.scrollOffsetAttr](scrollPos);
  }

  endDrag(e) {
    $(document).off('mousemove', this.drag);
    $(document).off('mouseup', this.endDrag);
  }

  resizeScrollbar() {
    if(this.utilities.scrollbarWidth === 0) {
      return;
    }

    let contentSize     = $(this.contents)[0][this.scrollSizeAttr],
        scrollOffset    = $(this.container)[this.scrollOffsetAttr](),
        scrollbarSize   = $(this.track)[this.sizeAttr](),
        scrollbarRatio  = scrollbarSize / contentSize,
        handleOffset    = Math.round(scrollbarRatio * scrollOffset) + 2,
        handleSize      = Math.floor(scrollbarRatio * (scrollbarSize - 2)) - 2;
    if (this.scrollDirection === 'vert'){
      $(this.scrollbar).css({'top': `${handleOffset}px`, 'height': `${handleSize}px`});
    } else {
      $(this.scrollbar).css({'left': `${handleOffset}px`, 'width': `${handleSize}px`});
    }
  }

  setVisibility() {
    let contentSize   = $(this.contents)[0][this.scrollSizeAttr],
        scrollbarSize = $(this.track)[this.sizeAttr]();
    if (scrollbarSize < contentSize) {
      $(this.scrollbar).addClass('visible');
    }
  }
}
