<template>
  <div class="flex">
    <template v-if="!isMobile">
      <!--全屏 -->
      <div class="setting-item" @click="toggle">
        <svg-icon :icon-class="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
      </div>

      <!-- 布局大小 -->
      <el-tooltip :content="$t('sizeSelect.tooltip')" effect="dark" placement="bottom">
        <size-select class="setting-item" />
      </el-tooltip>

      <!-- 语言选择 -->
      <lang-select class="setting-item" />
    </template>

    <!-- 用户头像 -->
    <el-dropdown class="setting-item" trigger="click">
      <div class="flex-center h100% p10px">

        <!-- :src="userStore.user.avatar + '?imageView2/1/w/80/h/80'" -->
        <img :src="userStore.user.avatar + '?imageView2/1/w/100/h/80'" class="rounded-full mr-10px w24px w24px" />
        <span>{{ userStore.user.username }} </span>-<span> {{ userStore.user.nickname }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <a target="_blank" href="">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </a>
          <el-dropdown-item @click="clickDialog">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click="logout">
            {{ $t("navbar.logout") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 设置 -->
    <template v-if="defaultSettings.showSettings">
      <div class="setting-item" @click="settingStore.settingsVisible = true">
        <svg-icon icon-class="setting" />
      </div>
    </template>
    <el-dialog v-model="dialogTableVisible" title="修改密码" width="400">
      <NavbarLogout />
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {
  useAppStore,
  useTagsViewStore,
  useUserStore,
  useSettingsStore,
} from "@/store";
import defaultSettings from "@/settings";
import { DeviceEnum } from "@/enums/DeviceEnum";
import { reactive, ref } from 'vue';
import NavbarLogout from "./NavbarLogout.vue";

const appStore = useAppStore();
const tagsViewStore = useTagsViewStore();
const userStore = useUserStore();
const settingStore = useSettingsStore();
const dialogTableVisible = ref(false);

const route = useRoute();
const router = useRouter();

const isMobile = computed(() => appStore.device === DeviceEnum.MOBILE);

const { isFullscreen, toggle } = useFullscreen();
var username = ref('')
onMounted(() => {
  console.log('onMounted')
  username.value = sessionStorage.getItem("username") as string

  console.log("username", username)
  // 组件挂载完成后的操作
  //formLabelAlign2.ddate='222';
});
// 打开个人中心弹窗
const clickDialog = () => {
  dialogTableVisible.value = true;
};
/**
 * 注销
 */
function logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    lockScroll: false,
  }).then(() => {
    userStore
      .logout()
      .then(() => {
        tagsViewStore.delAllViews();
      })
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
  });
}
</script>
<style lang="scss" scoped>
.setting-item {
  display: inline-block;
  min-width: 40px;
  height: $navbar-height;
  line-height: $navbar-height;
  color: var(--el-text-color);
  text-align: center;
  cursor: pointer;

  &:hover {
    background: rgb(0 0 0 / 10%);
  }
}

.layout-top,
.layout-mix {

  .setting-item,
  .el-icon {
    color: var(--el-color-white);
  }
}

.dark .setting-item:hover {
  background: rgb(255 255 255 / 20%);
}
</style>
