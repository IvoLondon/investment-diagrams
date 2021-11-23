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
  const deposits = calculateDeposits(props.portfolio.deposits);

  const currentPortfolioValue = calculateCurrentPortfolio(
    props.portfolio.tokens,
    props.livePrices
  );

  const calculateT = async () => {
    const converted = await API.currencyConverter(deposits);
    console.log(
      "Diff",
      calculatePercentage(currentPortfolioValue, converted as number)
    );
  };
  calculateT();

  return (
    <>
      <div>Currently deposited {deposits}</div>

      <table className="table-fixed">
        <thead>
          <tr>
            <th className="w-1/2 px-4 py-2">Token</th>
            <th className="w-1/4 px-4 py-2">Average Value</th>
            <th className="w-1/4 px-4 py-2">To Break Even</th>
          </tr>
        </thead>
        <tbody>
          {props.portfolio.tokens.map((token, index) => {
            return (
              <tr className={index % 2 ? `bg-gray-100` : undefined}>
                <td className="border px-4 py-2">{token.token}</td>
                <td className="border px-4 py-2">
                  {calculateWeightAverage(token.balance, token.transactions)}
                </td>
                <td className="border px-4 py-2">
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
