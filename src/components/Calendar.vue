<template>
  <div class="w-full flex flex-col gap-2 p-4">
    <div
      class="w-max flex gap-4 items-center bg-purple rounded p-2 text-white"
      v-for="timeslot in getTimeSlots"
      :key="timeslot.id"
    >
      <p>{{ timeslot.activityName }}</p>
      <div @click="onDelete(timeslot.id)" class="cursor-pointer">
        <mdicon name="Delete" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";
import { MutationType } from "@/store";

export default Vue.extend({
  name: "calendar",

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
