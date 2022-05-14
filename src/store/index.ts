import Vue from "vue";
import Vuex from "vuex";
import { iTimeSlot } from "@/lib/utils";

Vue.use(Vuex);

declare interface BaseStateData {
  timeSlots: iTimeSlot[];
  view: string;
  displayMonth: number;
  displayDay: number;
}

export default new Vuex.Store({
  state: {
    timeSlots: [] as iTimeSlot[],
    view: window.localStorage.getItem("view") || "month",
    displayMonth: new Date().getMonth(),
    displayDay: new Date().getDate(),
  },

  mutations: {
    AddTimeSlot(state: BaseStateData, payload: iTimeSlot) {
      if (state.timeSlots.find((timeslot) => timeslot.id === payload.id)) {
        return;
      }
      state.timeSlots.push(payload);
    },

    DeleteTimeSlot(state: BaseStateData, payload: number) {
      state.timeSlots = state.timeSlots.filter(
        (timeslot) => timeslot.id !== payload
      );
    },

    SetDisplayMonth(state: BaseStateData, payload: number) {
      state.displayMonth = payload;
    },

    SetDisplayDay(state: BaseStateData, payload: number) {
      state.displayDay = payload;
    },

    SetView(state: BaseStateData, payload: string) {
      if (state.view === payload ) return;
      window.localStorage.setItem("view", payload);
      state.view = payload;
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

    getView: ({ view }: { view: string }): string => {
      return view;
    }
  },

  modules: {},
});
