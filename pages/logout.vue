<template>
  <div class="heading">
    <div class="heading-title">{{ message }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: 'user',

  data() {
    return {
      message: 'You are being logging out...'
    }
  },

  methods: {
    
    ...mapActions({
      local_logout: 'auth/logout',
    }),

    async logout() {
      this.$vloading.start()
      await this.$axios.$delete('/auth/logout')
                .then((response) => {
                  this.$toast.success(response.message)
                  this.message = response.message
                  setTimeout(()=>{
                    this.$router.push('/login')
                  }, 2000)
                })
                .catch(error => {
                  if(error.response.status == 404)
                    this.$router.push('/errors/404')
                  else if(error.response.status == 401)
                    this.$router.push('/login')
                  else
                    this.$toast.error(error.response.data.message)
                })
                .finally(() => (this.$vloading.stop()))
    }
  },

  created () {
    this.logout()
  }
}
</script>