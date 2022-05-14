<template>
  <div class="h-full p-4 flex flex-col flex-grow-0">
    <h2 class="text-purple-light pb-4">{{ day }}</h2>
    <div class="h-full w-full my-6 flex flex-col overflow-y-scroll relative">
      <div
        v-for="(hour, i) in hoursInDay"
        :key="i"
        class="flex gap-2 w-full text-steel h-14 flex-shrink-0 border-t border-steel"
      >
        <p>{{ hour }}</p>
      </div>
      <div class="absolute h-full w-cal right-2">
        <timeslot-card
          v-for="timeslot in timeslots"
          :key="timeslot.id"
          :timeslot="timeslot"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { iTimeSlot } from "@/lib/utils";
import TimeslotCard from "@/components/Timeslot/TimeslotCard.vue";

export default Vue.extend({
  name: "day-view",

  components: { TimeslotCard },

  computed: {
    ...mapGetters(["getDisplayMonth", "getDisplayDay", "getTimeSlots"]),

    timeslots(): Array<iTimeSlot> {
      const timeslots = this.getTimeSlots.filter((timeslot: iTimeSlot) => {
        return timeslot.date.toDateString() === this.date.toDateString();
      });

      return timeslots;
    },

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
