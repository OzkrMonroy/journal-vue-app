import authApi from "@/api/authApi";
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

  test("Should return a message with EMAIL_EXITS when createUser is called with a existing user is send", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: "Test",
      email: "test@test.com",
      password: "123456",
    };
    const resp = await store.dispatch("auth/createUser", newUser);
    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("not-authenticated");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });

  test("should create a new user when createUser is called", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: "Test",
      email: "test@test.com",
      password: "123456",
    };
    await store.dispatch("auth/loginUser", newUser);
    const { idToken } = store.state.auth;

    await authApi.post(`:delete`, { idToken });
    const resp = await store.dispatch("auth/createUser", newUser);

    expect(resp).toEqual({ ok: true });
    const { status, user, idToken: token, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toMatchObject({ name: "Test", email: "test@test.com" });
    expect(typeof token).toBe("string");
    expect(typeof refreshToken).toBe("string");
  });

  test("should the checkAuthentication to be positive", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    await store.dispatch("auth/loginUser", {
      email: "test@test.com",
      password: "123456",
    });
    const { idToken } = store.state.auth;
    store.commit("auth/logout");

    localStorage.setItem("idToken", idToken);
    const resp = await store.dispatch("auth/checkAuthentication");

    expect(resp).toEqual({ ok: true });
    const { status, user, idToken: token } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toMatchObject({ name: "Test", email: "test@test.com" });
    expect(typeof token).toBe("string");
  });

  test("should the checkAuthentication to be negative", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });
    localStorage.removeItem("idToken");

    const resp = await store.dispatch("auth/checkAuthentication");
    expect(resp).toEqual({ ok: false, message: "No token available" });
    expect(store.state.auth.status).toBe("not-authenticated");

    localStorage.setItem("idToken", "ABC-123");
    const resp2 = await store.dispatch("auth/checkAuthentication");
    expect(resp2).toEqual({ ok: false, message: "INVALID_ID_TOKEN" });
    expect(store.state.auth.status).toBe("not-authenticated");
  });
});
