<template>
  <div class="container">
    <div class="topnav" id="myTopnav">
      <nuxt-link to="/" class="active">WeDevs Products</nuxt-link>
      <nuxt-link to="/logout" style="float:right">Logout ({{ user.name }})</nuxt-link>
    </div>
    <div class="container2">
      <Nuxt />
    </div>
    <div class="overlay" v-if="loading_state">
      <div class="overlay__inner">
        <div class="overlay__content"><span class="spinner"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  middleware: 'user',

  computed: {
    ...mapGetters({
      loading_state: "vloading/loading_state",
      is_logged: "auth/is_logged",
      token: "auth/token",
      user: "auth/user"
    }),
  }, 

  methods: {
    ...mapActions({
      login: 'auth/load'
    })
  },

  created() {
    this.login()
    //let token = localStorage.getItem('token');
    //this.$axios.setHeader('Authorization', 'Bearer '+token);
    this.$axios.setHeader('Authorization', 'Bearer '+this.token);
  },

  head: {
    title: 'User Panel',
  }
}
</script>

<style scoped>
.container2 {
  background: #cef;
  padding: 10px;
}
</style>