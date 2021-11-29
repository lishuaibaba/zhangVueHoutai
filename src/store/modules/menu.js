import { resMenuList,resMenuDelete } from "../../util/request";


const state = {
    list: [],
}

const mutations = {
    changeMuenL(state, arr) {
        state.list = arr;
    }
}

const actions = {
    requestMenuList(context){
        resMenuList({istree:true}).then(res=>{
            context.commit('changeMuenL',res.data.list)
        })
    },
    requestMenuDelete(context,id){
        resMenuDelete({id}).then(res=>{
            
        })
    }
}

const getters = {
    list(state){
        return state.list;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}