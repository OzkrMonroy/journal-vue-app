import { shallowMount } from "@vue/test-utils";
import AboutView from "@/views/AboutView";

describe("AboutView tests", () => {
  test("should render correctly", () => {
    const wrapper = shallowMount(AboutView);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
