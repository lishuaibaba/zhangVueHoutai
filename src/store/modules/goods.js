import { resGoodsAdd,resGoodsCount,resGoodsList,resGoodsInfo,resGoodsDel,resGoodsEdit } from "../../util/request";


const state = {
    list: [],
    goodsInfo:{}
}

const mutations = {
    changeList(state, arr) {
        state.list = arr;
    },
    changeInfo(state, obj) {
        state.goodsInfo = obj;
    },
}

const actions = {
    resquestGoodsAdd(context, arr) {
        resGoodsAdd(arr).then(res => {
                 
        })
    },
    resquestGoodsCount(context, arr) {
        return resGoodsCount().then(res => {
            return res;
        })
    },
    resquestGoodsList(context, arr) {
        return resGoodsList(arr).then(res => {
            context.commit('changeList', res.data.list)
        })
    },
    resquestGoodsInfo(context, obj) {
        return resGoodsInfo(obj).then(res => {
            context.commit('changeInfo', res.data.list)
        })
    },
    resquestGoodsEdit(context, obj) {
        return resGoodsEdit(obj).then(res => {
            
        })
    },
    resquestCateGoodsDel(context, iddel) {
        resGoodsDel({ id: iddel }).then(res => {

        })
    },
}

const getters = {
    list(state) {
        return state.list
    },
    goodsInfo(state) {
        return state.goodsInfo
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}