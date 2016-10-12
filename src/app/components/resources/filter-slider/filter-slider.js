import {customElement, bindable} from 'aurelia-framework';

@customElement('filter-slider')
export class FilterSlider {
  @bindable config = {
    name: 'Converted Mana Cost',
    steps: [
      {title: '0 to 1', content: '<i class="ms ms-0 ms-cost ms-fw"></i><em>-</em><i class="ms ms-1 ms-cost ms-fw"></i>'},
      {title: '2 to 3', content: '<i class="ms ms-2 ms-cost ms-fw"></i><em>-</em><i class="ms ms-3 ms-cost ms-fw"></i>'},
      {title: '4 to 5', content: '<i class="ms ms-4 ms-cost ms-fw"></i><em>-</em><i class="ms ms-5 ms-cost ms-fw"></i>'},
      {title: '6 or More', content: '<i class="ms ms-6 ms-cost ms-fw"></i><em>-</em><i class="ms ms-x ms-cost ms-fw"></i>'}
    ],
    selected: false
  };
  selected = [];
  currentSelection = [];
  /*  Filter-Slider:
   *
   *  - A Range slider with two handles, divided into steps
   *  - Each step is a button, when clicked sets the range to include that value
   *  - Shift-Clicking the buttons adds the value to the range selection
   *  - Dragged handles 'snap' to the nearest value
   *
   *  Usage:
   *
   *  From the parent view model, use Aurelia's @child decorator to get a reference
   *  to this element's view model. The 'value' of this input is the 'selected'
   *  property, and must be explicitly called to get it's current value, such as
   *  inside a form submission function.
   *
   *  TODO: Research how to expose 'selected' as an element attribute following
   *  the behavior of <input value="">
   *
   *  Notes:
   *
   *  Steps
   *  0    1    2    3
   *  |btn1|btn2|btn3|
   *  0%  33%  66%  100%
   *  Button Position
   *
   *  Steps
   *  0    1    2    3    4
   *  |btn1|btn2|btn3|btn4|
   *  0%  25%  50%  75%  100%
   *  Button Position
   *
   */
  attached() {
    this.resetSlider();
    this.generateSteps();
    let handles = $(this.selection).find('.handle');
    $(this.selection).on('mousedown', e => {
      e.stopPropagation();
      if(e.target.nodeName === 'BUTTON') {
        this.startDrag(e);
      }
    });
    $(this.steps).on('click', e => {
      e.stopPropagation();
      this.setPosition(e);
    });
    $(this.reset).on('click', e => {
      this.resetSlider();
    });
  }

  setPosition(e) {
    let value     = Number($(e.target).closest('button')[0].value),
        minValue  = null,
        maxValue  = null;
    // If shift key was pressed, add to current selection, else set current selection
    if(e.shiftKey) {
      /*  Pushing the value to currenSelection allows for setting min and max values
       *  regardless of how many values are in between and location of existing values
       */
      this.currentSelection.push(value);
      minValue = Math.min(...this.currentSelection);
      maxValue = Math.max(...this.currentSelection) + 1;
    } else {
      minValue = value;
      maxValue = value + 1;
    }
    /*  Get the value of the button that was clicked, convert it to a number from
     *  a string, divide it by the number of steps to get a percentage. Use that
     *  number to get a pixel value from the container width.
     *  NOTE: Use jQuery's closest() method to solve for events thrown by children
     *  of the button element.
     */
    let min   = ($(this.meter).width() / this.config.steps.length) * minValue;
    let max   = ((maxValue / this.config.steps.length) * $(this.meter).width()) - min;
    $(this.selection).css({'left': min});
    $(this.selection).width(max);
    // Clear existing classes, then add selected class to the button(s)
    this.currentSelection = this.getSelection();
    this.updateClasses();
    this.updateSelection(this.currentSelection);
  }

  getSelection() {
    let min = this.getClosest(parseInt($(this.selection).css('left')));
    let max = this.getClosest($(this.selection).width());
    /*  First determine the distance between two steps
     *  Then determine where the range starts and where it ends
     *  Reset the current selection, then use the start and end values to create
     *  a new selection array
     */
    let distance  = $(this.meter).width() / this.config.steps.length;
    let start     = min / distance,
        end       = (max + min) / distance,
        selection = [];
    for (let i = start; i < end; i++) {
      selection.push(i);
    }
    return selection;
  }

  updateSelection(selections = []) {
    // Clear selection first
    for (let i = 0; i < this.config.steps.length; i++) {
      this.selected[i] = false;
    }
    // Set new values
    for (let i = 0; i < selections.length; i++) {
      this.selected[selections[i]] = true;
    }
  }

  updateClasses() {
    let buttons = $(this.steps).find('button');
    // Clear all buttons first
    buttons.each((index, button) => {
      $(button).removeClass('selected');
    });
    // Then add selected class to the array of given elements
    for (let i = 0; i < this.currentSelection.length; i++) {
      $(buttons[this.currentSelection[i]]).addClass('selected');
    }
  }

  resetSlider() {
    // Move handles back to default positions
    $(this.selection).css({'left': 0});
    $(this.selection).width(this.config.selected ? $(this.meter).width() : 0);
    // Reset selection arrays
    this.currentSelection = this.getSelection();
    this.updateSelection(this.currentSelection);
    // Remove classes from buttons
    this.updateClasses();
  }

  startDrag(e) {
    // Prevent default to keep from highlighting text by click-dragging
    e.preventDefault();
    this.dragHandle = $(e.target).closest('button')[0].value;
    $(e.target).closest('button').addClass('active');
    // Use jQuery's proxy method to prevent duplicate events from firing
    $(document).on('mousemove', $.proxy(this.drag, this));
    $(document).on('mouseup', $.proxy(this.endDrag, this));
  }

  drag(e) {
    e.preventDefault();
    /*  Get handle that is being manipulated by comparing event target to references
     *  Calculate drag distance as a percentage of the meter width
     *  If new position is not greater or less than the position of the other handle, move handle
     */
    let dragPerc      = this.clamp((e.pageX - $(this.meter).offset()['left']) / $(this.meter).width());
    let width         = ($(this.meter).width() * dragPerc) - parseInt($(this.selection).css('left'));
    let left          = ($(this.meter).width() * dragPerc);
    let currentWidth  = $(this.selection).width() + parseInt($(this.selection).css('left'));

    if(Number(this.dragHandle)){
      // Prevent the Max handle from moving behind the Min handle
      if(width != parseInt($(this.selection).css('left')) ) {
        $(this.selection).width(width);
      }
    } else {
      /*  Prevent the Min handle from moving if the distance between both handles
       *  is less than the width of one step
       */
      if(($(this.meter).width() / this.config.steps.length) <= $(this.selection).width()) {
        $(this.selection).css({'left': left});
        $(this.selection).width(currentWidth - left);
      }
    }
  }

  endDrag(e) {
    // Convert current handle positions to the nearest step
    let min = this.getClosest(parseInt($(this.selection).css('left')));
    let max = this.getClosest($(this.selection).width());
    // Snap handles into position
    if(Number(this.dragHandle)){
      $(this.selection).width(max);
    } else {
      $(this.selection).css({'left': min, 'width': max});
    }
    // Update classes and selection
    this.currentSelection = this.getSelection();
    $(e.target).closest('button').removeClass('active');
    this.updateClasses();
    this.updateSelection(this.currentSelection);
    // Unsubscribe from mouse events
    $(document).off('mousemove', this.drag);
    $(document).off('mouseup', this.endDrag);
  }

  clamp(value) {
    return Math.max(0, Math.min(value, 1));
  };

  generateSteps() {
    /*  Generates a list of step positions from the current width of the container
     *  divided by the number of steps passed in the config plus one (because
     *  arrays start at 0). Should be run as needed to account for responsiveness.
     */
    let stepPositions = [];
    for (let i = 0; i < this.config.steps.length + 1; i++) {
      let position = ($(this.meter).width() / this.config.steps.length) * i;
      stepPositions.push(position);
    }
    return stepPositions;
  }

  getClosest(position, stepPositions = this.generateSteps()) {
    /*  Compares the given position to a list of step positions and determines
     *  which the given number is closest to
     */
    return stepPositions.reduce((prev, curr) => Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev);
  }
}
