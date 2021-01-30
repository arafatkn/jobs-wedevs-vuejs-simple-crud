<template>
  <div id="authbody">
    <nuxt />
  </div>
</template>

<script>
export default {
  key (route) {
    return route.fullPath
  },
}
</script>