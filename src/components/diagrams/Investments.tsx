import { DataType } from "@root/App.d";
import { calculateWeightAverage, calculateBreakEven } from "@utils/formulas";

type InvestmentsDiagramType = {
  data: DataType;
};

const InvestmentsDiagram = (props: InvestmentsDiagramType) => {
  return (
    <>
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="w-1/2 px-4 py-2">Token</th>
            <th className="w-1/4 px-4 py-2">Average Value</th>
            <th className="w-1/4 px-4 py-2">To Break Even</th>
          </tr>
        </thead>
        <tbody>
          {props.data.tokens.map((token, index) => {
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
