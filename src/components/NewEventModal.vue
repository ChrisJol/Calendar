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
          <option v-for="(month, index) in months" :key="index">
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
          <option v-for="(year, index) in years" :key="index">
            {{ year }}
          </option>
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
          <input
            v-model="startPeriod"
            class="text-sm focus-bg-purple-light text-center w-6 h-6 bg-transparent hover-bg-purple-light rounded-md focus-outline-none border-none text-white"
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
          <input
            v-model="endPeriod"
            class="text-sm focus-bg-purple-light text-center w-6 h-6 bg-transparent hover-bg-purple-light rounded-md focus-outline-none border-none text-white"
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
      currentMonth: "May",
      currentDay: "13",
      startHour: new Date().getHours(),
      startMinutes: new Date().getMinutes(),
      startPeriod: "PM",
      endHour: new Date().getHours(),
      endMinutes: new Date().getMinutes(),
      endPeriod: "PM",
      startTime: null as Date | null,
      endTime: null as Date | null,
      numMaxGuests: 10,
      years: ["2022", "2023", "2024", "2025"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "Decemnber",
      ],
    };
  },

  methods: {
    ...mapMutations(["AddTimeSlot"]),

    close(): void {
      this.$emit("closed");
    },

    onSubmit() {
      this.AddTimeSlot({
        activityName: this.name,
        date: new Date(),
        startTime: new Date().getTime(),
        endTime: new Date().getTime(),
        numMaxGuests: this.numMaxGuests,
        id: uniqueID(),
      });

      this.close();
    },
  },
});
</script>
