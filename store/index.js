import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      addressBooks: [],
      auth: { isLoggedIn: false, error: '' }
    }),
    mutations: {
      ADD_CONTACT(state, data) {
        state.addressBooks.push(data)
      },
      DELETE_CONTACT(state, index) {
        state.addressBooks.splice(index, 1)
      },
      UPDATE_CONTACT(state, obj) {
        state.addressBooks.splice(obj.index, 1, obj.data)
      },
      UPDATE_AUTH(state, value) {
        state.auth.isLoggedIn = value
      },
      UPDATE_AUTH_ERROR(state, value) {
        state.auth.error = value
      }
    }
  })
}

export default createStore
