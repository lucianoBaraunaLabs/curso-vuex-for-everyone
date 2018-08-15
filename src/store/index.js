import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'
import { Promise } from 'core-js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // = data
    products: []
  },
  getters: { // = Computed properties
    // Getter são muito bons para criar calculos ou filtros e são similares as computed properties.
    // productCount () {

    // },
    // state = parametro para acessar o state
    // getters = parametro que diz tudo que existes em getters
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    }
  },
  actions: { // = methods
    // context = exponhe os métodos do vuex
    fetchProducts ({commit}) {
      // make the call
      // call setProducts mutation
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    }
  },
  mutations: {
    // responsável pela atualização dos dados na store.
    // state = parametro para acessar o state
    // payload = é o que queremos atualizar.
    setProducts (state, products) {
      // update products state
      state.products = products
    }
  }
})
