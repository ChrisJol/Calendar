<template>
  <div class="w-full flex flex-col">
    <nav-bar />
    <div class="grid grid-cols-7 grid-rows-5 gap-px bg-steel pb-px">
      <calendar-day v-for="day in 31" :key="day" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";
import { MutationType } from "@/store";
import NavBar from "@/components/NavBar.vue";
import CalendarDay from "./CalendarDay.vue";

export default Vue.extend({
  name: "calendar",

  components: { NavBar, CalendarDay, },

  computed: {
    ...mapGetters(["getTimeSlots"]),
  },

  methods: {
    ...mapMutations([MutationType.DeleteTimeSlot]),

    onDelete(id: string): void {
      this[MutationType.DeleteTimeSlot](id);
    },
  },
});
</script>
