<template>
  <div>
    <div class="heading">
      <div class="heading-title">
        Add New Product
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
          <input type="submit" value="Add Product" @click="addProduct">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'user',

  data: () => ({
    default_product: {
      title: '',
      price: '',
      description: '',
    },
    product: {},
    image_preview: '',
    image: '',
  }),

  methods: {
    showPreview() {
      this.image_preview = URL.createObjectURL(this.$refs.image.files[0])
    },

    async addProduct() {
      if(!this.product.title) {
        this.$toast.error("Product Title can not be empty");
        return;
      }
      if(!this.product.price) {
        this.$toast.error("Product Price can not be empty");
        return;
      }
      if(!this.$refs.image.files[0]) {
        this.$toast.error("Product Image can not be empty");
        return;
      }
      if(!this.product.description) {
        this.$toast.error("Product Description can not be empty");
        return;
      }

      console.log("Adding new product...")
      this.$vloading.start()
      let fd = this.$func.obj2formdata(this.product)
      fd.append('image', this.$refs.image.files[0])
      await this.$axios.$post('/user/products', fd)
                .then((response) => {
                  this.$toast.success(response.message)
                  this.product = Object.assign({}, this.default_product)
                  this.image = ''
                  this.image_preview = ''
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
    this.product = Object.assign({}, this.default_product)
  },

  head: {
    title: "Add New Product"
  }
}
</script>