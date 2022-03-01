import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
        items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false,
    filterParams: [],
    priceSortParam: '',
    nameSortParam: '',
    priceRange: []
  },
  mutations: {
    initializeStore(state) {
      if(localStorage.getItem('filterParams')){
        state.filterParams  = localStorage.getItem('filterParams')
      }
      if(localStorage.getItem('priceSortParam')){
        state.priceSortParam  = localStorage.getItem('priceSortParam')
      }
      if(localStorage.getItem('ratingSortParam')){
        state.nameSortParam  = localStorage.getItem('nameSortParam')
      }
      if(localStorage.getItem('priceRange')){
        state.priceRange = localStorage.getItem('priceRange')
      }
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }

      if (localStorage.getItem('token')) {
          state.token = localStorage.getItem('token')
          state.isAuthenticated = true
      } else {
          state.token = ''
          state.isAuthenticated = false
      } 
    },

    getitems(state) {
      return state.cart.items
    },

    addToCart(state, item) {
      const exists = state.cart.items.filter(i => i.product.sku === item.product.sku)
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
        state.token = token
        state.isAuthenticated = true
    },  
    removeToken(state) {
        state.token = ''
        state.isAuthenticated = false
    },
    clearCart(state) {
      state.cart = { items: [] }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    saveFilter(state, filterParams){
      state.filterParams = filterParams
      localStorage.setItem('filterParams',filterParams)
    },
    savePriceSort(state, sortParam){
      state.priceSortParam = sortParam
      localStorage.setItem('priceSortParam',sortParam)
    },
    saveNameSort(state, sortParam){
      state.nameSortParam = sortParam
      localStorage.setItem('nameSortParam',sortParam)
    },
    savePriceRange(state, range){
      state.priceRange = range
      localStorage.setItem('priceRange', range)
    },
    removePriceSort(state){
      state.priceSortParam = ''
      localStorage.removeItem('priceSortParam')
    },
    removeNameSort(state){
      state.nameSortParam = ''
      localStorage.removeItem('nameSortParam')
    }
  },
  actions: {
  },
  modules: {
  }
})
