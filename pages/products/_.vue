<template>
  <div>
    <div class="heading">
      <div class="heading-title">
        Edit Product<span v-if="product"> / {{ product.title }}</span>
        <nuxt-link to="/"><button style="float:right" class="btn btn-add">Back to All Products</button></nuxt-link>
      </div>
    </div>
    <div class="form-container">
        <div class="row">
          <div class="col-25">
              <label for="title">Product Title</label>
          </div>
          <div class="col-75">
              <input type="text" v-model="product.title" placeholder="Product Title..">
          </div>
        </div>
        <div class="row">
          <div class="col-25">
              <label for="price">Product Price</label>
          </div>
          <div class="col-75">
              <input type="number" v-model="product.price" placeholder="Product Price..">
          </div>
        </div>
        <div class="row">
          <div class="col-25">
              <label for="image">Product Image</label>
          </div>
          <div class="col-75">
              <input type="file" id="addproduct_image" ref="image" accept="image/*" placeholder="Product Image.." @change="showPreview()">
              <br/>
              <img v-if="image_preview" :src="image_preview" width="150" />
              <img v-else :src="product.image" width="150" />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
              <label for="subject">Product Description</label>
          </div>
          <div class="col-75">
              <textarea v-model="product.description" placeholder="Write description.." style="height:200px"></textarea>
          </div>
        </div>
        <div class="row">
          <input type="submit" value="Save Product" @click="saveProduct">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'user',

  data: () => ({
    product: {},
    image_preview: '',
    image: '',
  }),

  methods: {
    showPreview() {
      this.image_preview = URL.createObjectURL(this.$refs.image.files[0])
    },

    async loadData() {
      this.$vloading.start()
      await this.$axios.$get('/user/products/'+this.$route.params.pathMatch)
                .then((response) => {
                  this.product = response.data
                })
                .catch(error => {
                  if(error.response.status == 404)
                    this.$router.push('/errors/404')
                  else if(error.response.status == 401)
                    this.$router.push('/login')
                  else if(error.response.status==422)
                    this.$toast.error( this.$func.errorsAsText(error.response.data.errors) );
                  else
                    this.$toast.error(error.response.data.message)
                })
                .finally(() => (this.$vloading.stop()))
    },

    async saveProduct() {
      if(!this.product.title) {
        this.$toast.error("Product Title can not be empty");
        return;
      }
      if(!this.product.price) {
        this.$toast.error("Product Price can not be empty");
        return;
      }
      if(!this.product.description) {
        this.$toast.error("Product Description can not be empty");
        return;
      }

      console.log("Adding new product...")
      this.$vloading.start()
      let fd = this.$func.obj2formdata(this.product)
      if(this.$refs.image.files[0])
        fd.append('image', this.$refs.image.files[0])
      else
        fd.append('image', '')
      fd.append('_method', 'PUT')
      await this.$axios.$post('/user/products/'+this.product.id, fd)
                .then((response) => {
                  this.$toast.success(response.message)
                })
                .catch(error => {
                  if(error.response.status == 404)
                    this.$router.push('/errors/404')
                  else if(error.response.status == 401)
                    this.$router.push('/login')
                  else if(error.response.status==422)
                    this.$toast.error( this.$func.errorsAsText(error.response.data.errors) );
                  else
                    this.$toast.error(error.response.data.message)
                })
                .finally(() => (this.$vloading.stop()))
    }
  },

  created() {
    this.loadData()
  },

  head: {
    title: "Edit Product"
  }
}
</script>