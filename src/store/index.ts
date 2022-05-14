import Vue from "vue";
import Vuex from "vuex";
import { iTimeSlot } from "@/lib/utils";

Vue.use(Vuex);

export enum MutationType {
  AddTimeSlot = "AddTimeSlot",
  DeleteTimeSlot = "DeleteTimeSlot",
  UpdateTimeSlot = "UpdateTimeSlot",
  SetDisplayMonth = "SetDisplayMonth",
  SetDisplayDay = "SetDisplayDay",
}

declare interface BaseStateData {
  timeSlots: iTimeSlot[];
  displayMonth: number;
  displayDay: number;
}

export default new Vuex.Store({
  state: {
    timeSlots: [] as iTimeSlot[],
    displayMonth: new Date().getMonth(),
    displayDay: new Date().getDate(),
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

    [MutationType.SetDisplayMonth](state: BaseStateData, payload: number) {
      state.displayMonth = payload;
    },

    [MutationType.SetDisplayDay](state: BaseStateData, payload: number) {
      state.displayDay = payload;
    },
  },

  getters: {
    getTimeSlots: ({ timeSlots }: { timeSlots: iTimeSlot[] }): iTimeSlot[] => {
      return timeSlots;
    },

    getDisplayMonth: ({ displayMonth }: { displayMonth: number }): number => {
      return displayMonth;
    },

    getDisplayDay: ({ displayDay }: { displayDay: number }): number => {
      return displayDay;
    },
  },

  modules: {},
});
