<template>
  <div class="w-full flex flex-col bg-steel">
    <div class="grid grid-cols-7 gap-px pb-px">
      <p class="w-full flex justify-center bg-white py-2 text-grey">Sunday</p>
      <p class="w-full flex justify-center bg-white py-2 text-grey">Monday</p>
      <p class="w-full flex justify-center bg-white py-2 text-grey">Tuesday</p>
      <p class="w-full flex justify-center bg-white py-2 text-grey">
        Wednesday
      </p>
      <p class="w-full flex justify-center bg-white py-2 text-grey">Thursday</p>
      <p class="w-full flex justify-center bg-white py-2 text-grey">Friday</p>
      <p class="w-full flex justify-center bg-white py-2 text-grey">Saturday</p>
    </div>
    <div class="grid grid-cols-7 grid-rows-5 gap-px pb-px">
      <month-view-day v-for="day in days" :key="day" :day="day" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";
import MonthViewDay from "./MonthViewDay.vue";

export default Vue.extend({
  name: "month-view",

  components: { MonthViewDay },

  computed: {
    ...mapGetters(["getTimeSlots", "getDisplayMonth"]),

    days(): number {
      return new Date(2022, this.getDisplayMonth + 1, 0).getDate();
    },
  },

  methods: {
    ...mapMutations(["DeleteTimeSlot"]),

    onDelete(id: string): void {
      this.DeleteTimeSlot(id);
    },
  },
});
</script>
