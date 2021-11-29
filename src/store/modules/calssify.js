import { resCateList, resCatedel } from "../../util/request";


const state = {
    list: [],
}

const mutations = {
    changeList(state, arr) {
        state.list = arr;
    },
}

const actions = {
    resquestCateList(context, arr) {
        return resCateList({pid:arr}).then(res => {
            context.commit('changeList', res.data.list)
            return res;            
        })
    },
    resquestCateListDel(context, iddel) {
        resCatedel({ id: iddel }).then(res => {

        })
    },
}

const getters = {
    list(state) {
        return state.list
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}