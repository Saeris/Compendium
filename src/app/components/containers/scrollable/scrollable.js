import {bindable, customElement, containerless, inject} from 'aurelia-framework';
import Utilities from '../../../services/utilities';

@customElement('scrollable')
@inject(Utilities)
export class Scrollable {
  trackWidth          = 10;
  scrollDirection     = 'vert';
  scrollOffsetAttr    = 'scrollTop';
  sizeAttr            = 'height';
  scrollSizeAttr      = 'scrollHeight';
  offsetAttr          = 'top';

  // NOTE: https://github.com/Grsmto/simplebar/blob/master/src/simplebar.js#L42
  // TODO: Add custom configuration options
  constructor(utilities, config) {
    // Import Utilities service to get browser scrollbar width
    this.utilities = utilities;
  }

  attached() {
    // TODO: Add code to handle horizontal scrolling
    // Add negative margin to the container to hide the browser's default scrollbar
    $(this.container).css({'margin-right': ((this.utilities.scrollbarWidth + this.trackWidth) * -1)});
    // Set event listeners
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
    // Prevent default to keep from highlighting text by click-dragging
    e.preventDefault();
    let eventOffset = this.scrollDirection === 'horiz' ? e.pageX : e.pageY;
    this.dragOffset = eventOffset - $(this.scrollbar).offset()[this.offsetAttr];
    // Use jQuery's proxy method to prevent duplicate events from firing
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
    // Clear event listeners when the user stops click-dragging
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
    // If the content is larger than the container, show the custom scrollbars
    if (scrollbarSize < contentSize) {
      $(this.scrollbar).addClass('visible');
    }
  }
}
