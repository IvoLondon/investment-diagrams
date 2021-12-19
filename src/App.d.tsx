export type DiagramsType = "current-value" | "investments";

export type CurrentPricesType =
  | {
      [key: string]: { usd: number | string };
    }
  | {};

export type TransactionsType = {
  price: string;
  quantity: string;
  wallet?: string;
};

export type ChargesType = string[];
export interface ITokens {
  id: string;
  symbol: string;
  token: string;
  active?: boolean;
  balance: string;
  backgroundColor: string;
  transactions?: TransactionsType[];
  charges?: ChargesType;
}

export interface IDeposits {
  date?: string;
  sum?: string;
  currency: string;
}

export interface IPortfolioDataType {
  deposits: IDeposits[];
  tokens: ITokens[];
}
