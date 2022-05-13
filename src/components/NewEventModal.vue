<template>
  <div class="p-6 w-96 h-72 rounded-xl text-white bg-purple">
    <div class="pb-4 w-full flex justify-between align-center">
      <h1 class="m-0">New Event!</h1>
      <div @click="close" class="cursor-pointer">
        <mdicon name="closeCircle" />
      </div>
    </div>
    <form class="px-2">
      <div class="border-b border-white flex items-center gap-2 w-full py-2">
        <mdicon name="calendarBlank" size="24" />
        <input
          class="rounded-none w-full bg-transparent border-none text-white text-xl p-0 placeholder-purple-light outline-none"
          v-model="name"
          type="text"
          placeholder="Give your event a name!"
        />
      </div>
      <div class="event-date"></div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "new-event-modal",

  data() {
    return {
      name: "",
      date: null as Date | null,
      startTime: null as Date | null,
      endTime: null as Date | null,
      numMaxGuests: null as number | null,
    };
  },

  methods: {
    close(): void {
      this.$emit("closed");
    },
  },
});
</script>
