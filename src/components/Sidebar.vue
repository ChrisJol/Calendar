<template>
  <div class="form">
    <h2>Schedule a new Timeslot!</h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "sidebar",
});
</script>

<style>
.form {
  width: 400px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
