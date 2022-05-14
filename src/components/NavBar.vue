<template>
  <div class="w-full border-b border-steel p-4 flex gap-4 items-center">
    <h2 class="text-purple">May 2022</h2>
    <div class="flex gap-1 text-purple">
      <mdicon name="chevronLeft" size="30" class="cursor-pointer" />
      <mdicon name="chevronRight" size="30" class="cursor-pointer" />
    </div>
    <button
      class="bg-transparent border text-purple px-8 py-2 border-purple rounded focus-outline-none hover-bg-purple hover-text-white cursor-pointer transition-colors rounded-md"
    >
      Today
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "nav-bar",
});
</script>
