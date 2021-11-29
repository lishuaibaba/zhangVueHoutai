import { resRoleList } from "../../util/request";


const state = {
    list: [],
}

const mutations = {
    reqRoleList(state,arr){
        state.list = arr;
    }
}

const actions = {
    requestRoleList(context){
        resRoleList().then(res=>{
            context.commit("reqRoleList",res.data.list)
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