<template>
  <div class="auth-container">
    <div class="auth-form-container sign-in-container">
      <div class="auth-form">
        <h1>Sign in</h1>
        <span>or use your account</span>
        <input type="email" v-model="user.email" placeholder="Email" />
        <input type="password" v-model="user.password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button @click="epLogin">Sign In</button>
      </div>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your email and start journey with us</p>
          <nuxt-link to="/register"><button class="ghost">Sign Up</button></nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  key (route) {
    return route.fullPath
  },
  layout: 'auth',
  data: () => ({
    user: {email:'', password: ''},
  }),

  methods: {
    
    ...mapActions({
      login: 'auth/login',
    }),

    epLogin() {
      if(!this.user.email) {
        this.$toast.error("Email can not be empty");
        return;
      }
      if(!this.user.password) {
        this.$toast.error("Password can not be empty");
        return;
      }

      console.log('Try logging in vai OTP')
      this.$vloading.start()
      this.$axios.$post('/auth/login', this.user)
        .then((response) => {
          this.$toast.success(response.message)
          this.login({user:response.user, token:response.token})
          this.$axios.setHeader('Authorization', 'Bearer '+response.token)
          this.$func.sleep(1000).then(()=>{
            if(this.$route.query.redir)
              this.$router.push(this.$route.query.redir)
            else
              this.$router.push('/')
          })
        })
        .catch(error => {
          if(error.response.status==422) {
            Object.values(error.response.data.errors).forEach(error => {
              error.forEach(text => this.$toast.error(text))
            })
            //this.$toast.error( this.$func.errorsAsText(error.response.data.errors) );
          } else {
            this.$toast.error(error.response.data.message)
          }
        })
        .finally(() => (this.$vloading.stop()))
    }
  },

  head: {
    title: 'User Login'
  }
}
</script>
