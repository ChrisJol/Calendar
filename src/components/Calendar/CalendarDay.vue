<template>
  <div class="w-full h-sixth bg-white flex justify-center items-start">
    <p
      class="p-2 rounded-full w-8 h-8 flex items-center justify-center mt-1"
      :class="{ 'bg-purple text-white': today }"
    >
      {{ day }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "calendar-day",

  props: {
    day: Number,
  },

  computed: {
    ...mapGetters(["getDisplayMonth"]),

    today(): boolean {
      const today = new Date();
      const displayDate = new Date(2022, this.getDisplayMonth - 1, this.day);
      return today.toDateString() === displayDate.toDateString();
    },
  },
});
</script>
