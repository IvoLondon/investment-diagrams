import * as React from "react";
import { PortfolioDataType, CurrentPricesType } from "@root/App.d";
import * as API from "@utils/apiHelpers";
import {
  calculateWeightAverage,
  calculateBreakEven,
  calculateDeposits,
  calculateCurrentPortfolio,
  calculatePercentage,
} from "@utils/formulas";

type InvestmentsDiagramType = {
  portfolio: PortfolioDataType;
  livePrices: CurrentPricesType;
};

const InvestmentsDiagram = (props: InvestmentsDiagramType) => {
  const [deposits, setDeposits] = React.useState(0);
  const [currentPortfolio, setCurrentPortfolio] = React.useState(0);
  const [ratio, setRatio] = React.useState(0);

  React.useEffect(() => {
    const convertInUSD = async () => {
      // adds all the deposits
      const sumDeposits = calculateDeposits(props.portfolio.deposits);
      // Converts them from GBP to USD
      let sumDepositsInUSD: number = await API.currencyConverter(sumDeposits);

      // adds all the tokens * current price
      const sumPortfolioValue = calculateCurrentPortfolio(
        props.portfolio.tokens,
        props.livePrices
      );

      // calculate the increase in percentage
      const sumRatio = calculatePercentage(sumPortfolioValue, sumDepositsInUSD);

      setDeposits(sumDepositsInUSD);
      setCurrentPortfolio(sumPortfolioValue);
      setRatio(sumRatio);
    };
    convertInUSD();
  });

  return (
    <>
      <table className="table-fixed">
        <tbody>
          <tr key="deposit" className={`bg-gray-100`}>
            <td className="border px-4 py-2">Deposited</td>
            <td className="border px-4 py-2">$ {deposits}</td>
          </tr>
          <tr key="portfolio">
            <td className="border px-4 py-2">Portfolio value</td>
            <td className="border px-4 py-2">$ {currentPortfolio}</td>
          </tr>
          <tr key="total" className={`bg-gray-100`}>
            <td className="border px-4 py-2">Stats</td>
            <td className="border px-4 py-2">% {ratio}</td>
          </tr>
        </tbody>
      </table>

      <table className="table-fixed">
        <thead>
          <tr>
            <th key="token" className="w-1/2 px-4 py-2">
              Token
            </th>
            <th key="weigth-average" className="w-1/4 px-4 py-2">
              Average Value
            </th>
            <th key="break-even" className="w-1/4 px-4 py-2">
              To Break Even
            </th>
          </tr>
        </thead>
        <tbody>
          {props.portfolio.tokens.map((token, index) => {
            return (
              <tr
                key={token.id}
                className={index % 2 ? `bg-gray-100` : undefined}
              >
                <td key="token" className="border px-4 py-2">
                  {token.token}
                </td>
                <td key="weight-average" className="border px-4 py-2">
                  {calculateWeightAverage(token.balance, token.transactions)}
                </td>
                <td key="break-even" className="border px-4 py-2">
                  {calculateBreakEven(
                    token.balance,
                    token.transactions,
                    token.charges
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default InvestmentsDiagram;
