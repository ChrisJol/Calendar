<template>
  <div id="app" class="w-full h-screen flex">
    <sidebar />
    <calendar />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Calendar from "@/components/Calendar/Calendar.vue";

export default Vue.extend({
  name: "app",

  components: { Sidebar, Calendar },
});
</script>
