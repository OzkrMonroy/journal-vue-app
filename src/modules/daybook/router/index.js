export default {
  name: "daybook",
  component: () =>
    import(
      /* webpackChunkName: "daybook" */ "@/modules/daybook/layout/DayBookLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "no-entry",
      component: () =>
        import(
          /*webpackChunckName: "daybook-no-entry" */ "@/modules/daybook/views/NoEntrySelected.vue"
        ),
    },
  ],
};
