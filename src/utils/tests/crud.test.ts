import {
  addToken,
  removeToken,
  addTransaction,
  addBalance,
  addCharge,
  setBackgroundColor,
} from "../crud";

describe("Test CRUD functions", () => {
  const mockData: any = {
    deposits: [
      {
        date: "2021-02-07 21:22:33",
        sum: "100",
        currency: "GBP",
      },
    ],
    tokens: [
      {
        id: "ethereum",
        symbol: "eth",
        token: "Ethereum",
        balance: "0.1",
        backgroundColor: "rgba(60, 60, 61, 1)",
        transactions: [{ price: "1500", quantity: "0.1", wallet: "binance" }],
        charges: ["25"],
      },
    ],
  };

  const mockToken = {
    id: "new-btc",
    symbol: "newBtc",
    token: "newBtc",
    balance: "",
    backgroundColor: "#ff0000",
    transactions: [],
    charges: [],
  };

  it("should ADD new token to the list", () => {
    const res = addToken(mockData.tokens, mockToken);

    expect(res).toHaveLength(2);
  });

  it("should REMOVE a token from the list by using an id", () => {
    const res = removeToken(mockData.tokens, "ethereum");

    expect(res).toHaveLength(0);
  });

  it("should ADD TRANSACTION to a token using an id", () => {
    const res = addTransaction(mockData.tokens, "ethereum", {
      price: "2000",
      quantity: "0.5",
      wallet: "binance",
    });

    expect(res[0].transactions).toHaveLength(2);
  });

  it("should SET BALANCE to a token using an id", () => {
    const res = addBalance(mockData.tokens, "ethereum", "0.5");

    expect(res[0].balance).toBe("0.5");
  });

  it("should ADD CHARGE to a token using an id", () => {
    const res = addCharge(mockData.tokens, "ethereum", "15");

    expect(res[0].charges).toHaveLength(2);
  });

  it("should UPDATE background colour using an id", () => {
    const res = setBackgroundColor(mockData.tokens, "ethereum", "#ffffff");

    expect(res[0].backgroundColor).toBe("#ffffff");
  });
});
