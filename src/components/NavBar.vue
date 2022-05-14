<template>
  <div class="w-full border-b border-steel p-4 flex gap-4 items-center">
    <div class="flex gap-1 text-grey">
      <div @click="decrementMonth">
        <mdicon name="chevronLeft" size="30" class="cursor-pointer" />
      </div>
      <div @click="incrementMonth">
        <mdicon name="chevronRight" size="30" class="cursor-pointer" />
      </div>
    </div>

    <h2 class="text-grey mr-2">{{ month }} 2022</h2>

    <button
      class="bg-transparent border text-grey px-8 py-2 border-grey rounded focus-outline-none hover-bg-grey hover-text-white cursor-pointer transition-colors rounded-md"
    >
      Today
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";
import { MutationType } from "@/store";

export default Vue.extend({
  name: "nav-bar",

  computed: {
    ...mapGetters(["getCurrentDate", "getDisplayMonth"]),

    month(): string {
      const displayDate = new Date(2022, this.getDisplayMonth, 0);
      return displayDate.toLocaleString("en-US", {
        month: "long",
      });
    },
  },

  methods: {
    ...mapMutations([MutationType.SetDisplayMonth]),

    incrementMonth(): void {
      this[MutationType.SetDisplayMonth](this.getDisplayMonth + 1);
    },

    decrementMonth(): void {
      this[MutationType.SetDisplayMonth](this.getDisplayMonth - 1);
    },
  },
});
</script>
