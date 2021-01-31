<template>
  <div id="authbody">
    <nuxt />
    <div class="loverlay" v-if="loading_state">
      <div class="overlay__inner">
        <div class="overlay__content"><span class="spinner"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  key (route) {
    return route.fullPath
  },

  computed: {
    ...mapGetters({
      loading_state: "vloading/loading_state",
    }),
  },
}
</script>