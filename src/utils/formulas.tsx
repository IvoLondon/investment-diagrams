import {
  ITokens,
  TransactionsType,
  ChargesType,
  IDeposits,
  CurrentPricesType,
} from "@root/App.d";

export const calculateWeightAverage = (
  transactions: TransactionsType[]
): string => {
  return calculateTransactions(transactions);
};

export const calculateBreakEven = (
  transactions: TransactionsType[],
  charges: ChargesType
) => {
  return calculateTransactions(transactions, charges);
};

const calculateTransactions = (
  transactions: TransactionsType[],
  charges?: ChargesType
) => {
  // Sum of all transactions
  const totalTransactions = calculateTotalTransactions(transactions);
  // Sum all transactions quantity
  const totalTransactionsQuantity = calculateTransactionsQuantity(transactions);

  let totalTransactionsWithCost;
  if (charges?.length) {
    totalTransactionsWithCost = charges.reduce((acc, cost) => {
      return acc + Number(cost);
    }, totalTransactions);
  } else {
    totalTransactionsWithCost = totalTransactions;
  }

  const averagePrice =
    totalTransactionsWithCost / Number(totalTransactionsQuantity);
  return averagePrice.toPrecision(5);
};

const calculateTotalTransactions = (
  transactions: TransactionsType[]
): number => {
  if (!transactions?.length) return 0;
  // Helper for calculateWeightAverage and calculateBreakEven
  return transactions.reduce(
    (acc: number, order: { price: string; quantity: string }) => {
      return acc + Number(order.price) * Number(order.quantity);
    },
    0
  );
};

const calculateTransactionsQuantity = (
  transactions: TransactionsType[]
): number => {
  if (!transactions?.length) return 0;
  // Helper for calculateWeightAverage and calculateBreakEven
  return transactions.reduce(
    (acc: number, order: { price: string; quantity: string }) => {
      return acc + Number(order.quantity);
    },
    0
  );
};

export const calculatePosition = (balance: string): number => {
  return 1;
};

export const calculateDeposits = (deposits: IDeposits[]): number => {
  // Iterate through the deposits and adds their sum
  return deposits.reduce((acc, { sum }) => {
    return acc + Number(sum);
  }, 0);
};

export const calculateCurrentPortfolio = (
  tokens: Array<ITokens>,
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
