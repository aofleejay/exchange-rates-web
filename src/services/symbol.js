import axios from "axios";

const { VUE_APP_EXCHANGE_RATES_API } = process.env;

const get = async () => {
  const response = await axios.get(`${VUE_APP_EXCHANGE_RATES_API}/symbols`);
  const symbols = await response.data.symbols;

  return symbols;
};

export { get };
