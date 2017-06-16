import numeral from 'numeral'

/*
 * A value converter for Numeral.js
 *
 * To be used as a helper method to format raw numerical values, such as currencies
 */
export class NumberFormatValueConverter {
  toView = (value, format) => numeral(value).format(format)
}
