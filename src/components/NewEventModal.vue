<template>
  <div
    @keydown.enter.prevent="onSubmit"
    class="p-6 w-96 rounded-xl text-white bg-purple shadow-purple"
  >
    <div class="pb-4 w-full flex justify-between align-center">
      <h1 class="m-0">New Event!</h1>
      <div @click="close" class="cursor-pointer">
        <mdicon name="closeCircle" />
      </div>
    </div>
    <form class="px-2 flex flex-col gap-4">
      <div class="border-b border-white flex items-center gap-2 w-full py-2">
        <mdicon name="calendarBlank" size="24" />
        <input
          ref="input"
          class="rounded-none w-full bg-transparent border-none text-white text-xl p-0 placeholder-purple-light outline-none"
          v-model="name"
          type="text"
          placeholder="Give your event a name!"
        />
      </div>

      <h2>Date</h2>

      <div class="flex gap-2 items-center">
        <select
          class="bg-transparent border border-white rounded text-white p-1 focus-outline-none"
          v-model="currentMonth"
        >
          <option v-for="(month, index) in 12" :key="index">
            {{ month }}
          </option>
        </select>

        <select
          class="bg-transparent border border-white rounded text-white p-1 focus-outline-none"
          v-model="currentDay"
        >
          <option v-for="(day, index) in 31" :key="index">
            {{ day }}
          </option>
        </select>

        <select
          class="bg-transparent border border-white rounded text-white p-1 focus-outline-none"
          v-model="currentYear"
        >
          <option>2022</option>
        </select>
      </div>

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

      <button
        @click.prevent="onSubmit"
        class="mt-4 p-3 text-lg text-white rounded hover-bg-white hover-text-purple transition-colors bg-purple-light border-none focus-outline-none cursor-pointer"
      >
        Let's Go!
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import { uniqueID } from "@/lib/utils";
import { addMinutes, addHours } from "date-fns";

export default Vue.extend({
  name: "new-event-modal",

  mounted() {
    this.$nextTick(() => {
      (this.$refs.input as HTMLInputElement).focus();
    });
  },

  data() {
    return {
      name: "",
      currentYear: "2022",
      currentMonth: new Date().getMonth(),
      currentDay: new Date().getDate(),
      startHour: new Date().toLocaleString("en-US", { hour: "2-digit" }),
      startMinutes: new Date().toLocaleString("en-US", { minute: "2-digit" }),
      endHour: new Date().toLocaleString("en-US", { hour: "2-digit" }),
      endMinutes: new Date().toLocaleString("en-US", { minute: "2-digit" }),
      numMaxGuests: 10,
    };
  },

  methods: {
    ...mapMutations(["AddTimeSlot"]),

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
      let time = addHours(this.getDate(), parseInt(this.startHour));
      time = addMinutes(time, parseInt(this.startMinutes));
      return time;
    },

    getEndTime(): Date {
      let time = addHours(this.getDate(), parseInt(this.endHour));
      time = addMinutes(time, parseInt(this.endMinutes));
      return time;
    },

    onSubmit() {
      this.AddTimeSlot({
        activityName: this.name,
        date: this.getDate(),
        startTime: this.getStartTime(),
        endTime: this.getEndTime(),
        numMaxGuests: this.numMaxGuests,
        id: uniqueID(),
      });

      this.close();
    },
  },
});
</script>
