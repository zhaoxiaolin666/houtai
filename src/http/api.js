import service from "./index";
import qs from "qs";
export default {
    //封装login的api
    login({ username, password }) {
        return service.post("/login", {
            username,
            password,
        });
    },
    //封装左侧菜单的api
    getMenus() {
        return service.get("menus");
    },
    //封装用户列表的api
    getuserlist({ query, pagenum, pagesize }) {
        return service.get(
            `/users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`
        );
    },
    // 封装删除用户的api
    getuserdelete(id) {
        return service.delete(`users/${id}`);
    },
    // 封装添加用户的api
    getuseradd({ username, password, email, mobile }) {
        return service.post("users", { username, password, email, mobile });
    },
    //封装编辑用户的api
    putusers({ id, email, mobile }) {
        return service.put(`users/${id}`, { email, mobile });
    },
    //封装用户状态
    putusersuid({ uId, type }) {
        return service.put(`users/${uId}/state/${type}`);
    },
    //封装角色列表
    getroles() {
        return service.get("roles");
    },
    //封装分配用户角色
    putusersrole({ id, rid }) {
        return service.put(`users/${id}/role`, { rid });
    },
    //封装数据统计
    getreportstype() {
        return service.get("reports/type/1");
    },
    //封装添加角色
    postsoles({ roleName, roleDesc }) {
        return service.post("roles", { roleName, roleDesc });
    },
    //封装删除角色
    deleteroles(id) {
        return service.delete(`roles/${id}`);
    },
    //封装编辑角色
    putroles({ id, roleName, roleDesc }) {
        return service.put(`roles/${id}`, { roleName, roleDesc });
    },
    //封装角色授权
    postroles({ roleId, rids }) {
        return service.post(`roles/${roleId}/rights`, qs.stringify({ rids }), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
    },
    //封装所有的权限列表
    getrights({ type }) {
        return service.get(`rights/${type}`);
    },
    //封装删除角色指定权限
    deleterolesroleIdrightsrightId({ roleId, rightId }) {
        return service.delete(`roles/${roleId}/rights/${rightId}`);
    },
    //封装订单数据列表
    getorders({
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
        return service.get(
            `orders?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}&user_id=${user_id}&pay_status=${pay_status}&is_send=${is_send}&order_fapiao_title=${order_fapiao_title}&order_fapiao_company=${order_fapiao_company}&order_fapiao_content=${order_fapiao_content}&consignee_addr=${consignee_addr}`
        );
    },
    //封装查看物流信息
    getkuaidiid({ id }) {
        return service.get(`/kuaidi/${id}`);
    },
    //封装商品列表
    getgoods({ query, pagenum, pagesize }) {
        return service.get(
            `goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`
        );
    },
    //封装商品分类
    getcategories({ type, pagenum, pagesize }) {
        return service.get(
            `categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`
        );
    },
    //封装分类参数列表
    getcategoriesattributes({ id, sel }) {
        return service.get(`categories/${id}/attributes?sel=${sel}`);
    },
    //封装添加动态参数或者静态属性
    postcategoriesattributes({ id, attr_name, attr_sel }) {
        return service.post(`categories/${id}/attributes`, {
            attr_name,
            attr_sel,
        });
    },
    //封装添加分类
    postcategories({ cat_pid, cat_name, cat_level }) {
        return service.post("categories", { cat_pid, cat_name, cat_level });
    },
    //封装删除分类
    deletecategories({ id }) {
        return service.delete(`categories/${id}`);
    },
    //封装编辑分类
    putcategories({ id, cat_name }) {
        return service.put(`categories/${id}`, { cat_name });
    },
    //封装删除参数
    deletecategoriesattrid({ id, attrid }) {
        return service.delete(`categories/${id}/attributes/${attrid}`);
    },
    //封装编辑提交参数
    putcategoriesattrId({ id, attrId, attr_name, attr_sel }) {
        return service.put(`categories/${id}/attributes/${attrId}`, {
            attr_name,
            attr_sel,
        });
    },
    //封装删除分类
    deletecategoriesid({ id }) {
        return service.delete(`goods/${id}`);
    },
};