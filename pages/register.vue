<template>
  <div class="auth-container right-panel-active">
    <div class="auth-form-container sign-up-container">
      <div class="auth-form">
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        <input type="text" v-model="user.name" placeholder="Name" />
        <input type="email" v-model="user.email" placeholder="Email" />
        <input type="password" v-model="user.password" placeholder="Password" />
        <input type="password" v-model="user.password_confirmation" placeholder="Password Confirmation" />
        <button @click="register">Sign Up</button>
      </div>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button class="ghost" @click="gotoLogin">Sign In</button>
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
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),

    register() {
      if(!this.user.name) {
        this.$toast.error("Name can not be empty");
        return;
      }
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
      this.$axios.$post('/auth/register', this.user)
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
            // /this.$toast.error( this.$func.errorsAsText(error.response.data.errors) );
          } else {
            this.$toast.error(error.response.data.message)
          }
        })
        .finally(() => (this.$vloading.stop()))
    },

    gotoLogin() {
      window.location.href="login"
    }
  },
  mounted() {

  },
  head: {
    title: 'User Registration'
  }
}
</script>
