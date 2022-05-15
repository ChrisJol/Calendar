<template>
  <div
    class="w-full bg-white border-b border-steel p-4 flex gap-4 items-center justify-between"
  >
    <div class="flex gap-1 text-grey">
      <div
        @click="decrement"
        class="rounded-lg hover-bg-purple hover-text-white transition-colors cursor-pointer"
      >
        <svg style="width: 30px; height: 30px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
          />
        </svg>
      </div>
      <div
        @click="increment"
        class="rounded-lg hover-bg-purple hover-text-white transition-colors cursor-pointer"
      >
        <svg style="width: 30px; height: 30px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
          />
        </svg>
      </div>
    </div>

    <h2 class="text-grey mr-2">
      {{ month }}<span v-if="getView === 'day'"> {{ day }}, </span> 2022
    </h2>

    <div class="flex gap-1">
      <div
        @click="setView('month')"
        class="px-4 py-1 rounded-lg hover-bg-purple hover-text-white cursor-pointer transition-colors rounded-md"
        :class="getView === 'month' ? 'bg-purple text-white' : 'text-grey'"
      >
        Month
      </div>
      <div
        @click="setView('day')"
        class="px-4 py-1 rounded-lg hover-bg-purple hover-text-white cursor-pointer transition-colors rounded-md"
        :class="getView === 'day' ? 'bg-purple text-white' : 'text-grey'"
      >
        Day
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: "nav-bar",

  computed: {
    ...mapGetters(["getDisplayMonth", "getDisplayDay", "getView"]),

    date(): Date {
      return new Date(2022, this.getDisplayMonth, this.getDisplayDay);
    },

    day(): string {
      return this.date.toLocaleString("en-US", {
        day: "numeric",
      });
    },

    month(): string {
      return this.date.toLocaleString("en-US", {
        month: "long",
      });
    },
  },

  methods: {
    ...mapMutations(["SetDisplayMonth", "SetDisplayDay", "SetView"]),

    increment(): void {
      if (this.getView === "month") {
        this.SetDisplayMonth(this.getDisplayMonth + 1);
      } else {
        this.SetDisplayDay(this.getDisplayDay + 1);
      }
    },

    decrement(): void {
      if (this.getView === "month") {
        this.SetDisplayMonth(this.getDisplayMonth - 1);
      } else {
        this.SetDisplayDay(this.getDisplayDay - 1);
      }
    },

    setView(view: string): void {
      this.SetView(view);
    },
  },
});
</script>
