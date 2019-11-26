import React, { Component } from "react";
import { Line, Pie } from "react-chartjs-2";

const colors = ["#78ce90", "#b977ce", "#fac76e", "#de4d4d"];
const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: colors,
      borderColor: "rgba(75,192,192,1)",
      // borderCapStyle: "butt",
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: "miter",
      // pointBorderColor: "rgba(75,192,192,1)",
      // pointBackgroundColor: "#fff",
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: "rgba(75,192,192,1)",
      // pointHoverBorderColor: "rgba(220,220,220,1)",
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      data: [78, 51, 95, 40, 5, 55, 20],
      fill: false
    }
  ]
};

const getOptions = (showLabelX, showLabelY) => {
  return {
    legend: {
      display: true,
      position: "right"
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true
          },
          ticks: {
            display: showLabelX ? true : false,
            minRotation: 0
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true
          },
          ticks: {
            display: showLabelY ? true : false,
            minRotation: 90
          }
        }
      ]
    }
  };
};

export default class Chart extends Component {
  state = { showLabelX: true, showLabelY: true };

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data;
    console.log(datasets[0].data);
  }

  onChangeShowX = () => this.setState({ showLabelX: !this.state.showLabelX });
  onChangeShowY = () => this.setState({ showLabelY: !this.state.showLabelY });

  render() {
    const options = getOptions(this.state.showLabelX, this.state.showLabelY);

    return (
      <div>
        <h2>Line Example</h2>
        <Line redraw={true} ref="chart" data={data} options={options} />
        <label>
          <input
            type="checkbox"
            checked={this.state.showLabelX}
            onClick={this.onChangeShowX}
          />{" "}
          show X
        </label>
        <label>
          <input
            type="checkbox"
            checked={this.state.showLabelY}
            onClick={this.onChangeShowY}
          />{" "}
          show Y
        </label>
      </div>
    );
  }
}
