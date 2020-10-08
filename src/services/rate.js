import axios from "axios";

const { VUE_APP_EXCHANGE_RATES_API } = process.env;

const get = async ({ base }) => {
  const response = await axios.get(
    `${VUE_APP_EXCHANGE_RATES_API}/rates?base=${base}`
  );
  const rates = await response.data.rates;

  return rates;
};

export { get };
