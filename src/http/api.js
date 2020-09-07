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
};