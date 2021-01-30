export const state = () => ({
  count: 0,
})

export const getters = {
  loading: state => state.count,
  loading_state: state => state.count>0?true:false,
}

export const mutations = {
  startLoading (state) {
    state.count ++;
  },

  stopLoading (state) {
    state.count --;
  },

  cancelLoading (state) {
    state.count = 0;
  }
}