import * as React from 'react';
import * as d3 from 'd3';

export interface IStatsProps {}

export default class Stats extends React.Component<IStatsProps> {
  public render(): JSX.Element {
    return <div id="chart-test"></div>;
  }
  componentDidMount(): void {
    this.drawChart();
  }
  drawChart(): void {
    const data = [12, 5, 6, 6, 9, 10];

    const svg = d3
      .select('#chart-test')
      .append('svg')
      .attr('width', 700)
      .attr('height', 300);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => 300 - 10 * d)
      .attr('width', 25)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'green');
  }
}
