import { defineStore } from "pinia";

interface AuthState {
  token: string | null;
  email: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: null,
    email: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setAuth(token: string, email: string) {
      this.token = token;
      this.email = email;

      const cookie = useCookie("auth_token");
      cookie.value = token;

      const emailCookie = useCookie("auth_email");
      emailCookie.value = email;
    },

    init() {
      const cookie = useCookie<string | null>("auth_token");
      const emailCookie = useCookie<string | null>("auth_email");

      this.token = cookie.value;
      this.email = emailCookie.value;
    },

    logout() {
      this.token = null;
      this.email = null;

      const cookie = useCookie("auth_token");
      const emailCookie = useCookie("auth_email");

      cookie.value = null;
      emailCookie.value = null;
    },
  },
});
