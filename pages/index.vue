<template>
  <div>
    <div class="heading">
      <div class="heading-title">
        Products 
        <nuxt-link to="/products/add"><button style="float:right" class="btn btn-add">Add New Product</button></nuxt-link>
      </div>
    </div>
    <div v-if="products.length" class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td><img :src="item.image" width="100" /></td>
            <td>{{ item.title }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.description }}</td>
            <td>
              <nuxt-link :to="`/products/`+item.id"><button class="btn btn-edit">Edit</button></nuxt-link>
              <button class="btn btn-edit" @click="deletable=item.id">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <br/>

      <pagination :meta="meta" />
    </div>
    <div v-else-if="$vloading.state()">
      <h4>Loading Products...</h4>
    </div>
    <div v-else>
      <h4>No Products Found</h4>
    </div>
    <div class="modal" v-if="deletable">
      <div class="modal-content">
        <span class="close" @click="deletable=false">&times;</span>
        <p>Do you sure want to delete this item?</p>
        <br/>
        <p>
          <button class="btn btn-info" @click="deletable=false">No</button>
          <button class="btn" @click="deleteProduct(deletable)">Yes, Delete</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '~/components/Pagination.vue'
export default {
  components: { Pagination },
  layout: 'user',

  data: () => ({
    products: [],
    meta: {},
    product: {},
    deletable: 0,
  }),

  watch: {
    '$route.query': function() {
      this.loadProducts();
    }
  },

  methods: {
    async loadProducts() {
      console.log("Loading Products")
      this.$vloading.start()
      //let temp = await this.$axios.$get('/user/products')
      await this.$axios.$get('/user/products?per_page=5&'+this.$func.queryString(this.$route.query))
                .then((response) => {
                  this.products = response.data
                  this.meta = response.meta
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
      //this.products = temp.data
      //this.meta = temp.meta
      //this.$vloading.stop()
    },

    async deleteProduct(id) {
      console.log("Deleting Product")
      this.$vloading.start()
      await this.$axios.$delete('/user/products/'+id)
                .then((response) => {
                  this.$toast.success(response.message)
                  this.deletable = false
                  this.loadProducts()
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

  mounted() {
    this.loadProducts()
  }
}
</script>