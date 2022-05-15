<template>
  <div
    @keydown.enter.prevent="onSubmit"
    class="p-6 w-96 rounded-xl text-white bg-purple shadow-purple"
  >
    <div class="pb-4 w-full flex justify-between items-center gap-4">
      <div class="flex items-center gap-1">
        <div class="pt-1">
          <mdicon name="Calendar" />
        </div>
        <input
          class="rounded-md px-2 py-1 bg-transparent hover-bg-purple-light focus-bg-purple-light text-3xl w-full border-none text-white text-xl p-0 placeholder-purple-light outline-none transition-colors"
          v-model="name"
          type="text"
        />
      </div>
      <div @click="close" class="cursor-pointer">
        <mdicon name="closeCircle" />
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
          @click.prevent="onDelete"
          class="mt-4 p-3 text-lg text-white rounded-lg hover-bg-red transition-colors bg-red-light border-none focus-outline-none cursor-pointer"
        >
          Delete
        </button>
        <button
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
import { mapMutations } from "vuex";
import { uniqueID } from "@/lib/utils";
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
    ...mapMutations(["UpdateTimeSlot", "DeleteTimeSlot"]),

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
      this.UpdateTimeSlot({
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
