<template>
  <div
    @keydown.enter.prevent="onSubmit"
    class="p-6 w-96 rounded-xl text-white bg-purple shadow-purple"
  >
    <div class="pb-4 w-full flex justify-between items-center gap-4">
      <div class="flex items-center gap-1">
        <div class="pt-1">
          <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1"
            />
          </svg>
        </div>
        <input
          class="rounded-md px-2 py-1 bg-transparent hover-bg-purple-light focus-bg-purple-light text-3xl w-full border-none text-white text-xl p-0 placeholder-purple-light outline-none transition-colors"
          v-model="name"
          type="text"
        />
      </div>
      <div @click="close" class="cursor-pointer">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
          />
        </svg>
      </div>
    </div>
    <form class="px-2 flex flex-col gap-4">
      <h2>Time</h2>

      <div class="flex flex-col gap-2">
        <div class="flex items-center">
          <p class="mr-1">Starts:</p>
          <input
            v-model="startHour"
            class="text-base focus-bg-purple-light text-center w-6 h-6 bg-transparent hover-bg-purple-light rounded-md focus-outline-none border-none text-white"
          />
          <p class="h-5 m-0">:</p>
          <input
            v-model="startMinutes"
            class="text-base focus-bg-purple-light text-center w-6 h-6 bg-transparent hover-bg-purple-light rounded-md focus-outline-none border-none text-white"
          />
        </div>

        <div class="flex items-center">
          <p class="m-0 mr-1">Ends:</p>
          <input
            v-model="endHour"
            class="text-base focus-bg-purple-light text-center w-6 h-6 bg-transparent hover-bg-purple-light rounded-md focus-outline-none border-none text-white"
          />
          <p class="h-5 m-0">:</p>
          <input
            v-model="endMinutes"
            class="text-base focus-bg-purple-light text-center w-6 h-6 bg-transparent hover-bg-purple-light rounded-md focus-outline-none border-none text-white"
          />
        </div>
      </div>

      <div class="w-full flex gap-2">
        <h2 class="flex-shrink-0">Number of guests:</h2>

        <input
          v-model="numMaxGuests"
          class="w-16 px-2 text-xl bg-transparent text-white border-none focus-outline-none hover-bg-purple-light focus-bg-purple-light rounded-md"
        />
      </div>

      <div class="w-full flex justify-end gap-2">
        <button
          id="delete-button"
          @click.prevent="onDelete"
          class="mt-4 p-3 text-lg text-white rounded-lg hover-bg-red transition-colors bg-red-light border-none focus-outline-none cursor-pointer"
        >
          Delete
        </button>
        <button
          id="update-button"
          @click.prevent="onSubmit"
          class="mt-4 p-3 text-lg text-white rounded-lg hover-bg-white hover-text-purple transition-colors bg-purple-light border-none focus-outline-none cursor-pointer"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapActions } from "vuex";
import { addMinutes, addHours } from "date-fns";
import { iTimeSlot } from "@/lib/utils";

export default Vue.extend({
  name: "update-timeslot-modal",

  props: {
    timeslot: Object as () => iTimeSlot,
  },

  data() {
    return {
      name: this.timeslot.activityName,
      currentYear: "2022",
      currentMonth: this.timeslot.date.getMonth(),
      currentDay: this.timeslot.date.getDate(),
      startHour: this.timeslot.startTime.getHours(),
      startMinutes: this.timeslot.startTime.getMinutes(),
      endHour: this.timeslot.endTime.getHours(),
      endMinutes: this.timeslot.endTime.getMinutes(),
      numMaxGuests: this.timeslot.numMaxGuests,
    };
  },

  methods: {
    ...mapMutations(["DeleteTimeSlot"]),
    ...mapActions(["updateTimeslot"]),

    close(): void {
      this.$emit("closed");
    },

    getDate(): Date {
      const month =
        typeof this.currentMonth === "string"
          ? parseInt(this.currentMonth)
          : this.currentMonth;

      const day =
        typeof this.currentDay === "string"
          ? parseInt(this.currentDay)
          : this.currentDay;

      return new Date(2022, month, day);
    },

    getStartTime(): Date {
      let time = addHours(this.getDate(), this.startHour);
      time = addMinutes(time, this.startMinutes);
      return time;
    },

    getEndTime(): Date {
      let time = addHours(this.getDate(), this.endHour);
      time = addMinutes(time, this.endMinutes);
      return time;
    },

    onDelete(): void {
      this.DeleteTimeSlot(this.timeslot);
      this.close();
    },

    onSubmit() {
      this.updateTimeslot({
        activityName: this.name,
        date: this.getDate(),
        startTime: this.getStartTime(),
        endTime: this.getEndTime(),
        numMaxGuests: this.numMaxGuests,
        id: this.timeslot.id,
        overlapId: this.timeslot.overlapId,
        position: this.timeslot.position,
      });

      this.close();
    },
  },
});
</script>
