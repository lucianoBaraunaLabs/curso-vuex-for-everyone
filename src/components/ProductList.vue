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
                <!-- 
                  <button
                  :disabled="!product.inventory > 0"
                  podemos tirar isso e deixar como um getter para termos uma 
                  lógica onde possa ser aplicada em diversas partes do codígo.
                 -->
                <button
                  :disabled="!productIsInStock(product)"
                  @click="addProductToCart(product)"
                >ADICIONAR</button>
            </li>
        </ul>
    </div>
</template>

<script>

// import store from '@/store/index' removemos o import daqui e colocamos ele globalemnte no main.js
import { mapState, mapGetters, mapActions } from 'vuex' // métodos para ajudar a mapear todo o state.

export default {
  data () {
    // como temos agora os produtos globalmente na store não precisamos mais de para o caso de products
    return {
      loading: false
      // products: []
    }
  },
  // sem map state
  // computed: {
  //   products () {
  //     // return store.state.products // aqui estamos pegando o state global sem o getter
  //     // return store.getters.availableProducts // chamada do store no import
  //     // this.$store.getters.availableProducts Removemos essa lista para
  //     // conseguirmos colocar o botão de checkout desabilitado.
  //     // return this.$store.getters.availableProducts
  //     return this.$store.state.products
  //   },

  //   productIsInStock () {
  //     return this.$store.getters.productIsInStock
  //   }
  // },

  // no mapstate podemos passar a função de algumas formas
  computed: {
    ...mapState({
      // products: state => state.products
      products: 'products'
    }),

    ...mapGetters({
      productIsInStock: 'productIsInStock'
    })
  },

  methods: {
    // addProductToCart (product) {
    //   this.$store.dispatch('addProductToCart', product)
    // }

    ...mapActions({
      fetchProducts: 'fetchProducts',
      addProductToCart: 'addProductToCart'
    }),

  },

  created () {
    // Sem vuex
    // shop.getProducts(products => {
    //   // this.products = products // sem vuex
    //   // store.state.products = products // nunca podemos alterar o state sem chamar uma mutation.

    //   // 1 argumento é o nome da mutation
    //   // 2 é o payload para ser usado na alteração
    //   store.commit('setProducts', products)
    // })
    //
    this.loading = true
    // this.$store.dispatch('fetchProducts').then(() => { this.loading = false })
    this.fetchProducts().then(() => { this.loading = false })
  }
}
</script>

<style scoped>

</style>
