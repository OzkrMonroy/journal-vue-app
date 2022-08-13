import daybookRouter from "@/modules/daybook/router";

describe("Tests for the daybook router", () => {
  test("should have this setup", async () => {
    expect(daybookRouter).toMatchObject({
      name: "daybook",
      component: expect.any(Function),
      children: [
        {
          path: "",
          name: "no-entry",
          component: expect.any(Function),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });
    // expect((await daybookRouter.children[0].component()).default.name).toBe(
    //   "NoEntrySelected"
    // );
    // expect((await daybookRouter.children[1].component()).default.name).toBe(
    //   "EntryView"
    // );

    const promiseRoutes = [];
    daybookRouter.children.forEach((child) =>
      promiseRoutes.push(child.component())
    );
    const routes = (await Promise.all(promiseRoutes)).map(
      (route) => route.default.name
    );

    expect(routes).toContain("NoEntrySelected");
    expect(routes).toContain("EntryView");
  });

  test("should return the route id", () => {
    const route = {
      params: {
        id: "abc-123",
      },
    };
    // expect(daybookRouter.children[0].props(route)).toEqual({id: 'abc-123'})
    const entryRoute = daybookRouter.children.find((r) => r.name === "entry");
    expect(entryRoute.props(route)).toEqual(route.params);
  });
});
