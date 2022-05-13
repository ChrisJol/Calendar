<template>
  <div id="app">
    <sidebar />
    <calendar />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Calendar from "@/components/Calendar.vue";

export default Vue.extend({
  name: "app",

  components: { Sidebar, Calendar },
});
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  width: 100%;
  height: 100vh;
  display: flex;
}
</style>
