import shop from '@/api/shop'

export default {
  namespaced: true,

  state: {
    // {id, quantity}
    items: [],
    checkoutStatus: null
  },
  getters: {
    // Mostra os produtos que foram escolhidos
    cartProducts (state, getters, rootState) {
      return state.items.map(cartItem => {
        const product = rootState.products.items.find(
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
      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity, 0
      )
    }
  },

  mutations: {
    pushProductToCart (state, productId) {
      state.items.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },

    emptyCart (state) {
      state.items = []
    }
  },

  actions: { // = methods
    // rootState = Acessa o state global
    // rootGetters = são usados para acessar os getters fora dos módulos
    addProductToCart ({state, getters, commit, rootState, rootGetters}, product) {
      // if (getters.productIsInStock(product)) { sem namespace para acessar o getter em outro módulo
      if (rootGetters['products/productIsInStock'](product)) {
        const cartItem = state.items.find(item => item.id === product.id)
        if (!cartItem) {
        // pushProductToCart
          commit('pushProductToCart', product.id)
        } else {
        // incrementItemQuantity
          commit('incrementItemQuantity', cartItem)
        }
        // commit e dispatch pecisam de um terceiro argumento para caso as mutations
        // estejam em outro módulo com namespace. O argumento a ser passado é
        // {root: true}
        commit('products/decrementProductInventory', product, {root: true})
      }
    },

    checkout ({state, commit}) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    }
  }

}
