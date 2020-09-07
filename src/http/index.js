import axios from "axios";
import nprogress from "nprogress";
import { Message } from "element-ui";
import router from "../router";

//运行环境 ：本地环境：devlment 和线上产环境：prodution
const isPro = process.env.NODE_ENV === "prodution";

//创建一个axios实例
const server = axios.create({
    //基础路径：需要根据当前运行环境判断
    baseURL: isPro ? "线上的接口路径" : "/api",
    //超时时间
    timeout: 10000,
});

//请求拦截：每一次发请求都会做的事情
server.interceptors.request.use(
    (config) => {
        nprogress.start();
        //前后端鉴权
        //jwt:JSON WEB TOKEN
        //登陆成功之后后端会返回一个令牌
        let token = localStorage.getItem("adminToken");
        if (token) {
            //需要在请求头中添加token
            config.headers["Authorization"] = token;
        } else {
            Message.error("请重新登录");
        }
        return config;
    },
    (err) => {
        nprogress.done();
        return Promise.reject(err); //处理错误的写法
    }
);

//相应拦截：每一次接口返回数据的时候都会做的事情
server.interceptors.response.use(
    (res) => {
        if (res.data.meta.status === 400) {
            Message.error("无效Token,请重新登录");
            router.push("/login");
        }
        nprogress.done();
        return res.data;
    },
    (err) => {
        if (err.response && err.response.status) {
            //错误请求的状态码
            let status = err.response.status;
            if (status === 400) {
                Message.error("参数错误");
            }
            if (status === 401) {
                Message.error("登录过期，请重新登录");
            }
            if (status === 403) {
                Message.error("没有权限");
            }
            if (status === 404) {
                Message.error("接口路径错误");
            }
            if (status === 500) {
                Message.error("服务器出错");
            }
            if (status === 503) {
                Message.error("服务器在维护");
            }
        }
        return Promise.reject(err); //处理错误的写法
    }
);
export default server;