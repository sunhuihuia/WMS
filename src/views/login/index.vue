<template>
  <div class="login-container">
    <!-- 顶部 -->
    <div class="absolute-lt flex-x-end p-3 w-full">
      <el-switch
        v-model="isDark"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        @change="toggleTheme"
      />
      <lang-select class="ml-2 cursor-pointer" />
    </div>
    <img src="../../assets/images/logo.svg" alt="" />
    <!-- 登录表单 -->
    <el-card class="!border-none !bg-transparent !rounded-4% w-100 <sm:w-85">
      <div class="text-center relative">
        <h2>{{ defaultSettings.title }}</h2>
        <el-tag class="ml-2 absolute-rt">{{ defaultSettings.version }}</el-tag>
        <div>
          <image
            src="@/assets/images/logo.c5e0de12.png"
            alt="logo"
            class="image-size"
          ></image>
        </div>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginData"
        :rules="loginRules"
        class="login-form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="user" class="mx-2" />
            <el-input
              ref="username"
              v-model="loginData.username"
              :placeholder="$t('login.username')"
              name="username"
              size="large"
              class="h-[48px]"
            />
          </div>
        </el-form-item>

        <!-- 密码 -->
        <el-tooltip
          :visible="isCapslock"
          :content="$t('login.capsLock')"
          placement="right"
        >
          <el-form-item prop="password">
            <div class="flex-y-center w-full">
              <svg-icon icon-class="lock" class="mx-2" />
              <el-input
                v-model="loginData.password"
                :placeholder="$t('login.password')"
                type="password"
                name="password"
                @keyup="checkCapslock"
                @keyup.enter="handleLogin"
                size="large"
                class="h-[48px] pr-2"
                show-password
              />
            </div>
          </el-form-item>
        </el-tooltip>
        <el-form-item prop="caccid">
          <div class="flex-y-center w-full">
            <el-select
              v-model="ElSelectValue"
              placeholder="选择账套"
              @visible-change="HandleSelectChange_ElSelect"
              :loading="ElSelectLoading"
              style="width: 100%"
              name="caccid"
            >
              <el-option
                v-for="item in ElSelectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-form-item>

        <el-form-item prop="logindate">
          <div class="flex-y-center w-full">
            <el-date-picker
              v-model="logindate"
              type="date"
              placeholder="登录日期"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
              name="logindate"
            />
          </div>
        </el-form-item>
        <!-- 验证码 -->
        <!-- <el-form-item prop="captchaCode">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="captcha" class="mx-2" />
            <el-input
              v-model="loginData.captchaCode"
              auto-complete="off"
              size="large"
              class="flex-1"
              :placeholder="$t('login.captchaCode')"
              @keyup.enter="handleLogin"
            />

            <el-image
              @click="getCaptcha"
              :src="captchaBase64"
              class="rounded-tr-md rounded-br-md cursor-pointer h-[48px]"
            />
          </div>
        </el-form-item> -->

        <!-- 登录按钮 -->
        <el-button
          :loading="loading"
          type="primary"
          size="large"
          class="w-full"
          @click.prevent="handleLogin"
          >{{ $t("login.login") }}
        </el-button>

        <!-- 账号密码提示 -->
        <!-- <div class="mt-10 text-sm">
          <span>{{ $t("login.username") }}: admin</span>
          <span class="ml-4"> {{ $t("login.password") }}: 123456</span>
        </div> -->
      </el-form>
    </el-card>

    <!-- ICP备案 -->
    <div class="absolute bottom-1 text-[10px] text-center" v-show="icpVisible">
      <p>
        Copyright © 2021 - 2024 WLZH All Rights Reserved. 温岭中和 版权所有
      </p>
      <p></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore, useUserStore } from "@/store";
import { getCaptchaApi } from "@/api/auth";
import { LoginData } from "@/api/auth/types";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";
import router from "@/router";
import defaultSettings from "@/settings";
import { ThemeEnum } from "@/enums/ThemeEnum";
import axios from "axios";

// Stores
const userStore = useUserStore();
const settingsStore = useSettingsStore();

// Internationalization
const { t } = useI18n();

// Reactive states
const isDark = ref(settingsStore.theme === ThemeEnum.DARK);
const icpVisible = ref(true);
const loading = ref(false); // 按钮loading
const isCapslock = ref(false); // 是否大写锁定
const captchaBase64 = ref(); // 验证码图片Base64字符串
const loginFormRef = ref(ElForm); // 登录表单ref
const { height } = useWindowSize();

const loginData = ref<LoginData>({
  username: "demo",
  password: "",
});
const ElSelectValue = ref("");

const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.username.required"),
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.password.required"),
      },
      // {
      //   min: 6,
      //   message: t("login.message.password.min"),
      //   trigger: "blur",
      // },
    ],
    caccid: [
      {
        required: true,
        trigger: "blur",
        message: t("必须选择账套"),
      },
      // {
      //   min: 6,
      //   message: t("login.message.password.min"),
      //   trigger: "blur",
      // },
    ],
    logindate: [
      {
        required: true,
        trigger: "blur",
        message: t("必须选择登录日期"),
      },
      // {
      //   min: 6,
      //   message: t("login.message.password.min"),
      //   trigger: "blur",
      // },
    ],
    // captchaCode: [
    //   {
    //     required: true,
    //     trigger: "blur",
    //     message: t("login.message.captchaCode.required"),
    //   },
    // ],
  };
});

/**
 * 获取验证码
 */
function getCaptcha() {
  getCaptchaApi().then(({ data }) => {
    loginData.value.captchaKey = data.captchaKey;
    captchaBase64.value = data.captchaBase64;
  });
}
const logindate = ref(new Date().toISOString().slice(0, 10));
const ElSelectLoading = ref(false);
interface AccListItem {
  value: string;
  label: string;
}
const ElSelectOptions = ref<AccListItem[]>([]);

async function HandleSelectChange_ElSelect() {
  ElSelectLoading.value = true;
  const res0 = await axios.post(globalObject.ApiUrl, {
    CommandType: "login",
    database: "ufsystem",
    cuser_id: loginData.value.username,
    cpassword: loginData.value.password,
  });
  console.log(res0.data);
  if (res0.data.errcode == "0") {
    let res = await axios.post(globalObject.ApiUrl, {
      CommandType: "select",
      database: "ufsystem",
      SqlsStr:
        "select distinct b.cAcc_Id value, '['+b.cAcc_Id+']'+b.cAcc_Name label from  UFSystem..UA_Account b",
    });
    ElSelectLoading.value = false;
    console.log(res.data);
    ElSelectOptions.value = res.data.dataDetail;
  } else {
    ElMessage({
      message: "用户名或密码不正确",
      type: "warning",
    });
  }
}
/**
 * 登录
 */
const route = useRoute();
const instance = getCurrentInstance();
const globalObject =
  instance?.appContext.config.globalProperties.$myGlobalObject;
async function handleLogin() {
  try {
    //http://shsd666.gnway.org:9999/newwebapi
    //http://tzdzzy666.ufyct.com:7578/api/Values/Work
    if (ElSelectValue.value == "") {
      ElMessage({
        message: "必须选择账套",
        type: "warning",
      });
      return;
    }
    if (logindate.value == "") {
      ElMessage({
        message: "必须选择登录日期",
        type: "warning",
      });
      return;
    }
    const res = await axios.post(globalObject.ApiUrl, {
      CommandType: "login",
      database: "ufsystem",
      cuser_id: loginData.value.username,
      cpassword: loginData.value.password,
    });
    console.log(res);
    if (res.data.errcode == "0") {
      const iyear = logindate.value.slice(0, 4);
      console.log(iyear);
      let res2 = await axios.post(globalObject.ApiUrl, {
        CommandType: "select",
        database: "ufsystem",
        SqlsStr:
          "select cDatabase from   UFSystem..UA_AccountDatabase where cAcc_Id='" +
          ElSelectValue.value +
          "' and iBeginYear<=" +
          iyear.toString() +
          " and ISNULL(iEndYear,'2099')>=" +
          iyear.toString(),
      });
      const cDatabase = res2.data.dataDetail[0].cDatabase;
      console.log(cDatabase);
      userStore.user.username = loginData.value.username;
      var tokenType = "Bearer";
      var accessToken = "11223344";
      localStorage.setItem("accessToken", tokenType + " " + accessToken); //Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
      console.log(loginData.value.username);
      sessionStorage.setItem("username", loginData.value.username);
      sessionStorage.setItem("cDatabase", cDatabase);

      router.push({ path: "/dashboard", query: {} });
    } else {
      ElMessage({
        message: "用户名或密码不正确",
        type: "warning",
      });
    }
  } catch (error) {
    console.error(error);
  }

  // loginFormRef.value.validate((valid: boolean) => {
  //   if (valid) {
  //     loading.value = true;
  //     userStore
  //       .login(loginData.value)
  //       .then(() => {
  //         const query: LocationQuery = route.query;
  //         const redirect = (query.redirect as LocationQueryValue) ?? "/";
  //         const otherQueryParams = Object.keys(query).reduce(
  //           (acc: any, cur: string) => {
  //             if (cur !== "redirect") {
  //               acc[cur] = query[cur];
  //             }
  //             return acc;
  //           },
  //           {}
  //         );

  //         router.push({ path: redirect, query: otherQueryParams });
  //       })
  //       .catch(() => {
  //         getCaptcha();
  //       })
  //       .finally(() => {
  //         loading.value = false;
  //       });
  //   }
  // });
}

function handleLogin0() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(loginData.value)
        .then(() => {
          const query: LocationQuery = route.query;
          const redirect = (query.redirect as LocationQueryValue) ?? "/";
          const otherQueryParams = Object.keys(query).reduce(
            (acc: any, cur: string) => {
              if (cur !== "redirect") {
                acc[cur] = query[cur];
              }
              return acc;
            },
            {}
          );

          router.push({ path: redirect, query: otherQueryParams });
        })
        .catch(() => {
          getCaptcha();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}

/**
 * 主题切换
 */

const toggleTheme = () => {
  const newTheme =
    settingsStore.theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
  settingsStore.changeTheme(newTheme);
};
/**
 * 根据屏幕宽度切换设备模式
 */

watchEffect(() => {
  if (height.value < 600) {
    icpVisible.value = false;
  } else {
    icpVisible.value = true;
  }
});

/**
 * 检查输入大小写
 */
function checkCapslock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState("CapsLock");
  }
}

onMounted(() => {
  console.log("mounted");
  //getCaptcha();
});
</script>

<style lang="scss" scoped>
html.dark .login-container {
  background: url("@/assets/images/login-bg-dark.jpg") no-repeat center right;
}

.login-container {
  overflow-y: auto;
  background: url("@/assets/images/login-bg.svg") no-repeat center right;
  @apply wh-full flex-center;
  flex-direction: column;
  .login-form {
    padding: 30px 10px;
  }
  img {
    margin-bottom: 24px;
  }
}

.el-form-item {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}
.image-size {
  display: block;
  // height: 400px;
  // width: 400px;
  // vertical-align: top;
  // margin-right: 0;
  // border-style: none;
  // position: relative;
  z-index: 1000;
}
:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}
</style>
