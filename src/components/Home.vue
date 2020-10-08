<template>
  <div>
    <h1>Exchange Rates</h1>
    <form v-on:submit="getRates" @submit.prevent>
      <label for="amount">Amount</label>
      <input
        type="number"
        name="amount"
        id="amount"
        min="0"
        step="any"
        v-model="amount"
      />
      <label for="base">Base</label>
      <input
        type="text"
        name="base"
        id="base"
        required
        placeholder="Base rate e.g. THB, USD"
        v-model="base"
      />
      <input type="submit" value="View Rates" />
    </form>
    <div>
      <ul>
        <li v-for="(rate, base) of rates" v-bind:key="base">
          {{ base }} - {{ rate * amount }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as rateService from "../services/rate";

export default {
  name: "Home",
  data: () => ({
    amount: 1,
    base: "",
    rates: {},
  }),
  methods: {
    getRates: async function () {
      try {
        const exchangeRates = await rateService.get({ base: this.base });
        this.rates = exchangeRates.rates;
      } catch (error) {
        this.rates = {};
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
