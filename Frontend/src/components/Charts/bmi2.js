import React, { Component } from "react";
import { Line, Pie } from "react-chartjs-2";

const colors = ["#78ce90", "#b977ce", "#fac76e", "#de4d4d"];
const data = {
  labels: ["15 Jan 2020", "12 Feb 2020", " 10 Mar 2020", " 15 Apr 2020", "8 May 2020", "20 Jun 2020", "23 July 2020"],
  datasets: [
    {
      label: "BMI",
      fill: false,
      lineTension: 0.1,
      backgroundColor: colors,
      backgroundColor: "rgba(70,172,182,1)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderColor: "white",
      pointBackgroundColor: "black",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: [65, 59, 70, 81, 56, 55, 40]
    },
    {
      label: "Weight",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(225,0,0,0.4)",
      borderColor: "rgb(167, 105, 0)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "white",
      pointBackgroundColor: "black",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "brown",
      pointHoverBorderColor: "yellow",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: false
      data: [60, 69, 65, 70, 64, 62,65,60],
      spanGaps: false,
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
           <div className="text-overlay1">
                <div className="header">
                    <a href="/" class="logo">MEDIREPORT</a>
                    <div class="header-right">
                    </div>
                </div>
        <h2>Body Mass Index Chart</h2>
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
      </div>
    );
  }
}
