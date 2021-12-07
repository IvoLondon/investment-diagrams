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

export const currencyConverter = async (sum: number): Promise<number> => {
  let todaysRate;

  try {
    // fetch data
    const fetchCurrencies = await fetch(
      `https://free.currconv.com/api/v7/convert?q=GBP_USD&compact=ultra&apiKey=${process.env.CONVERT_API}`
    );
    todaysRate = await fetchCurrencies.json();
  } catch (e) {
    console.log(e);
  }

  // return the GBP sum into todays rate
  return sum * todaysRate["GBP_USD"];
};

export default {
  currentTokenPrices,
  currencyConverter,
};
