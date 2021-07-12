import { computed, reactive } from "vue";
import { removeCookie } from "@/services/CookieService";
import { doLogin, doLogout } from "@/services/LoginService";

const state = reactive({
    user: '',
    error: ''
});

const getters = reactive({
    isLoggedIn: computed(() => state.user)
})

const actions = {
    async login(username: string, password: string) {
      try {
        const response = await doLogin(username, password)
        if (response.user == null) {
          state.error = 'Could not find user.'
          return false
        }
        state.user = response.user
        
        return true
      } catch (error) {
          state.error = error.response.data.errors
          console.log(state.error)
      }
    },
    async logout() {
      const response = await doLogout();
      await removeCookie('access_token');
      state.user = ''

      return true;
    }

  }

  export default { state, getters, ...actions}