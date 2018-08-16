import shop from '@/api/shop'

export default {
  // Quando o módulo é registrado, todos os getters, ações e mutações
  // serão automaticamente namespaced com base no caminho no qual o módulo
  // está registrado
  namespaced: true,

  state: {
    // products: [] // para não ficar this.$state.products.products renomeamos
    // os itens aqui dentro para items
    items: []
  },

  getters: {
    availableProducts (state, getters) {
      return state.items.filter(product => product.inventory > 0)
    },

    productIsInStock () {
      return (product) => {
        return product.inventory > 0
      }
    }

  },

  mutations: {
    setProducts (state, products) {
      state.items = products
    },

    decrementProductInventory (state, product) {
      product.inventory--
    }

  },

  actions: {
    fetchProducts ({commit}) {
      console.log('ola dentro da actions')

      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    }
  }

}
