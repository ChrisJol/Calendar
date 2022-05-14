<template>
  <div class="w-full h-sixth bg-white flex justify-center p-2">
    <p>{{ day }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "calendar-day",

  props: {
    day: Number,
  },
});
</script>
