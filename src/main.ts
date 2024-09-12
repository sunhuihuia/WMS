import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { setupStore } from "@/store";
import { setupDirective } from "@/directive";
import { setupElIcons, setupI18n, setupPermission } from "@/plugins";
import axios from "axios";

// 本地SVG图标
import "virtual:svg-icons-register";

// 样式
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
import "uno.css";
import "animate.css";
const app = createApp(App);

// 使用一个对象设置多个全局变量
app.config.globalProperties.$myGlobalObject = {
  message: "Hello, Vue 3!",
  ApiUrl: "http://shsd666.gnway.org:9999/NewWebApi/api/Values/Work",
  database: "ufdata_001_2021",
  someMethod: () => {
    // 一些逻辑
  },
};

// 微信禁止打开，弹出提示：请用浏览器的打开。
var ua = navigator.userAgent.toLowerCase();
  var isWeixin = ua.indexOf('micromessenger') != -1;
  if (isWeixin) {
    document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">';
    document.body.innerHTML = '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">请用浏览器打开</h4></div></div>';
  }
app.config.globalProperties.$sqlWork = async function async(
  CommandType: any,
  SqlsStr: any
) {
  const instance = getCurrentInstance();
  const globalObject =
    instance?.appContext.config.globalProperties.$myGlobalObject;
  // 函数逻辑
  const res = await axios.post(globalObject.ApiUrl, {
    CommandType: CommandType,
    database: app.config.globalProperties.$myGlobalObjec.database,
    SqlsStr: SqlsStr,
  });
  return res;
};
console.log();

// 全局注册 自定义指令(directive)
setupDirective(app);
// 全局注册 状态管理(store)
setupStore(app);
// 全局注册Element-plus图标
setupElIcons(app);
// 国际化
setupI18n(app);
// 注册动态路由

setupPermission();
app.use(router).mount("#app");
