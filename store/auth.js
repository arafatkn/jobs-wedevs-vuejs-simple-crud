export const state = () => ({
    user: {},
    token: ''
  })
  
export const getters = {

  user: state => {
    if(!getters.is_logged)
      return false
    return state.user
  },
  token: state => state.token,
  itemInCart: state => pid => state.items.findIndex(i => i.id == pid) >= 0,
  is_logged: state => {
    if(state.token && state.user)
      return true
    if(localStorage.token && localStorage.user) {
      return true
    }
    return false
  },
}

export const actions = {

  login({ commit }, {user, token}) {
    commit('SET_LOGIN', {user, token})
  },

  logout({ commit }) {
    commit('REMOVE_LOGIN')
  },

  load({ commit }) {
    if(localStorage.token && localStorage.user) {
      let token = localStorage.token
      let user = JSON.parse(localStorage.user)
      commit('SET_LOGIN', {user, token})
    }
  }
}

export const mutations = {

  SET_LOGIN(state, {user, token}) {
    console.log(token)
    state.user = user
    state.token = token
    localStorage.user = JSON.stringify(user)
    localStorage.token = token
  },

  REMOVE_LOGIN(state) {
    state.user = {}
    state.token = ""
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  },
}
    