<template>
  <div class="h-full p-4 flex flex-col">
    <h2 class="text-purple-light pb-4">{{ day }}</h2>
    <div class="h-full"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "day-view",

  computed: {
    ...mapGetters(["getDisplayMonth", "getDisplayDay"]),

    date(): Date {
      return new Date(2022, this.getDisplayMonth, this.getDisplayDay);
    },

    day(): string {
      return this.date.toLocaleString("en-US", {
        weekday: "long",
      });
    },
  },
});
</script>
