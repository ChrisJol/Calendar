<template>
  <div id="app" class="w-full h-screen flex">
    <sidebar />
    <div class="w-full flex flex-col">
      <nav-bar />
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { mapGetters } from "vuex";
import Sidebar from "@/components/Sidebar.vue";
import NavBar from "@/components/NavBar.vue";
import MonthView from "@/components/Calendar/MonthView.vue";
import DayView from "@/components/Calendar/DayView.vue";

export default Vue.extend({
  name: "app",

  components: { Sidebar, NavBar },

  computed: {
    ...mapGetters(["getView"]),

    currentComponent(): VueConstructor {
      return this.getView === "month" ? MonthView : DayView;
    },
  },
});
</script>
