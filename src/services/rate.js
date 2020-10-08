import axios from "axios";

const { VUE_APP_EXCHANGE_RATES_API } = process.env;

const get = async ({ base }) => {
  const response = await axios.get(
    `${VUE_APP_EXCHANGE_RATES_API}/latest?base=${base}`
  );
  const exchangeRates = await response.data;

  return exchangeRates;
};

export { get };
