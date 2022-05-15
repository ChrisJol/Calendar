import Vue from "vue";
import Vuex from "vuex";
import { iTimeSlot, setPositions, uniqueID } from "@/lib/utils";
import { areIntervalsOverlapping } from "date-fns";

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
    view: window.localStorage.getItem("view") || "day",
    displayMonth: new Date().getMonth(),
    displayDay: new Date().getDate(),
  },

  mutations: {
    AddTimeSlot(state: BaseStateData, payload: iTimeSlot) {
      payload.overlapId = uniqueID();
      state.timeSlots.map((timeslot) => {
        if (
          areIntervalsOverlapping(
            { start: payload.startTime, end: payload.endTime },
            { start: timeslot.startTime, end: timeslot.endTime }
          )
        ) {
          payload.overlapId = timeslot.overlapId;
        }
      });
      state.timeSlots.push(payload);
      setPositions(
        state.timeSlots.filter((slot) => slot.overlapId === payload.overlapId)
      );
    },

    DeleteTimeSlot(state: BaseStateData, payload: iTimeSlot) {
      state.timeSlots = state.timeSlots.filter(
        (timeslot) => timeslot.id !== payload.id
      );
      setPositions(
        state.timeSlots.filter((slot) => slot.overlapId === payload.overlapId)
      );
    },

    UpdateTimeSlot(state: BaseStateData, payload: iTimeSlot) {
      state.timeSlots.map((timeslot) => {
        if (timeslot.id === payload.id) {
          Object.assign(timeslot, payload);
        }
      });
    },

    SetDisplayMonth(state: BaseStateData, payload: number) {
      state.displayMonth = payload;
    },

    SetDisplayDay(state: BaseStateData, payload: number) {
      state.displayDay = payload;
    },

    SetView(state: BaseStateData, payload: string) {
      if (state.view === payload) return;
      window.localStorage.setItem("view", payload);
      state.view = payload;
    },
  },

  actions: {
    updateTimeslot({ commit }: { commit: any }, payload: iTimeSlot) {
      commit("DeleteTimeSlot", payload);
      commit("AddTimeSlot", payload);
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
    },

    getNumOverlapping:
      ({ timeSlots }: { timeSlots: iTimeSlot[] }) =>
      (overlapId: number): number => {
        return timeSlots.filter((timeslot) => {
          return timeslot.overlapId === overlapId;
        }).length;
      },
  },

  modules: {},
});
