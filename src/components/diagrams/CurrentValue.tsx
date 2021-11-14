import React from "react";
import Chart from "chart.js/auto";

const CurrentValue = () => {
  const chartContainer = React.useRef(null);
  let myChart = null;

  React.useEffect(() => {
    if (chartContainer.current !== null) {
      myChart = new Chart(chartContainer.current, {
        type: "doughnut",
        options: {
          maintainAspectRatio: true,
        },
        data: {
          labels: ["eth", "cardano"],
          datasets: [
            {
              data: ["10", "100"],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
            },
          ],
        },
      });
    }
  }, []);

  return (
    <>
      <div>Curent</div>
      <canvas ref={chartContainer} />
    </>
  );
};

export default CurrentValue;
