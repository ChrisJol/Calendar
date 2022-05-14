<template>
  <div class="h-full p-4 flex flex-col flex-grow-0">
    <h2 class="text-purple-light pb-4">{{ day }}</h2>
    <div class="h-full flex gap-4">
      <div class="h-full w-full py-6 flex flex-col gap-10 overflow-y-scroll">
        <div
          v-for="(hour, i) in hoursInDay"
          :key="i"
          class="flex gap-2 items-center w-full text-steel"
        >
          <p>{{ hour }}</p>
          <div class="w-full h-px bg-steel"></div>
        </div>
      </div>
      <div class="w-96"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "day-view",

  mounted() {
    console.log(this.hoursInDay);
  },

  computed: {
    ...mapGetters(["getDisplayMonth", "getDisplayDay"]),

    hoursInDay(): Array<string> {
      let hours = [];

      for (var i = 0; i < 24; i++) {
        hours.push(i + ":00");
      }

      return hours;
    },

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
