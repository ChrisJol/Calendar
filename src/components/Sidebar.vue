<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <mdicon name="calendarBlank" size="30" />
      <h1>Calendy</h1>
    </div>

    <button class="sidebar-cta" @click="createEvent">
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
    }
  }
});
</script>

<style>
.sidebar {
  width: 300px;
  flex-shrink: 0;

  padding: 1.5rem 2rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  border-right: 1px solid #dddfe0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sidebar-header h1 {
  margin: 0;
}

.sidebar-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: var(--purple);

  background-color: transparent;
  border: 1px solid var(--purple);
  border-radius: 0.5rem;

  transition: color 0.1s;
  cursor: pointer;
}
.sidebar-cta:hover {
  background-color: var(--purple);
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input {
  border: none;
  border: 1px solid var(--steel);
  border-radius: 3px;
  background-color: var(--steel-light);

  padding: 0.75rem;
}
</style>
