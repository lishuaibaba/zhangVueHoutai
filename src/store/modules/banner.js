import { resBannerAdd,resBannerList,resBannerInfo,resBannerDel,resBannerEdit } from "../../util/request";


const state = {
    list: [],
    bannerInfo:{}
}

const mutations = {
    changeList(state, arr) {
        state.list = arr;
    },
    changeInfo(state, obj) {
        state.bannerInfo = obj;
    },
}

const actions = {
    resquestBannerAdd(context, arr) {
        resBannerAdd(arr).then(res => {
                 
        })
    },
    resquestBannerList(context, arr) {
        return resBannerList(arr).then(res => {
            context.commit('changeList', res.data.list)
        })
    },
    resquestBannerInfo(context, obj) {
        return resBannerInfo(obj).then(res => {
            context.commit('changeInfo', res.data.list)
        })
    },
    resquestBannerEdit(context, obj) {
        return resBannerEdit(obj).then(res => {
            
        })
    },
    resquestCateBannerDel(context, iddel) {
        resBannerDel({ id: iddel }).then(res => {

        })
    },
}

const getters = {
    list(state) {
        return state.list
    },
    bannerInfo(state) {
        return state.bannerInfo
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}