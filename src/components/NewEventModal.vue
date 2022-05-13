<template>
  <div class="event"></div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "new-event-modal",
});
</script>

<style>
.event {
  width: 600px;
  height: 600px;
  border-radius: 0.5rem;
  background-color: var(--purple);
}
</style>
