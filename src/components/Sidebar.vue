<template>
  <div
    class="border-r border-steel w-72 flex-shrink-0 px-8 py-6 flex flex-col gap-8"
  >
    <div class="flex items-center gap-2">
      <mdicon name="calendarBlank" size="30" />
      <h1 class="m-0">Calendy</h1>
    </div>

    <button
      class="sidebar-cta flex justify-center items-center gap-2 text-purple bg-transparent border border-purple rounded-lg transition-colors cursor-pointer hover-bg-purple hover-text-white"
      @click="createEvent"
    >
      <mdicon name="Plus" />
      <p>Create Timeslot</p>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NewEventModal from "./NewEventModal.vue";

export default Vue.extend({
  name: "sidebar",

  data() {
    return {
      activityName: "",
      date: null as Date | null,
      startTime: null as Date | null,
      endTime: null as Date | null,
      numMaxGuests: null as number | null,
    };
  },

  methods: {
    createEvent(): void {
      this.$modal.open({
        parent: this,
        component: NewEventModal,
      });
    },
  },
});
</script>
