import createVuexStore from "../../../mocks/mock-store";
import authMockDefaultState from "../../../mocks/test-auth-state";

describe("Vuex - Tests for auth module", () => {
  test("Should use the initial state by default", () => {
    const store = createVuexStore({ ...authMockDefaultState() });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticating");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });

  test("Should set the user when the loginUser is called", () => {
    const store = createVuexStore({ ...authMockDefaultState() });
    const payload = {
      user: { name: "Test", email: "test@test.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    };
    store.commit("auth/loginUser", payload);

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toEqual(payload.user);
    expect(idToken).toBe(payload.idToken);
    expect(refreshToken).toBe(payload.refreshToken);
  });

  test("Should reset the values when logout is called", () => {
    const store = createVuexStore({
      user: { name: "Test", email: "test@test.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    });

    localStorage.setItem("idToken", "ABC-123");
    localStorage.setItem("refreshToken", "XYZ-123");

    store.commit("auth/logout");
    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("not-authenticated");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
    expect(localStorage.getItem("idToken")).toBeFalsy();
    expect(localStorage.getItem("refreshToken")).toBeFalsy();
  });

  test("Should return the correct data when the getters are called.", () => {
    const store = createVuexStore({
      status: "authenticated",
      user: { name: "Test", email: "test@test.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    });

    expect(store.getters["auth/currentState"]).toBe("authenticated");
    expect(store.getters["auth/currentUserName"]).toBe("Test");
  });

  test('Should return a message with EMAIL_EXITS when createUser is called with a existing user is send', async () => {
    const store = createVuexStore({
        status: "not-authenticated",
        user: null,
        idToken: null,
        refreshToken: null,
      });

      const newUser = { name: "Test", email: "test@test.com", password: '123456' }
      const resp = await store.dispatch('auth/createUser', newUser)
      expect(resp).toEqual({ ok: false, message: 'EMAIL_EXISTS' })

      const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("not-authenticated");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  })
});
