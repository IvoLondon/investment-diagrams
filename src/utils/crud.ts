import { ITokens, TransactionsType } from "@root/App.d";

export const addToken = (tokens: ITokens[] | [], newToken: ITokens) => {
  const newTokens = [...tokens, newToken];
  return newTokens;
};

export const removeToken = (
  tokens: ITokens[],
  tokenId: string
): ITokens[] | [] => {
  const newTokens = tokens.filter((token) => token.id !== tokenId);
  return newTokens;
};

export const addTransaction = (
  tokens: ITokens[],
  tokenId: string,
  transaction: TransactionsType
) => {
  const newTokens = tokens.map((token) => {
    if (token.id === tokenId) {
      return {
        ...token,
        transactions: token.transactions?.length
          ? [...token?.transactions, transaction]
          : [transaction],
      };
    }
    return token;
  });
  return newTokens;
};

export const addBalance = (
  tokens: ITokens[],
  tokenId: string,
  balance: string
) => {
  const newTokens = tokens.map((token) => {
    if (token.id === tokenId) {
      return {
        ...token,
        balance,
      };
    }
    return token;
  });
  return newTokens;
};

export const addCharge = (
  tokens: ITokens[],
  tokenId: string,
  charge: string
) => {
  const newTokens = tokens.map((token) => {
    if (token.id === tokenId) {
      return {
        ...token,
        charges: token.charges?.length ? [...token?.charges, charge] : [charge],
      };
    }
    return token;
  });
  return newTokens;
};

export const setBackgroundColor = (
  tokens: ITokens[],
  tokenId: string,
  backgroundColor: string
) => {
  const newTokens = tokens.map((token) => {
    if (token.id === tokenId) {
      return {
        ...token,
        backgroundColor,
      };
    }
    return token;
  });
  return newTokens;
};
