import { resseckAdd,resseckList,resseckInfo,resseckEdit,resseckDel } from "../../util/request";


const state = {
    list: [],
}

const mutations = {
    reqSeckList(state,arr){
        state.list = arr;
    }
}

const actions = {
    requestSeckAdd(context,obj){
        resseckAdd(obj).then(res=>{
            
        })
    },
    requestSeckList(context){
        resseckList().then(res=>{
            context.commit("reqSeckList",res.data.list)
        })
    },
    requestSeckInfo(context,obj){
        return resseckInfo(obj).then(res=>{
            return res;
        })
    },
    requestSeckEdit(context,obj){
        return resseckEdit(obj).then(res=>{
            return res;
        })
    },
    requestSeckDel(context,obj){
        resseckDel(obj).then(res=>{

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