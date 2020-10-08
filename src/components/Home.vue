<template>
  <div
    class="max-w-md mx-auto p-8 sm:p-12 shadow-md border rounded bg-gray-300"
  >
    <h1 class="text-2xl font-semibold mb-4 text-green-500">Exchange Rates</h1>
    <label for="amount" class="block text-sm font-semibold text-gray-700 mb-2">
      Amount
    </label>
    <input
      type="number"
      name="amount"
      id="amount"
      min="0"
      step="any"
      v-model="amount"
      class="w-full px-4 py-2 mb-4 border border-gray-500 rounded bg-white focus:outline-none focus:border-green-500"
    />
    <label for="symbols" class="block text-sm font-semibold text-gray-700 mb-2">
      Select Base
    </label>
    <select
      name="symbols"
      id="symbols"
      v-on:change="getRates"
      class="w-full px-4 py-2 mb-4 border border-gray-500 rounded bg-white focus:outline-none focus:border-green-500"
    >
      <option v-for="symbol in symbols" v-bind:key="symbol">
        {{ symbol }}
      </option>
    </select>
    <div class="mt-8 pt-8 border-t border-gray-400 transform">
      <ul>
        <li
          v-for="(rate, base) of rates"
          v-bind:key="base"
          class="list-inside list-disc text-gray-600 mb-4"
        >
          <span class="text-gray-800">{{ base }}</span> - {{ rate * amount }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as rateService from "../services/rate";
import * as symbolService from "../services/symbol";

export default {
  name: "Home",
  data: () => ({
    amount: 1,
    base: "",
    rates: {},
    symbols: [],
  }),
  created: function() {
    this.getSymbols();
  },
  methods: {
    getSymbols: async function() {
      try {
        const symbols = await symbolService.get();
        this.symbols = symbols;
      } catch (error) {
        this.symbols = [];
      }
    },
    getRates: async function(e) {
      try {
        const rates = await rateService.get({ base: e.target.value });
        this.rates = rates;
      } catch (error) {
        this.rates = {};
      }
    },
  },
};
</script>
