import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import manger from './modules/manger'
import calssify from './modules/calssify.js'
import spec from './modules/spec.js'
import goods from './modules/goods.js'
import banner from './modules/banner.js'
import seckill from './modules/seckill.js'

export default new Vuex.Store({
    modules:{
        menu,
        role,
        manger,
        calssify,
        spec,
        goods,
        banner,
        seckill
    }
})