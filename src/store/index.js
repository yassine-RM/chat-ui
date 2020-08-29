import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userConnected:null,
    userSelected:null,
    conversationUsers:null,
    loadChat:false,
    userProfile:null,
    showNav:true
  },
  mutations: {
    setShowNav(state,val){
        state.showNav=val
    },
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
    },
    setProfile(state,user){
        state.userProfile=user
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
