export default {
  name: "daybook",
  component: () =>
    import(
      /* webpackChunkName: "daybook" */ "@/modules/daybook/layout/DayBookLayout.vue"
    ),
  children: [],
};
