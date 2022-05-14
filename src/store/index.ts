import Vue from "vue";
import Vuex from "vuex";
import { iTimeSlot } from "@/lib/utils";

Vue.use(Vuex);

export enum MutationType {
  AddTimeSlot = "AddTimeSlot",
  DeleteTimeSlot = "DeleteTimeSlot",
  UpdateTimeSlot = "UpdateTimeSlot",
}

declare interface BaseStateData {
  timeSlots: iTimeSlot[];
}

export default new Vuex.Store({
  state: {
    timeSlots: [] as iTimeSlot[],
  },

  mutations: {
    [MutationType.AddTimeSlot](state: BaseStateData, payload: iTimeSlot) {
      if (state.timeSlots.find((timeslot) => timeslot.id === payload.id)) {
        return;
      }
      state.timeSlots.push(payload);
    },

    [MutationType.DeleteTimeSlot](state: BaseStateData, payload: number) {
      state.timeSlots = state.timeSlots.filter(
        (timeslot) => timeslot.id !== payload
      );
    },
  },

  getters: {
    getTimeSlots: ({ timeSlots }: { timeSlots: iTimeSlot[] }): iTimeSlot[] => {
      return timeSlots;
    },
  },

  modules: {},
});
