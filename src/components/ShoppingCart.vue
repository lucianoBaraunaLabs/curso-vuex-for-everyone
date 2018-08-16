<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{total | currency}}</p>
    <button @click="checkout">CHECKOUT</button>
    <p v-if="checkoutStatus">{{checkoutStatus}}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    // sem parâmetro namespace
    // ...mapGetters({
    //   // products: 'cartProducts', // sem namespace
    //   // total: 'cartTotal'
    //   products: 'cart/cartProducts',
    //   total: 'cart/cartTotal'
    // }),

    // quando utilizamos namespace o primeiro argumento de map é o próprio nome
    // do namespace

    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotal'
    }),

    // ...mapState({
    //   checkoutStatus: state => state.cart.checkoutStatus
    // })
    ...mapState('cart', {
      checkoutStatus: state => state.checkoutStatus
    })
  },
  methods: {
    // ...mapActions(['checkout'])
    ...mapActions('cart', ['checkout'])
  }
}
</script>

<style scoped>

</style>
