<template>
  <div
    @click="editTimeslot"
    class="bg-red-light hover-bg-red text-white rounded-lg p-4 flex flex-col gap-2 absolute border border-white transition-colors cursor-pointer"
    :style="{
      top: `${topOffset}rem`,
      left: `${leftOffset}%`,
      height: `${height}rem`,
      width: `${width}%`,
    }"
  >
    <p class="text-2xl">{{ timeslot.activityName }}</p>
    <p>{{ datetime }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapGetters } from "vuex";
import { iTimeSlot } from "@/lib/utils";
import UpdateTimeslotModal from "@/components/UpdateTimeslotModal.vue";

export default Vue.extend({
  name: "timeslot-card",

  props: {
    timeslot: Object as () => iTimeSlot,
  },

  computed: {
    ...mapGetters(["getNumOverlapping"]),

    datetime(): string {
      const date = this.timeslot.date.toLocaleString("en-US", {
        dateStyle: "full",
      });
      const start = this.timeslot.startTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      });
      const end = this.timeslot.endTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      });

      return `${date} ${start} - ${end}`;
    },

    numOverlapping(): number {
      return this.getNumOverlapping(this.timeslot.overlapId);
    },

    topOffset(): number {
      const hours = this.timeslot.startTime.getHours();
      const minutes = this.timeslot.startTime.getMinutes();

      return hours * 3.5 + (minutes / 60) * 3.5;
    },

    leftOffset(): number {
      return (100 / this.numOverlapping) * this.timeslot.position;
    },

    width(): number {
      if (this.numOverlapping < 1) return 100;
      return 100 / this.numOverlapping;
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
    editTimeslot(): void {
      this.$modal.open({
        parent: this,
        component: UpdateTimeslotModal,
        props: {
          timeslot: this.timeslot,
        },
      });
    },
  },
});
</script>
