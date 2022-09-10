import { computed } from "vue";
import { useStore } from "vuex";

const useAuth = () => {
  const store = useStore();

  const createUser = async (user) => {
    const resp = await store.dispatch("auth/createUser", user);
    return resp;
  };

  const loginUser = async (credentials) => {
    const resp = await store.dispatch("auth/loginUser", credentials);
    return resp;
  };

  const checkAuthStatus = async () => {
    const resp = await store.dispatch("auth/checkAuthentication");
    return resp;
  };

  const logout = () => {
    store.dispatch("auth/logout");
    store.dispatch("journal/clearEntries");
  };

  return {
    authStatus: computed(() => store.getters["auth/currentState"]),
    checkAuthStatus,
    createUser,
    loginUser,
    logout,
    userName: computed(() => store.getters["auth/currentUserName"]),
  };
};

export default useAuth;
