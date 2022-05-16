<template>
  <div class="w-full h-sixth bg-white flex flex-col gap-2">
    <div class="w-full flex justify-center items-start">
      <p
        class="p-2 rounded-full w-8 h-8 flex items-center justify-center mt-1"
        :class="{ 'bg-purple text-white': today }"
      >
        {{ day }}
      </p>
    </div>
    <div class="px-1 flex flex-col gap-1">
      <div
        v-for="timeslot in timeslots"
        :key="timeslot.id"
        @click="openModal(timeslot)"
        class="w-full p-1 bg-purple-light text-white rounded-md text-xs cursor-pointer hover-bg-purple"
      >
        <p>{{ timeslot.activityName }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { iTimeSlot } from "@/lib/utils";
import UpdateTimeslotModal from "@/components/UpdateTimeslotModal.vue";

export default Vue.extend({
  name: "calendar-day",

  props: {
    day: Number,
  },

  computed: {
    ...mapGetters(["getDisplayMonth", "getDisplayDay", "getTimeSlots"]),

    date(): Date {
      return new Date(2022, this.getDisplayMonth, this.day);
    },

    timeslots(): Array<iTimeSlot> {
      const timeslots: Array<iTimeSlot> = this.getTimeSlots.filter(
        (timeslot: iTimeSlot) => {
          return timeslot.date.toDateString() === this.date.toDateString();
        }
      );

      return timeslots;
    },

    today(): boolean {
      const today = new Date();
      const displayDate = new Date(2022, this.getDisplayMonth, this.day);
      return today.toDateString() === displayDate.toDateString();
    },
  },

  methods: {
    openModal(timeslot: iTimeSlot): void {
      this.$modal.open({
        parent: this,
        component: UpdateTimeslotModal,
        props: {
          timeslot: timeslot,
        },
      });
    },
  },
});
</script>
