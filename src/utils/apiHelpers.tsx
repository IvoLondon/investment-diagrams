export const currentTokenPrices = async (tokens: string) => {
  try {
    // fetch tokens rate
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURI(
        tokens
      )}&vs_currencies=usd`
    );

    // return an obj with requested tokens and their current rate
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

export const currencyConverter = async (sum: number) => {
  try {
    // fetch data
    const fetchCurrencies = await fetch(
      "https://free.currconv.com/api/v7/convert?q=GBP_USD&compact=ultra&apiKey=dba1701537314cbb55ac"
    );

    const todaysRate = await fetchCurrencies.json();

    // return the GBP sum into todays rate
    return sum * todaysRate["GBP_USD"];
  } catch (e) {
    console.log(e);
  }
};

export default {
  currentTokenPrices,
  currencyConverter,
};
