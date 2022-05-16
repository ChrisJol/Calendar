<template>
  <div
    class="border-r border-steel w-72 flex-shrink-0 px-8 py-6 flex flex-col gap-8"
  >
    <div class="flex items-center gap-4">
      <img class="w-12 rounded-full" src="@/assets/Headshot.jpg" />
      <h2>Chris Jol</h2>
    </div>

    <button
      class="p-3 flex justify-center items-center gap-2 text-purple bg-transparent border border-purple rounded-lg transition-colors cursor-pointer hover-bg-purple hover-text-white"
      @click.prevent="createEvent"
    >
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
        />
      </svg>
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
