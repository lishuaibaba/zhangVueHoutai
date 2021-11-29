import axios from 'axios'
import qs from 'qs'

let baseUrl = '/api'
// 响应拦截
axios.interceptors.response.use(res => {
    // console.log("============请求路径:" + res.config.url + '===========');
    // console.log(res);
    return res
})

// 菜单模块的请求
// 菜单添加
export const resMenuAdd = (data) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: data
    })
}

// 菜单列表
export const resMenuList = (data) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: data
    })
}

// 菜单修改获取一条数据
export const resMenuListOne = (data) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: data
    })
}


// 菜单删除
export const resMenuDelete = ({ id }) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: id
    })
}

// 菜单修改单条
export const resMenuEdit = (data) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: data
    })
}

// 角色管理系列----------------------------------------------------
// 角色管理系列----------------------------------------------------
// 角色管理系列----------------------------------------------------


// 角色添加
export const resRoleAdd = (data) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: data
    })
}

// 角色列表
export const resRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}


// 获取角色单条数据
export const resRoleInfo = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: id
    })
}


// 修改角色
export const resRoleEdit = (data) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: data
    })
}






// 角色删除
export const resRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: id
    })
}






// 管理员管理系列----------------------------------------------------
// 管理员管理系列----------------------------------------------------
// 管理员管理系列----------------------------------------------------
// 管理员管理系列----------------------------------------------------
// 管理员管理系列----------------------------------------------------
// 管理员管理系列----------------------------------------------------
// 管理员管理系列----------------------------------------------------


// 管理员添加

export const resUserAdd = (data) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: data
    })
}

// 管理员列表 计算分页

export const resUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",
    })
}

// 管理员列表 分页

export const resUserList = (data) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: data
    })
}

// 管理员数据 单条

export const resUserInfo = (id) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: id
    })
}

// 管理员修改

export const resUserEdit = (data) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: data
    })
}

// 管理员删除

export const resUserDel = (data) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: data
    })
}




// 商品分类系列----------------------------------------------------
// 商品分类系列----------------------------------------------------
// 商品分类系列----------------------------------------------------
// 商品分类系列----------------------------------------------------
// 商品分类系列----------------------------------------------------
// 商品分类系列----------------------------------------------------
// 商品分类系列----------------------------------------------------


// 商品分类添加

export const resCateAdd = (data) => {
    var form = new FormData()
    for (var i in data) {
        form.append(i, data[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: form
    })
}

// 商品分类列表

export const resCateList = () => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: {
            istree: true
        }
    })
}

// 商品分类获取单条数据

export const resCateedit = (data) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: data
    })
}

// 商品分类修改单条数据

export const resCateOneEdit = (data) => {
    var form = new FormData()
    for (var i in data) {
        form.append(i, data[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: form
    })
}



// 商品分类删除单项

export const resCatedel = (data) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: data
    })
}





// 商品规格系列----------------------------------------------------
// 商品规格系列----------------------------------------------------
// 商品规格系列----------------------------------------------------
// 商品规格系列----------------------------------------------------
// 商品规格系列----------------------------------------------------
// 商品规格系列----------------------------------------------------
// 商品规格系列----------------------------------------------------


// 商品规格添加

export const resSpecAdd = (data) => {
    data.attrs = JSON.stringify(data.attrs)
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: data
    })
}

// 商品规格总数（用于计算分页）

export const resSpecCount = (data) => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

// 商品规格列表（分页）** 
export const resSpecList = (data) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: data
    })
}



// 商品规格列表 获取单条
export const resSpecInfo = (data) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: data
    })
}

// 商品规格列表 修改单条
export const resSpecEdit = (data) => {
    data.attrs = JSON.stringify(data.attrs)
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: data
    })
}







// 商品规格列表单条删除
export const resSpecDel = (data) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: data
    })
}





// vip系列----------------------------------------------------
// vip系列----------------------------------------------------
// vip系列----------------------------------------------------
// vip系列----------------------------------------------------
// vip系列----------------------------------------------------
// vip系列----------------------------------------------------
// vip系列----------------------------------------------------




// vip用户列表
export const resVipList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",
    })
}

// vip用户获取一条
export const resVipInfo = (data) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params:data
    })
}

// vip用户修改一条
export const resVipEdit = (data) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data:data
    })
}




// 商品管理系列----------------------------------------------------
// 商品管理系列----------------------------------------------------
// 商品管理系列----------------------------------------------------
// 商品管理系列----------------------------------------------------
// 商品管理系列----------------------------------------------------
// 商品管理系列----------------------------------------------------
// 商品管理系列----------------------------------------------------



// 商品管理添加

export const resGoodsAdd = (data) => {
    var form = new FormData()
    for (var i in data) {
        form.append(i, data[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: form
    })
}

// 商品管理总数（用于计算分页）

export const resGoodsCount = (data) => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}


// 商品规格列表（分页）** 
export const resGoodsList = (data) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: data
    })
}



// 商品规格列表 获取单条
export const resGoodsInfo = (data) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: data
    })
}

// 商品规格列表 修改单条
export const resGoodsEdit = (data) => {
    var form = new FormData()
    for (var i in data) {
        form.append(i, data[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: form
    })
}







// 商品规格列表单条删除
export const resGoodsDel = (data) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: data
    })
}








// 轮播图系列----------------------------------------------------
// 轮播图系列----------------------------------------------------
// 轮播图系列----------------------------------------------------
// 轮播图系列----------------------------------------------------
// 轮播图系列----------------------------------------------------
// 轮播图系列----------------------------------------------------
// 轮播图系列----------------------------------------------------



// 轮播图添加

export const resBannerAdd = (data) => {
    var form = new FormData()
    for (var i in data) {
        form.append(i, data[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: form
    })
}


// 商品规格列表
export const resBannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
    })
}



// 商品规格列表 获取单条
export const resBannerInfo = (data) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: data
    })
}

// 商品规格列表 修改单条
export const resBannerEdit = (data) => {
    var form = new FormData()
    for (var i in data) {
        form.append(i, data[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: form
    })
}







// 商品规格列表单条删除
export const resBannerDel = (data) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: data
    })
}






// 限时秒杀系列----------------------------------------------------
// 限时秒杀系列----------------------------------------------------
// 限时秒杀系列----------------------------------------------------
// 限时秒杀系列----------------------------------------------------
// 限时秒杀系列----------------------------------------------------
// 限时秒杀系列----------------------------------------------------
// 限时秒杀系列----------------------------------------------------



// 限时秒杀添加

export const resseckAdd = (data) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: data
    })
}


// 限时秒杀列表
export const resseckList = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
    })
}



// 限时秒杀列表 获取单条
export const resseckInfo = (data) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: data
    })
}

// 限时秒杀列表 修改单条
export const resseckEdit = (data) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: data
    })
}

// 限时秒杀列表单条删除
export const resseckDel = (data) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: data
    })
}
