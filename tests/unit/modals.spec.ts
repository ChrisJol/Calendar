import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import Vuex from "vuex";
import NewEventModal from "@/components/NewEventModal.vue";
import UpdateTimeslotModal from "@/components/UpdateTimeslotModal.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let mutations: any;
let store: any;

beforeEach(() => {
  mutations = {
    AddTimeSlot: jest.fn(),
    DeleteTimeSlot: jest.fn(),
    UpdateTimeSlot: jest.fn(),
  };
  store = new Vuex.Store({
    mutations,
  });
});

describe("Given the new event modal", () => {
  describe("When the 'lets go' button is clicked", () => {
    it("AddTimeSlot mutation is dispatched", async () => {
      const wrapper = shallowMount(NewEventModal, { store, localVue });
      await wrapper.find("button").trigger("click");

      expect(mutations.AddTimeSlot).toHaveBeenCalled();
    });
  });
});

describe("Given the update timeslot modal", () => {
  let wrapper: Wrapper<InstanceType<typeof UpdateTimeslotModal>, Element>;
  const timeslot = {
    activityName: "Test",
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    numMaxGuests: 10,
    id: 0,
    overlapId: 0,
    position: 0,
  };

  beforeEach(() => {
    wrapper = shallowMount(UpdateTimeslotModal, {
      store,
      localVue,
      propsData: {
        timeslot: timeslot,
      },
    });
  });

  describe("When the delete button is pressed", () => {
    it("DeleteTimeSlot mutation is dispatched", async () => {
      await wrapper.find("#delete-button").trigger("click");
      expect(mutations.DeleteTimeSlot).toHaveBeenCalled();
    });
  });

  describe("When the update button is pressed", () => {
    it("UpdateTimeSlot mutation is dispatched", async () => {
      await wrapper.find("#update-button").trigger("click");
      expect(mutations.UpdateTimeSlot).toHaveBeenCalled();
    });
  });
});
