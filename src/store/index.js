import journalStateModule from "@/modules/daybook/store/journal";
import { createStore } from "vuex";

const store = createStore({
  modules: {
    journal: journalStateModule,
  },
});

export default store;
