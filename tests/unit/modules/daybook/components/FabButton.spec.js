import { shallowMount } from "@vue/test-utils";
import FabButton from "@/modules/daybook/components/FabButton";

describe("Tests for the FabButton", () => {
  const wrapper = shallowMount(FabButton);

  test("should render the component correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should set the fa-plus value when the icon property is not sent", () => {
    const icon = wrapper.find("i").classes("fa-plus");

    expect(icon).toBeTruthy();
  });

  test("should set the value that is sent as a property", () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        icon: "fa-delete",
      },
    });
    const icon = wrapper.find("i").classes("fa-delete");
    const defaultIcon = wrapper.find("i").classes("fa-plus");

    expect(icon).toBeTruthy();
    expect(defaultIcon).toBeFalsy();
  });

  test("should emit the on:click event when the button is clicked", () => {
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted("on:click")).toHaveLength(1);
  });
});
