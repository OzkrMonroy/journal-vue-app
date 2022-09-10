import authStateModule from "@/modules/auth/store/auth";
import journalStateModule from "@/modules/daybook/store/journal";
import { createStore } from "vuex";

const store = createStore({
  modules: {
    auth: authStateModule,
    journal: journalStateModule,
  },
});

export default store;
