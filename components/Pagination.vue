<template>
  <div class="center" v-if="meta.last_page>1">
    <div class="pagination">
      <nuxt-link v-if="meta.current_page>1" :to="getPageUrl(meta.current_page-1)">&laquo;</nuxt-link>
      <nuxt-link v-else :to="getPageUrl(1)">&laquo;</nuxt-link>
      <nuxt-link  v-for="i in left" :key="i" :to="getPageUrl(i+meta.current_page-left-1)">{{ meta.current_page-left+i-1 }}</nuxt-link>
      <nuxt-link class="active" to="">{{ meta.current_page }}</nuxt-link>
      <nuxt-link  v-for="i in right" :key="`r`+i" :to="getPageUrl(meta.current_page+i)">{{ meta.current_page+i }}</nuxt-link>
      <nuxt-link v-if="meta.last_page > meta.current_page" :to="getPageUrl(1+meta.current_page)">&raquo;</nuxt-link>
      <nuxt-link v-else :to="getPageUrl(meta.last_page)">&raquo;</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    props: ['meta'],

    methods: {
        getPageUrl(page) {
            let temp = JSON.stringify(this.$route.query)
            let query = JSON.parse(temp)
            query.page = page
            return '?'+this.$func.queryString(query)
        }
    },

    computed: {
        left: function() {
            let left = this.meta.current_page - 1
            return left>3?3:left;
        },

        right: function() {
            let right = this.meta.last_page - this.meta.current_page
            return right>3?3:right;
        }
    }
}
</script>