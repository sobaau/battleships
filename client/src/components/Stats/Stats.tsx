import * as React from 'react';
import * as d3 from 'd3';

export interface IStatsProps {}
interface stats {
  ActiveUsers: number;
  Hits: number;
  Misses: number;
}
/**
 * Stats drop down box with stats regarding to the games ActiveUsers, Hits and Misses.
 *
 *
 * @class Stats
 * @extends {React.Component<any, any>}
 */

export default class Stats extends React.Component<IStatsProps> {
  stats: stats = {
    ActiveUsers: 0,
    Hits: 0,
    Misses: 0,
  };
  public render(): JSX.Element {
    return <div id="chart-test" className="chart-test"></div>;
  }
  componentDidMount(): void {
    this.getStats();
  }
  getStats = async (): Promise<any> => {
    const response = await fetch('http://localhost:5005/api/stats');
    const json = await response.json();
    this.stats = json;
    console.log(this.stats);
    this.drawChart();
  };

  xLocation = (d: any, i: any, width: number, data: number): number => {
    return i * (width / data) + width / data / 2;
  };

  /**
   * Draws stats provided by the server
   *
   * @memberof Stats
   */
  drawChart(): void {
    const data = [];
    data.push({ name: 'Users', stats: this.stats.ActiveUsers });
    data.push({ name: 'Hits', stats: this.stats.Hits });
    data.push({ name: 'Misses', stats: this.stats.Misses });
    const width = 300;
    const height = 100;
    const svg = d3
      .select('#chart-test')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    /** Start drawing the barchart using d3 */
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => {
        return i * (width / data.length);
      })
      .attr('y', d => {
        return height - d.stats * 4;
      })
      .attr('width', width / data.length - 1)
      .attr('height', d => {
        return d.stats * 4;
      })
      .attr('fill', d => {
        return `rgb(10, 0, ${d.stats * 10})`;
      });
    const labels = svg
      .selectAll('text')
      .data(data)
      .enter();

    /** Labels for the bar graph, Sits on top/close to the top of the bar graph */
    labels
      .append('text')
      .text(stats => {
        return stats.stats;
      })
      .attr('text-anchor', 'middle')
      .attr('x', (stats, i) => this.xLocation(stats, i, width, data.length))
      .attr('y', stats => {
        return height - stats.stats * 4 + 14;
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'white');
    labels
      .append('text')
      .text(stats => {
        return stats.name;
      })
      .attr('text-anchor', 'middle')
      .attr('x', (stats, i) => this.xLocation(stats, i, width, data.length))

      .attr('y', stats => {
        return height - 16 - stats.stats * 4 + 14;
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'white');
  }
}
