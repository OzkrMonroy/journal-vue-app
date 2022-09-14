import journalStateModule from "@/modules/daybook/store/journal";
import { journalState } from "../../../../mocks/test-journal-state";
import { createStore } from "vuex";
import authApi from "@/api/authApi";

const createVuexStore = (initalState) =>
  createStore({
    modules: {
      journal: {
        ...journalStateModule,
        state: { ...initalState },
      },
    },
  });

describe("Vuex - Tests for Journal Module", () => {
  let store = createVuexStore(journalState);

  beforeAll(async () => {
    const { data } = await authApi.post(":signInWithPassword", {
      email: "test@test.com",
      password: "123456",
      returnSecureToken: true,
    });
    localStorage.setItem("idToken", data.idToken);
  });

  afterEach(() => {
    store = createVuexStore(journalState);
  });

  test("should set the initial state correctly", () => {
    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  // Mutations ========================
  test("should set the entries when the mutation is called", () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    store.commit("journal/setEntries", journalState.entries);

    expect(store.state.journal.entries.length).toBe(
      journalState.entries.length
    );
    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test("should update the entry when the updateEntry mutation is called", () => {
    const updatedEntry = {
      ...journalState.entries[0],
      text: "Updated from tests",
    };

    store.commit("journal/updateEntry", updatedEntry);
    const storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(journalState.entries.length);
    expect(storeEntries[0]).toEqual(updatedEntry);
  });

  test("should add a new entry when addEntry mutation is called then when the deleteEntry mutation is called that entry would be deleted", () => {
    const newEntry = {
      id: "abc",
      text: "Hola mundo",
    };
    store.commit("journal/addEntry", newEntry);

    expect(store.state.journal.entries.length).toBe(3);
    expect(
      store.state.journal.entries.find((e) => e.id === newEntry.id)
    ).toBeTruthy();

    store.commit("journal/deleteEntry", newEntry.id);

    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((e) => e.id === newEntry.id)
    ).toBeFalsy();
  });

  //Getters ========================================
  test("should return the entries filtered when the getEntriesByTerm is called with a term and when I called the getEntryById is called that should return the correct entry.", () => {
    const [entry1, entry2] = journalState.entries;

    expect(store.getters["journal/getEntriesByTerm"]("").length).toBe(2);
    expect(store.getters["journal/getEntriesByTerm"]("react").length).toBe(1);
    expect(store.getters["journal/getEntriesByTerm"]("angular").length).toBe(0);
    expect(store.getters["journal/getEntriesByTerm"]("react")).toEqual([
      entry2,
    ]);
    expect(
      store.getters["journal/getEntryById"]("-N8oEYZExamW3dMgYnxR")
    ).toEqual(entry1);
  });

  // Actions ===============================================
  test("should load the entries from firesbase when the loadEntries action is called", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    await store.dispatch("journal/loadEntries");

    expect(store.state.journal.entries.length).toBe(1);
  });

  test("should update the entry when the updateEntry action is called", async () => {
    const updatedEntry = {
      id: "-N8oEYZExamW3dMgYnxR",
      date: 1659807596541,
      picture:
        "https://res.cloudinary.com/dxae8onmb/image/upload/v1659811017/vwvpjw5b7yb2zwk7y6wi.jpg",
      text: "Text updated from test",
    };
    await store.dispatch("journal/updateEntry", updatedEntry);

    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((e) => e.id === updatedEntry.id)
    ).toEqual(updatedEntry);
  });

  test("should create a new entry when the createEntry actio is called and an entry should delete when the deleteEntry action is called (based in the id)", async () => {
    const newEntry = { date: "1661016475835", text: "New entry from test" };
    const newId = await store.dispatch("journal/createEntry", newEntry);

    expect(typeof newId).toBe("string");
    expect(
      store.state.journal.entries.find((e) => e.id === newId)
    ).toBeTruthy();
    expect(store.state.journal.entries.find((e) => e.id === newId)).toEqual({
      ...newEntry,
      id: newId,
    });

    await store.dispatch("journal/deleteEntry", newId);
    expect(store.state.journal.entries.find((e) => e.id === newId)).toBeFalsy();
  });
});
