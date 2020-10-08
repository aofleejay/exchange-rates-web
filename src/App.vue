<template>
  <div id="app" class="w-full min-h-screen py-8 px-2 bg-gray-100">
    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>
