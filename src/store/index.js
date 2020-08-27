import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userConnected:null,
    userSelected:null,
    conversationUsers:null,
    loadChat:false
  },
  mutations: {
    setUserConnected(state,userConnected){
        state.userConnected=userConnected
    },
    setUserSelected(state,userSelected){
        state.userSelected=userSelected
    },
    setConversationUsers(state,between){
        state.conversationUsers=between
    },
    setLoadChat(state,val){
        state.loadChat=val
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
