<script setup lang="ts">
import { useSettingsStore, useUserStore } from "@/store";
import { LoginData } from "@/api/auth/types";
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";
import router from "@/router";
import { ThemeEnum } from "@/enums/ThemeEnum";
import axios from "axios";

// Stores
const userStore = useUserStore();
const settingsStore = useSettingsStore();

// Internationalization
const { t } = useI18n();

// Reactive states
const icpVisible = ref(true);
const loading = ref(false); // 按钮loading
const isCapslock = ref(false); // 是否大写锁定
const loginFormRef = ref(ElForm); // 登录表单ref
const { height } = useWindowSize();

const loginData = ref<LoginData>({
  username: "demo",
  password: "",
});

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
    ],
    password1: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.password1.required"),
      },
    ],
    password2: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.password2.required"),
      },
    ],
    caccid: [
      {
        required: true,
        trigger: "blur",
        message: t("必须选择账套"),
      },
    ],
    logindate: [
      {
        required: true,
        trigger: "blur",
        message: t("必须选择登录日期"),
      },
    ],
  };
});

/**
 * 修改密碼
 */
const route = useRoute();
const instance = getCurrentInstance();
const globalObject =
  instance?.appContext.config.globalProperties.$myGlobalObject;
async function handleLogin() {
  try {
  } catch (error) {
    console.error(error);
  }
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

<template>
  <div>
    <el-form ref="loginFormRef" :model="loginData" :rules="loginRules" class="login-form">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <div class="flex-y-center w-full">
          <svg-icon icon-class="user" class="mx-2" />
          <el-input ref="username" v-model="loginData.username" disabled :placeholder="$t('login.username')"
            name="username" size="large" class="h-[48px]" />
        </div>
      </el-form-item>

      <!-- 旧密码 -->
      <el-tooltip :visible="isCapslock" :content="$t('login.capsLock')" placement="right">
        <el-form-item prop="password">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="lock" class="mx-2" />
            <el-input v-model="loginData.password" :placeholder="$t('login.password1')" type="password" name="password"
              @keyup="checkCapslock" @keyup.enter="handleLogin" size="large" class="h-[48px] pr-2" show-password />
          </div>
        </el-form-item>
      </el-tooltip>
      <!-- 新密码 -->
      <el-tooltip :visible="isCapslock" placement="right">
        <el-form-item prop="password1">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="lock" class="mx-2" />
            <el-input v-model="loginData.password1" :placeholder="$t('login.password2')" type="password" name="password"
              @keyup="checkCapslock" @keyup.enter="handleLogin" size="large" class="h-[48px] pr-2" show-password />
          </div>
        </el-form-item>
      </el-tooltip>
      <!-- 再次确认新密码 -->
      <el-tooltip :visible="isCapslock" placement="right">
        <el-form-item prop="password2">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="lock" class="mx-2" />
            <el-input v-model="loginData.password2" :placeholder="$t('login.password3')" type="password" name="password"
              @keyup="checkCapslock" @keyup.enter="handleLogin" size="large" class="h-[48px] pr-2" show-password />
          </div>
        </el-form-item>
      </el-tooltip>

      <!-- 登录按钮 -->
      <el-button :loading="loading" type="primary" size="large" class="w-full" @click.prevent="handleLogin">{{
        $t("login.revise") }}
      </el-button>

      <!-- 账号密码提示 -->
      <!-- <div class="mt-10 text-sm">
          <span>{{ $t("login.username") }}: admin</span>
          <span class="ml-4"> {{ $t("login.password") }}: 123456</span>
        </div> -->
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
