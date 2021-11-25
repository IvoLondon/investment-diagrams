import React from "react";
import Chart from "chart.js/auto";
import { PortfolioDataType, CurrentPricesType } from "@root/App.d";

type AllocationsType = {
  portfolio: PortfolioDataType;
  livePrices: CurrentPricesType;
};

const Allocations = (props: AllocationsType) => {
  const chartContainer = React.useRef(null);
  let myChart = null;

  React.useEffect(() => {
    if (Object.keys(props.livePrices).length) {
      const portfolio = props.portfolio.tokens.map((token) => {
        const tokenName = token.token;
        const background = token.backgroundColor;
        const currentValue = (
          (props.livePrices as any)[token.id].usd * Number(token.balance)
        ).toFixed(2);
        return {
          tokenName,
          background,
          currentValue,
        };
      });
      console.log(portfolio);

      if (chartContainer.current !== null) {
        myChart = new Chart(chartContainer.current, {
          type: "doughnut",
          options: {
            maintainAspectRatio: true,
          },
          data: {
            labels: portfolio.map((e) => e.tokenName),
            datasets: [
              {
                data: portfolio.map((e) => e.currentValue),
                backgroundColor: portfolio.map((e) => e.background),
              },
            ],
          },
        });
      }
    }
  }, [props.livePrices]);

  return (
    <>
      <canvas ref={chartContainer} />
    </>
  );
};

export default Allocations;
