export const currentState = (state) => {
  return state.status;
};
export const currentUserName = (state) => {
  return state.user?.name || "";
};
