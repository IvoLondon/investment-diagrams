import { DataType } from "@root/App.d";

type TokenType = {
  total: DataType["tokens"][0]["balance"];
  transactions: DataType["tokens"][0]["transactions"];
  charges?: DataType["tokens"][0]["charges"];
};

export const calculateWeightAverage = (
  total: TokenType["total"],
  transactions: TokenType["transactions"]
): string => {
  const totalTransactions = calculateTotal(transactions);
  const averagePrice = totalTransactions / Number(total);
  return averagePrice.toPrecision(5);
};

export const calculateBreakEven = (
  total: TokenType["total"],
  transactions: TokenType["transactions"],
  charges: TokenType["charges"]
) => {
  let totalTransactions = calculateTotal(transactions);
  let totalTransactionsWithCost = totalTransactions;
  if (charges?.length) {
    totalTransactionsWithCost = charges.reduce((acc, cost) => {
      return acc + Number(cost);
    }, totalTransactionsWithCost);
  }
  const averagePrice = totalTransactionsWithCost / Number(total);
  return averagePrice.toPrecision(5);
};

const calculateTotal = (transactions: TokenType["transactions"]) => {
  return transactions.reduce(
    (acc: number, current: { price: string; quantity: string }) => {
      return acc + Number(current.price) * Number(current.quantity);
    },
    0
  );
};
