// export const myMutation = (state) => {

// }
export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};
export const updateEntry = (state, updatedEntry) => {
  state.entries = state.entries.map((entry) =>
    entry.id === updatedEntry.id ? updatedEntry : entry
  );
};
export const addEntry = (/*state*/) => {};
