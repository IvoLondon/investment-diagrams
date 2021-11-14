export type DiagramsType = "current-value" | "investments";

export type DataType = {
  tokens: {
    token: string;
    active?: boolean;
    balance: string;
    transactions: {
      price: string;
      quantity: string;
      wallet?: string;
    }[];
    charges?: string[];
  }[];
};
