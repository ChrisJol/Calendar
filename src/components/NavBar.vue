<template>
  <div
    class="w-full bg-white border-b border-steel p-4 flex gap-4 items-center justify-between"
  >
    <div class="flex gap-1 text-grey">
      <div
        @click="decrement"
        class="rounded-lg hover-bg-purple hover-text-white transition-colors"
      >
        <mdicon name="chevronLeft" size="30" class="cursor-pointer" />
      </div>
      <div
        @click="increment"
        class="rounded-lg hover-bg-purple hover-text-white transition-colors"
      >
        <mdicon name="chevronRight" size="30" class="cursor-pointer" />
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
