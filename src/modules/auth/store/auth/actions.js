import authApi from "@/api/authApi";

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;
  try {
    const { data } = await authApi.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });
    const { idToken, refreshToken } = data;

    await authApi.post(":update", { idToken, displayName: name });
    commit("loginUser", { user: { name, email }, idToken, refreshToken });
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

export const loginUser = async ({ commit }, credentials) => {
  const { email, password } = credentials;

  try {
    const { data } = await authApi.post(":signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });
    const { idToken, refreshToken, displayName } = data;
    commit("loginUser", {
      user: { email, name: displayName },
      idToken,
      refreshToken,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};
