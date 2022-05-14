<template>
  <div
    class="bg-purple-light rounded p-2 text-white flex flex-col gap-2 absolute left-0 w-full"
    :style="{ top: `${topOffset}rem`, height: `${height}rem` }"
  >
    <div class="w-full flex justify-between items-center text-xl">
      <p>{{ timeslot.activityName }}</p>
      <div class="cursor-pointer" @click="DeleteTimeSlot(timeslot.id)">
        <mdicon name="Delete" class="text-white" size="20" />
      </div>
    </div>
    <p>
      {{ timeslot.date.toDateString() }}
    </p>
    <p>{{ timeRange }}</p>
    <p>Max guests: {{ timeslot.numMaxGuests }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import { iTimeSlot } from "@/lib/utils";

export default Vue.extend({
  name: "timeslot-card",

  props: {
    timeslot: Object as () => iTimeSlot,
  },

  computed: {
    timeRange(): string {
      const start = this.timeslot.startTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      const end = this.timeslot.endTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });

      return `from ${start} to ${end}`;
    },

    topOffset(): number {
      const hours = this.timeslot.startTime.getHours();
      const minutes = this.timeslot.startTime.getMinutes();

      return hours * 3.5 + (minutes / 60) * 3.5;
    },

    height(): number {
      const hours =
        this.timeslot.endTime.getHours() - this.timeslot.startTime.getHours();
      const minutes =
        this.timeslot.endTime.getMinutes() -
        this.timeslot.startTime.getMinutes();

      return hours * 3.5 + (minutes / 60) * 3.5;
    },
  },

  methods: {
    ...mapMutations(["DeleteTimeSlot"]),
  },
});
</script>
