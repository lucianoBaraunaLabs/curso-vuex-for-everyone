<template>
    <div>
        <h1>Product List</h1>
        <img
          v-if="loading"
          src="https://i.imgur.com/JfPpwOA.gif"
        >
        <ul v-else>
            <li v-for="product in products" :key="product.id">
                {{ product.title }} - {{ product.price }}
                <button @click="addProductToCart"></button>
            </li>
        </ul>
    </div>
</template>

<script>

// import store from '@/store/index' removemos o import daqui e colocamos ele globalemnte no main.js

export default {
  data () {
    // como temos agora os produtos globalmente na store não precisamos mais de para o caso de products
    return {
      loading: false
      // products: []
    }
  },
  computed: {
    products () {
      // return store.state.products // aqui estamos pegando o state global sem o getter
      // return store.getters.availableProducts // chamada do store no import
      return this.$store.getters.availableProducts
    }
  },

  methods: {
    addProductToCart (product) {
      this.$store.dispatch('addProductToCart')
    }
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
    this.$store.dispatch('fetchProducts').then(() => { this.loading = false })
  }
}
</script>

<style scoped>

</style>
