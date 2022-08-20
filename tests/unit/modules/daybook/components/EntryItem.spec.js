import { shallowMount } from "@vue/test-utils";
import EntryItem from "@/modules/daybook/components/EntryItem.vue";
import { journalState } from "../../../mocks/test-journal-state";

describe("Tests for EntryItem component", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const entry = journalState.entries[0];
  const wrapper = shallowMount(EntryItem, {
    props: {
      entry,
    },
    global: {
      mocks: {
        $router: mockRouter,
      },
    },
  });

  test("should render the component correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should redirect when the user click in the entry-container", () => {
    wrapper.find(".entry-container").trigger("click");

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: entry.id },
    });
  });

  test("should return the date data correctly", () => {
    expect(wrapper.vm.entryDay.toString()).toBe("6");
    expect(wrapper.vm.entryMonth).toBe("agosto");
    expect(wrapper.vm.entryYear).toBe("2022 sábado");
  });
});
