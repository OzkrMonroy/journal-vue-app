import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView";

describe("HomeView tests", () => {
  test("should render correctly", () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should redirect when a button is clicked", () => {
    const mockRouter = {
      push: jest.fn(),
    };
    const wrapper = shallowMount(HomeView, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    wrapper.find("button").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
});
