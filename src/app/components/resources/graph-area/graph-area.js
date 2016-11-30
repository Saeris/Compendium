import {customElement, containerless, bindable} from 'aurelia-framework';
import Highcharts from 'highcharts';
import './graph-area.scss';

@customElement('graph-area')
@containerless
export class GraphArea {
  @bindable config = {
    title: 'Revenue Influenced',
    summary: '$40,000',
    series: [
      { name: '4-Tell', data: [10000, 12500, 9000, 7850, 15750, 14325, 22175] },
      { name: 'Not 4-Tell', data: [2500, 8750, 3800, 5525, 12250, 13750, 16450] }
    ]
  };
  constructor() {
  }
  attached() {
    this.chart = Highcharts.chart(this.canvas, {
      title:    { text: '', style: { display: 'none' } },
      subtitle: { text: '', style: { display: 'none' } },
      legend:   { enabled: false },
      xAxis:    { visible: false },
      yAxis:    { visible: false },
      credits:  { enabled: false },
      tooltip:  { enabled: false },
      chart:    {
        type: 'line',
        margin: [0, 0, 0, 0],
        spacing: [10, 0, 0, 0]
      },
      series: this.config.series,
      plotOptions: {
        line: {
          marker: { enabled: false }
        },
        series: {
         states: {
           hover: { enabled: false }
         }
       }
      }
    });
  }

  toggleVisibility(e, i) {
    let series = this.chart.series[i];
    if (series.visible) {
      series.hide();
    } else {
      series.show();
    }
  }
}
