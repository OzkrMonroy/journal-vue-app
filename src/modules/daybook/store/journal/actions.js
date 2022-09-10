// export const myAction = async ({ commit }) => {// }

import journalApi from "@/api/journalApi";

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json");

  const entries = [];
  for (let id of Object.keys(data || {})) {
    entries.push({
      id,
      ...data[id],
    });
  }
  commit("setEntries", entries);
};
export const updateEntry = async ({ commit }, entry) => {
  const { id, ...rest } = entry;
  const { data } = await journalApi.put(`/entries/${id}.json`, rest);
  commit("updateEntry", { id, ...data });
};
export const createEntry = async ({ commit }, entry) => {
  const { data } = await journalApi.post("/entries.json", entry);
  commit("addEntry", { id: data.name, ...entry });

  return data.name;
};
export const deleteEntry = async ({ commit }, id) => {
  await journalApi.delete(`/entries/${id}.json`);
  commit("deleteEntry", id);
};
