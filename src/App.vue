<template>
  <nav v-if="userStore.getters.isLoggedIn" class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ userStore.state.user.full_name }}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link tag="a" class="nav-link" to="/users">Users</router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" to="/roles">Roles</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ">
          <li class="nav-item">
            <a @click="logout()" class="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container my-4">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import userStore from '@/stores/user';
import router from './router';
import { getCookie } from './services/CookieService';

export default defineComponent({
  setup() {
    const logout = async () => {
      const response = await userStore.logout()
      if (response) {
        router.push('/')
      }
    }
    
    return { userStore, logout }
  },
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
