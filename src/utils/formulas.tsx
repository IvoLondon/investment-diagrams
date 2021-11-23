import { PortfolioDataType, CurrentPricesType } from "@root/App.d";

type TokenType = PortfolioDataType["tokens"][0];
type BalanceType = PortfolioDataType["tokens"][0]["balance"];
type TransactionsType = PortfolioDataType["tokens"][0]["transactions"];
type ChargesType = PortfolioDataType["tokens"][0]["charges"];

type DepositsType = PortfolioDataType["deposits"];

export const calculateWeightAverage = (
  balance: BalanceType,
  transactions: TransactionsType
): string => {
  const totalTransactions = calculateTotal(transactions);
  const averagePrice = totalTransactions / Number(balance);
  return averagePrice.toPrecision(5);
};

export const calculateBreakEven = (
  balance: BalanceType,
  transactions: TransactionsType,
  charges: ChargesType
) => {
  let totalTransactions = calculateTotal(transactions);
  let totalTransactionsWithCost = totalTransactions;
  if (charges?.length) {
    totalTransactionsWithCost = charges.reduce((acc, cost) => {
      return acc + Number(cost);
    }, totalTransactionsWithCost);
  }
  const averagePrice = totalTransactionsWithCost / Number(balance);
  return averagePrice.toPrecision(5);
};

const calculateTotal = (transactions: TransactionsType): number => {
  // Helper for calculateWeightAverage and calculateBreakEven
  return transactions.reduce(
    (acc: number, current: { price: string; quantity: string }) => {
      return acc + Number(current.price) * Number(current.quantity);
    },
    0
  );
};

export const calculateDeposits = (deposits: DepositsType): number => {
  // Iterate through the deposits and adds their sum
  return deposits.reduce((acc, { sum }) => {
    return acc + Number(sum);
  }, 0);
};

export const calculateCurrentPortfolio = (
  tokens: Array<TokenType>,
  livePrices: CurrentPricesType
): number => {
  // Iterates over each token
  const total = tokens.reduce((acc, curr) => {
    // Takes token id (matches from coingecko)
    const elementId = curr.id as string;

    // Checks if the element exists in the livePrices list fetched from coingecko
    if (livePrices.hasOwnProperty(elementId)) {
      const price = (livePrices as any)[elementId]?.usd;

      // returns the token balance * current price
      return acc + Number(curr.balance) * Number(price);
    }

    // return the current acc if the element id doesn't exist in live prices list
    return acc;
  }, 0);

  return total;
};

export const calculatePercentage = (newNum: number, oldNum: number): number => {
  // Increase = New Number - Original Number
  const difference = newNum - oldNum;

  // return % increase = Increase ÷ Original Number × 100.
  return (difference / oldNum) * 100;
};
