<template>
    <div>
        <h1>Product List</h1>
        <img
          v-if="loading"
          src="https://i.imgur.com/JfPpwOA.gif"
        >
        <ul v-else>
            <li v-for="product in products" :key="product.id">
                {{ product.title }} - {{ product.price | currency }} - inventory {{ product.inventory }}
                <button
                  :disabled="!productIsInStock(product)"
                  @click="addProductToCart(product)"
                >ADICIONAR</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex' // métodos para ajudar a mapear todo o state.

export default {
  data () {
    return {
      loading: false
      // products: []
    }
  },
  
  computed: {
    ...mapState({
      // products: state => state.products.products como removemos products para items
      products: state => state.products.items
    }),

    // ...mapGetters({
    //   productIsInStock: 'productIsInStock'
    // })
    ...mapGetters('products', {
      productIsInStock: 'productIsInStock'
    })
  },

  methods: {
    // ...mapActions({
    //   fetchProducts: 'fetchProducts',
    //   addProductToCart: 'addProductToCart'
    // }),
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
      addProductToCart: 'cart/addProductToCart'
    }),

  },

  created () {
    this.loading = true
    this.fetchProducts().then(() => { this.loading = false })
  }
}
</script>

<style scoped>

</style>
