export type DiagramsType = "current-value" | "investments";

export type CurrentPricesType =
  | {
      [key: string]: { usd: number | string };
    }
  | {};

export type PortfolioDataType = {
  deposits: {
    date?: string;
    sum?: string;
    currency: string;
  }[];
  tokens: {
    id: string;
    symbol: string;
    token: string;
    active?: boolean;
    balance: string;
    backgroundColor: string;
    transactions: {
      price: string;
      quantity: string;
      wallet?: string;
    }[];
    charges?: string[];
  }[];
};
