import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";

import { journalState } from "../../../mocks/test-journal-state";
import EntryList from "@/modules/daybook/components/EntryList.vue";
import journalStateModule from "@/modules/daybook/store/journal";

describe("Tests for EntryList component", () => {
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
  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper = shallowMount(EntryList, {
    global: {
      mocks: {
        $router: mockRouter,
      },
      plugins: [store],
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryList, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test("should call getEntriesByTerm without any params and display two entry", () => {
    expect(wrapper.findAll("entry-item-stub").length).toBe(2);
  });

  test("should call getEntriesByTerm to filter the entries", async () => {
    const input = wrapper.find("input");
    await input.setValue("react");

    expect(wrapper.findAll("entry-item-stub").length).toBe(1);
  });

  test("should redirect to /new when the user click the button to create a new entry", () => {
    wrapper.find("button").trigger("click");

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: "new" },
    });
  });
});
