<template>
  <el-upload v-model:file-list="fileList" class="upload-demo" :http-request="UploadFile" multiple
    :on-preview="handlePreview" :on-remove="handleRemove" :data="urlData" :before-remove="beforeRemove"
    accept=".zip, .rar, .jpg,.png ,.xls,.xlsl ,.word ,.pdf,.xlsx">
    <el-button type="primary">上传附件</el-button>

  </el-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import axios from "axios"

import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'

const instance = getCurrentInstance();
const globalObject = instance?.appContext.config.globalProperties.$myGlobalObject
const database = sessionStorage.getItem('cDatabase')
const cUserId = sessionStorage.getItem('username')
const cVenCode = sessionStorage.getItem('cVenCode')
const props = defineProps<{
  headerData:any;
}>();
const fileList = ref<UploadUserFile[]>([
])
interface IParameters {
  vouchtype: string;
  ccode: number;
  autoid: number;
  maker: string | null;
}
interface IUploadFile {
  vouchtype: string;
  ccode: number;
  autoid: number;
  maker: string | null;
  filename: string
}
interface onPreview {
  vouchtype: string;
  ccode: number;
  autoid: number;
  maker: string | null;
  filename: string;
  filepath: string;
}
const urlData = ref({})
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}
const handlePreview = (uploadFile: onPreview) => {
  // 假设这是你要下载的文件URL
  const fileUrl = `http://goodgoodstudy.ufyct.com:7575${uploadFile.filepath}`;
  const link = document.createElement('a');
  link.style.display = 'none'; // 隐藏a标签
  link.href = fileUrl;
  link.download = uploadFile.filename;
  document.body.appendChild(link); // 将a标签添加到body中
  link.click(); // 模拟点击
  document.body.removeChild(link); // 移除a标签
}

const load = async () => {
  const SqlsStr = `select  gid,filename name ,filepath ,vouchtype ,ccode ,autoid ,maker ,maketime ,ip ,dataname   from  wlzh_Dz_UploadFile where ccode='${props.headerData.vouchCode}' and vouchtype='${props.headerData.vouchtype}'`
  const res = await SqlWork('select', SqlsStr)
  fileList.value = res?.data

}
const UploadFile = async (options: any) => {
  const formData = new FormData()
  formData.append('file', options.file)
  const res = await axios.post(`http://goodgoodstudy.ufyct.com:7575/api/UploadFile?vouchtype=${props.headerData.vouchtype}&ccode=${props.headerData.vouchCode}&autoid=${props.headerData.autoid}&maker=${cUserId}`, formData)
  console.log(res);
}

const SqlWork = async (CommandType: string, SqlsStr: string) => {
  try {
    console.log(SqlsStr);
    const res = await axios.post(globalObject.ApiUrl,
      {
        "CommandType": CommandType, "database": database,
        "SqlsStr": SqlsStr
      });
    //console.log(res); 
    //    this.tTable =res.data.dataDetail[0];
    //   console.log(this.tTable);
    return res
  } catch (error) {
    console.error(error);
  }
}
const beforeRemove = (uploadFile: IUploadFile) => {
  console.log(uploadFile);

  return ElMessageBox.confirm(
    `是否删除 ${uploadFile.filename} ?`
  ).then(
    async () => {
      const SqlsStr = `delete wlzh_Dz_UploadFile where vouchtype='${uploadFile.vouchtype}' `
      const res = await SqlWork('select', SqlsStr)
      return true
    },
    () => false
  )
}
onMounted(() => {
  load()
})
</script>
