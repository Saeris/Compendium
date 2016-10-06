import {customElement, containerless, bindable} from 'aurelia-framework';

@customElement('rating')
@containerless
export class Rating {
  @bindable score;
  /*
   * When the view becomes attached to the page, use the Score bindable to set
   * the CSS properties of the star rating.
   */
  attached() {
    this.setRating(this.score);
  }
  // TODO: Replace this mess with a more maintainable implementation
  // NOTE: Aurelia uses Ref attributes to make view elements available to the view model
  setRating(score) {
    if (score < 0.5){
      this.star_1.classList.add('empty');
      this.star_2.classList.add('empty');
      this.star_3.classList.add('empty');
      this.star_4.classList.add('empty');
      this.star_5.classList.add('empty');
    } else if(score >= 0.5 && score < 1) {
      this.star_1.classList.add('half');
      this.star_2.classList.add('empty');
      this.star_3.classList.add('empty');
      this.star_4.classList.add('empty');
      this.star_5.classList.add('empty');
    } else if(score >= 1 && score < 1.5) {
      this.star_1.classList.add('full');
      this.star_2.classList.add('empty');
      this.star_3.classList.add('empty');
      this.star_4.classList.add('empty');
      this.star_5.classList.add('empty');
    } else if(score >= 1.5 && score < 2) {
      this.star_1.classList.add('full');
      this.star_2.classList.add('half');
      this.star_3.classList.add('empty');
      this.star_4.classList.add('empty');
      this.star_5.classList.add('empty');
    } else if(score >= 2 && score < 2.5) {
      this.star_1.classList.add('full');
      this.star_2.classList.add('full');
      this.star_3.classList.add('empty');
      this.star_4.classList.add('empty');
      this.star_5.classList.add('empty');
    } else if(score >= 2.5 && score < 3) {
      this.star_1.classList.add('full');
      this.star_2.classList.add('full');
      this.star_3.classList.add('half');
      this.star_4.classList.add('empty');
      this.star_5.classList.add('empty');
    } else if(score >= 3 && score < 3.5) {
      this.star_1.classList.add('full');
      this.star_2.classList.add('full');
      this.star_3.classList.add('full');
      this.star_4.classList.add('empty');
      this.star_5.classList.add('empty');
    } else if(score >= 3.5 && score < 4) {
      this.star_1.classList.add('full');
      this.star_2.classList.add('full');
      this.star_3.classList.add('full');
      this.star_4.classList.add('half');
      this.star_5.classList.add('empty');
    } else if(score >= 4 && score < 4.5) {
      this.star_1.classList.add('full');
      this.star_2.classList.add('full');
      this.star_3.classList.add('full');
      this.star_4.classList.add('full');
      this.star_5.classList.add('empty');
    } else if(score >= 4.5 && score < 5) {
      this.star_1.classList.add('full');
      this.star_2.classList.add('full');
      this.star_3.classList.add('full');
      this.star_4.classList.add('full');
      this.star_5.classList.add('half');
    } else {
      this.star_1.classList.add('full');
      this.star_2.classList.add('full');
      this.star_3.classList.add('full');
      this.star_4.classList.add('full');
      this.star_5.classList.add('full');
    }
  }
}
