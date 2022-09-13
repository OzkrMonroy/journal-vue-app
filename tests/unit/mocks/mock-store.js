import authStateModule from "@/modules/auth/store/auth";
import journalStateModule from "@/modules/daybook/store/journal";
import { createStore } from "vuex";
import { journalState } from "./test-journal-state";

const createVuexStore = (authInitState, journalInitState = journalState) =>
  createStore({
    modules: {
      auth: {
        ...authStateModule,
        state: { ...authInitState },
      },
      journal: {
        ...journalStateModule,
        state: { ...journalInitState },
      },
    },
  });

  export default createVuexStore
