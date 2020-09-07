import api from "../../http/api";
import router from "../../router";
import { Message } from "element-ui";
// import Vue from "vue";
export default {
    //开启命名空间，这个文件是单独的一个vuex模块
    namespaced: true,
    state: {
        //相当于data
        menus: [], //左侧菜单数据
        userlist: [], //用户列表数据
        total: 0, //用户列表长度
        roles: [], //  角色列表
        reportstype: {}, //统计数据
        rights: [], //权限
        orders: [], //订单列表
    },
    mutations: {
        //相当于方法
        setMenus(state, data) {
            state.menus = data;
        },
        setuserlist(state, data) {
            state.userlist = data;
        },
        settotal(state, data) {
            state.total = data;
        },
        setroles(state, data) {
            state.roles = data;
        },
        setreportstype(state, data) {
            state.reportstype = data;
        },
        setrights(state, data) {
            state.rights = data;
        },
        setcommitdelete(state, { roleId, data }) {
            console.log(state.roles, "state.roles");
            console.log(roleId);
            console.log(data);
            state.roles.map((item) => {
                if (item.id === roleId) {
                    item.children = data;
                }
            });
        },
        setorders(state, data) {
            state.orders = data;
        },
    },
    actions: {
        //所有的请求都写在actions里
        // actions里面的方法可以传两个参数  一个参数是整个store(vuex对象)第二个参数是请求的参数params
        //1.左侧菜单请求
        async getMenus({ commit }) {
            let res = await api.getMenus();
            if (res.meta.status === 200) {
                //提交mutation
                commit("setMenus", res.data);
                // console.log(res, "左侧菜单");
                console.log(router.options.routes, "路由结构");
                let page = router.options.routes.filter((item) => {
                    return item.path === "#";
                });
                console.log(page, "有icon的路由");
                //添加icon
                res.data.map((item1, index1) => {
                    item1.icon = page[index1].meta.icon;
                    item1.children.map((item2, index2) => {
                        item2.icon = page[index1].children[index2].meta.icon;
                        // console.log(item2.icon, index1, index2, "子级图标");
                    });
                });
            }
            res.data.map((item) => {
                item.children.map((item1) => {
                    item1.path = `/${item.path}/${item1.path}`;
                });
            });
            console.log(res, "左侧菜单");
        },
        //2.登录请求
        async login({ commit }, { username, password }) {
            let res = await api.login({
                username,
                password,
            });
            console.log(commit);
            if (res.meta.status === 200) {
                //储存信息
                localStorage.setItem("adminToken", res.data.token);
                localStorage.setItem("adminUser", JSON.stringify(res.data));
                //跳转路由
                router.push("/");
                //提示用户
                // commit("setMenus", res.data);
                Message.success("登录成功");
            } else {
                Message.error(res.meta.msg);
            }
        },
        //3.用户列表请求
        async getuserlist({ commit }, { query, pagenum, pagesize }) {
            try {
                let res = await api.getuserlist({ query, pagenum, pagesize });
                if (res.meta.status === 200) {
                    // Vue.set(res, "flag", "1111");
                    // console.log(res.data.users);
                    commit("setuserlist", res.data.users);
                    commit("settotal", res.data.total);
                    // console.log(commit)
                }
                console.log(res, "用户列表请求");
            } catch (err) {
                console.log(err);
            }
        },
        //4.删除用户请求
        async getuserdelete({ dispatch }, { id, query, pagenum, pagesize }) {
            try {
                let res = await api.getuserdelete(id);
                // console.log(id, query, pagenum, pagesize);
                // console.log(res.meta.status);
                if (res.meta.status === 200) {
                    // console.log(id, query, pagenum, pagesize);
                    Message.success(res.meta.msg);
                    //调用获取用户列表
                    dispatch("getuserlist", { query, pagenum, pagesize });
                }
            } catch (err) {
                console.log(err);
            }
        },
        //5.添加用户请求
        async getuseradd({ dispatch }, { username, password, email, mobile, query, pagenum, pagesize }) {
            try {
                let res = await api.getuseradd({ username, password, email, mobile });
                // console.log(username, password, email, mobile);
                // console.log(res.meta.status);
                if (res.meta.status === 201) {
                    // console.log(id, query, pagenum, pagesize);
                    Message.success(res.meta.msg);
                    //调用获取用户列表
                    dispatch("getuserlist", { query, pagenum, pagesize });
                } else if (res.meta.status === 400) {
                    Message.error(res.meta.msg);
                    //调用获取用户列表
                }
            } catch (err) {
                console.log(err);
            }
        },
        //6.编辑用户请求
        async putusers({ dispatch }, { id, email, mobile, query, pagenum, pagesize }) {
            try {
                let res = await api.putusers({ id, email, mobile });
                console.log(res.meta.status, "编辑用户");
                if (res.meta.status === 200) {
                    Message.success("更新成功");
                    dispatch("getuserlist", { query, pagenum, pagesize });
                } else if (res.meta.status === 400) {
                    Message.error(res.meta.msg);
                }
            } catch (err) {
                console.log(err);
            }
        },
        //7.修改用户状态
        async putusersuid({ dispatch }, { uId, type, query, pagenum, pagesize }) {
            try {
                let res = await api.putusersuid({ uId, type });
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg);
                    dispatch("getuserlist", { query, pagenum, pagesize });
                } else if (res.meta.status === 400) {
                    Message.error(res.meta.msg);
                }
            } catch (err) {
                console.log(err);
            }
        },
        //8.角色列表
        async getroles({ commit }) {
            try {
                let res = await api.getroles();
                console.log(res.meta.status, "角色列表");
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg);
                    commit("setroles", res.data);
                } else if (res.meta.status === 400) {
                    Message.error(res.meta.msg);
                }
            } catch (err) {
                console.log(err);
            }
        },
        //9.分配用户角色请求
        async putusersrole({ dispatch }, { id, rid, query, pagenum, pagesize }) {
            try {
                let res = await api.putusersrole({ id, rid });
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg);
                    dispatch("getuserlist", { query, pagenum, pagesize });
                } else if (res.meta.status === 400) {
                    Message.error(res.meta.msg);
                }
            } catch (err) {
                console.log(err);
            }
        },
        //10.数据统计报表请求
        async getreportstype({ commit }) {
            try {
                let res = await api.getreportstype();
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg);
                    commit("setreportstype", res.data);
                    console.log(res.data, "数据统计报表请求");
                }
            } catch (err) {
                console.log(err);
            }
        },
        //11.添加角色请求
        async postsoles({ dispatch }, { roleName, roleDesc }) {
            try {
                let res = await api.postsoles({ roleName, roleDesc });
                console.log(res, "添加角色请求");
                if (res.meta.status === 201) {
                    Message.success(res.meta.msg);
                    dispatch("getroles");
                }
            } catch (err) {
                console.log(err);
            }
        },
        //12.删除角色请求
        async deleteroles({ dispatch }, { id }) {
            try {
                let res = await api.deleteroles(id);
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg);
                    dispatch("getroles");
                }
            } catch (err) {
                console.log(err);
            }
        },
        //13.编辑角色请求
        async putroles({ dispatch }, { id, roleName, roleDesc }) {
            try {
                let res = await api.putroles({ id, roleName, roleDesc });
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg);
                    dispatch("getroles");
                }
            } catch (err) {
                console.log(err);
            }
        },
        //14.角色授权请求
        async postroles({ dispatch }, { roleId, rids }) {
            try {
                let res = await api.postroles({ roleId, rids });
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg);
                    dispatch("getroles");
                }
            } catch (err) {
                console.log(err);
            }
        },
        //15.所有的权限列表请求
        async getrights({ commit }, { type }) {
            try {
                let res = await api.getrights({ type });
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg);
                    console.log(res, "所有的权限列表请求");
                    commit("setrights", res.data);
                }
            } catch (err) {
                console.log(err);
            }
        },
        //16.删除角色指定权限请求
        async deleterolesroleIdrightsrightId({ commit }, { roleId, rightId }) {
            try {
                let res = await api.deleterolesroleIdrightsrightId({ roleId, rightId });
                if (res.meta.status === 200) {
                    console.log(roleId, "roleId");
                    Message.success(res.meta.msg);
                    console.log(res, "删除角色指定权限请求");
                    commit("setcommitdelete", { roleId: roleId, data: res.data });
                }
            } catch (err) {
                console.log(err);
            }
        },
        //17. 订单数据列表请求
        async getorders({ commit }, {
            query,
            pagenum,
            pagesize,
            user_id,
            pay_status,
            is_send,
            order_fapiao_title,
            order_fapiao_company,
            order_fapiao_content,
            consignee_addr,
        }) {
            try {
                let res = await api.getorders({
                    query,
                    pagenum,
                    pagesize,
                    user_id,
                    pay_status,
                    is_send,
                    order_fapiao_title,
                    order_fapiao_company,
                    order_fapiao_content,
                    consignee_addr,
                });
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg);
                    commit("setorders", res.data.goods);
                    console.log(commit);
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
};