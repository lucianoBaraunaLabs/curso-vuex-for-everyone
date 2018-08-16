import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

import actions from './actions'
import { Promise } from 'core-js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // = data
    products: [],
    // {id, quantity}
    cart: [],
    checkoutStatus: null
  },
  getters: { // = Computed properties
    // Getter são muito bons para criar calculos ou filtros e são similares
    // as computed properties.
    // productCount () {

    // },
    // state = parametro para acessar o state
    // getters = parametro que diz tudo que existes em getters
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
      // return state.products
    },

    // Mostra os produtos que foram escolhidos
    cartProducts (state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(
          product => product.id === cartItem.id
        )

        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    // Pegando o total dos produtos
    cartTotal (state, getters) {
      // let total = 0

      // getters.cartProducts.forEach(product => {
      //   total += product.price * product.quantity
      // })

      // return total

      // Com reduce
      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity, 0
      )
    },

    productIsInStock () {
      // higth order function

      return (product) => {
        console.log('eita porra', product)
        return product.inventory > 0
      }
    }

  },
  actions,
  mutations: {
    // responsável pela atualização dos dados na store.
    // state = parametro para acessar o state
    // payload = é o que queremos atualizar.
    setProducts (state, products) {
      // update products state
      state.products = products
    },

    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },

    decrementProductInventory (state, product) {
      product.inventory--
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },

    emptyCart (state) {
      state.cart = []
    }

  }
})
