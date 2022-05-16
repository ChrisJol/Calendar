<template>
  <div class="rounded-lg bg-purple shadow-purple text-white p-4 w-96">
    <h1 class="pb-4">Disclaimer</h1>
    <p>
      I began working on this page and then quickly realized that this was not
      part of the requirements so I stopped. It's not a complete feature but I
      thought I would keep it because I think it looks nice haha
    </p>
    <div
      @click="$emit('closed')"
      class="rounded-md p-2 bg-purple-light hover-bg-white hover-text-purple cursor-pointer mt-4 flex justify-center items-center"
    >
      Close
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "disclaimer",
});
</script>
