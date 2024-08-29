<!-- 首页 -->
<template>
  <div class="home-model">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="cMsgTitle" label="标题" width="600" />
      <el-table-column prop="dDate" label="时间" width="200"> <template #default="scope">
          <span>{{ moment(scope.row.dDate).format('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="公司" width="380" />
      <el-table-column style="float: right;" label="操作" width="80">
        <template #default="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination @size-change="handleSizeChange_List" @current-change="handleCurrentChange_List"
        :current-page="pageNum_List" :pager-count="13" :page-sizes="[10, 20, 40, 50, 100]" :page-size="pageSize_List"
        layout="total, sizes, prev, pager, next, jumper" :total="total_List">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment"
import axios from "axios";
import router from "@/router";

const database = sessionStorage.getItem('cDatabase')
const cUserId = sessionStorage.getItem('username')
const cVenCode = sessionStorage.getItem('cVenCode')
const tablename = 'dashboard'
const instance = getCurrentInstance();
const pageNum_List = ref(1)
const pageSize_List = ref(10)
const total_List = ref(0)
const globalObject =
  instance?.appContext.config.globalProperties.$myGlobalObject;
interface User {
  date: string;
  name: string;
  address: string;
}
const tableData: Ref<any[]> = ref([]);
const handleEdit = (index: any, value: any) => {
  router.push({ path: "/order/orderConfirm", query: { cCode: value.cCode } });
};
const handleSizeChange_List = (val: any) => {
  //每次切换每页条数要把当前页设置为第一页
  pageNum_List.value = 1;
  pageSize_List.value = val;

  loadData();
}
const handleCurrentChange_List = (val: any) => {
  pageNum_List.value = val;
  loadData();
}
const loadData = async () => {
  const hangshu = await SqlWork("select", `select count(*) total from wlzh_pu_task_view where userId='${cUserId}'`)
  const res = await SqlWork("select", `exec [wlzh_pu_tycg] 'wlzh_pu_task_view',' and userId=''${cUserId}''',${pageSize_List.value},${pageNum_List.value}`)
  tableData.value = res?.data?.dataDetail
  total_List.value = hangshu?.data?.dataDetail[0].total;
}
onMounted(async () => {
  loadData()
})
const SqlWork = async (CommandType: string, SqlsStr: string) => {
  try {
    const res = await axios.post(globalObject.ApiUrl,
      {
        "CommandType": CommandType, "database": database,
        "SqlsStr": SqlsStr,
      });
    return res
  } catch (error) {
    console.error(error);
  }
}
</script>

<style lang;="scss" scoped>
.home-model {
  padding: 35px;
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
