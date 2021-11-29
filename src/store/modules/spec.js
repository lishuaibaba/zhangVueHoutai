import { resSpecAdd, resSpecCount, resSpecList, resSpecDel, resSpecInfo, resSpecEdit } from "../../util/request";


const state = {
    specInfo: [],

}

const mutations = {
    changeInfo(state, arr) {
        state.specInfo = arr;
    },
}

const actions = {
    resquestSpecAdd(context, data) {
        resSpecAdd(data).then(res => {

        })
    },
    resquestSpecCount(context, arr) {
        return resSpecCount().then(res => {
            return res;
        })
    },
    resquestSpecList(context, arr) {
        return resSpecList(arr).then(res => {
            return res;
        })
    },

    resquestSpecListDel(context, iddel) {
        resSpecDel({ id: iddel }).then(res => {

        })
    },

    resquestSpecInfo(context, arr) {
        return resSpecInfo(arr).then(res => {
            context.commit('changeInfo', res.data.list)
        })
    },

    resquestSpecEdit(context, arr) {
        return resSpecEdit(arr).then(res => {
            return res;
        })
    },
}

const getters = {
    specInfo(state) {
        return state.specInfo
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}