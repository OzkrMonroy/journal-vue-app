import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";

import EntryView from "@/modules/daybook/views/EntryView.vue";
import journalStateModule from "@/modules/daybook/store/journal";
import { journalState } from "../../../mocks/test-journal-state";
import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe("Tests for EntryView page", () => {
  const createVuexStore = (initalState) =>
    createStore({
      modules: {
        journal: {
          ...journalStateModule,
          state: { ...initalState },
        },
      },
    });

  const store = createVuexStore(journalState);
  store.dispatch = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper = shallowMount(EntryView, {
    props: {
      id: "-N8oEYZExamW3dMgYnxR",
    },
    global: {
      mocks: {
        $router: mockRouter,
      },
      plugins: [store],
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: "-N8oEYZExamW3dMgYnxR",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test("should redirect the user when the id does not exist", () => {
    const wrapper = shallowMount(EntryView, {
      props: {
        id: "fad",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });

  test("should display the data correctly when the entry id exists", () => {
    expect(mockRouter.push).toHaveBeenCalledTimes(0);
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  test("should delete the entry and then redirect to nothing select", async () => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));

    await wrapper.find(".btn-danger").trigger("click");

    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
    expect(store.dispatch).toHaveBeenCalledWith(
      "journal/deleteEntry",
      "-N8oEYZExamW3dMgYnxR"
    );
  });
});
