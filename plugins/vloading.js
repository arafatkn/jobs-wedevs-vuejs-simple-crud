export default ({ app, store }, inject) => {
  inject('vloading', {
    start () {
      store.commit('vloading/startLoading')
    },

    stop () {
      store.commit('vloading/stopLoading')
    },

    state () {
      return store.state.vloading.count
    },

    cancel () {
      store.commit('vloading/cancelLoading')
    },
  })
}