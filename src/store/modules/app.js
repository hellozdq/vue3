const state = {
    name:'storeName'
}

const mutations = {
  SET_NAME: (state,name) => {
      state.name = name
  }
}

const actions = {
  setName:({ commit }, name)=>{
    commit("SET_NAME",name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
