import shop from '@/api/shop'

export default { // = methods
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
  },

  addProductToCart ({state, getters, commit}, product) {
    // aqui entra a lógica
    // find cartItem
    if (getters.productIsInStock(product)) {
      const cartItem = state.cart.find(item => item.id === product.id)
      if (!cartItem) {
        // pushProductToCart
        commit('pushProductToCart', product.id)
      } else {
        // incrementItemQuantity
        commit('incrementItemQuantity', cartItem)
      }
      commit('decrementProductInventory', product)
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
