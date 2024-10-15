<script setup lang="ts">
import axios from "axios";
import { v4 as uuidv4, validate } from 'uuid';

interface HeaderItem {
  defaultname: string;
  name: string;
}
interface SysInfoType {
  cUserId: string;
  cVenCode: string;
  database: string;
  ApiUrl: string;
}
const tableData = ref([
  {
    label: "栏目字段",
    name: 'field'
  },
  {
    label: "显示字段",
    name: 'name'
  },
  {
    label: "宽度",
    name: 'width'
  },
])
const props = defineProps<{
  headerData: HeaderItem[];
  tame: string;
  SysInfo: SysInfoType;
}>();
const headerData = ref(JSON.parse(JSON.stringify(props.headerData)))
const tname = ref(props.tame);
const userListRef = ref()
console.log(props, 'propspropspropspropsprops')
const instance = getCurrentInstance();
const globalObject =
  instance?.appContext.config.globalProperties.$myGlobalObject;
// const SysInfo = ref({
//   cUserId: 'demo',
//   cVenCode: '0080',
//   database: 'UFDATA_905_2021',
//   ApiUrl: '',
// })

///通过props来传递用户信息
const SysInfo = ref(JSON.parse(JSON.stringify(props.SysInfo)))

const emit = defineEmits(['close', 'determine']);

nextTick(() => {
  console.log(userListRef);
  const list = []
  headerData.value.forEach((val: any, index: any) => {
    if (val.sfxs == 1) {
      userListRef.value.toggleRowSelection(headerData.value[index], true); // 设置为选中状态

    }

  })
})

// 上移
const handleUp = (index: any, data: any) => {
  let temp = data.sortid;
  data.sortid = headerData.value[index - 1].sortid
  headerData.value[index - 1].sortid = temp
  const newIndex = index - 1;
  const temp1 = headerData.value[newIndex];
  headerData.value[newIndex] = data;
  headerData.value[index] = temp1;
}
//下移
const handleDown = (index: any, data: any) => {
  let temp = data.sortid;
  data.sortid = headerData.value[index + 1].sortid
  headerData.value[index + 1].sortid = temp
  const newIndex = index + 1;
  const temp1 = headerData.value[newIndex];
  headerData.value[newIndex] = data;
  headerData.value[index] = temp1;

}
// 置顶
const handleCrown = (index: any, data: any) => {
  headerData.value.forEach((val: any) => {
    val.sortid += 1;
  })
  data.sortid = 1;
  const topRow = headerData.value.splice(index, 1)[0];
  headerData.value.unshift(topRow);
  console.log(headerData.value);
}
// 置底
const handleBottom = (index: any, data: any) => {
  headerData.value.forEach((val: any) => {
    val.sortid = val.sortid - 1;
  })
  data.sortid = headerData.value.length;
  const topRow = headerData.value.splice(index, 1)[0];
  headerData.value.push(topRow);
}
const handleSelectionChange = (data: any, value: any) => {
  value.sfxs = value.sfxs == 0 ? 1 : 0
}
const toggleAllSelection = (data: any, value: any) => {
  if (data.length == headerData.value.length) {
    headerData.value.forEach((item: any) => {
      item.sfxs = 1;
    });
  } else if (data.length == 0) {
    headerData.value.forEach((item: any) => {
      item.sfxs = 0;
    });
  }
}

const closeClick = () => {
  emit('close')
}
const determineClick = async () => {
  const GID = uuidv4(); // 将所有插入操作转换为 Promise 数组 
  const promises = headerData.value.map(async (item: any) => {
    console.log(item.sfxs, 11111);
    const sortid = (headerData.value.indexOf(item) + 1); // 重新计算序号 
    await SqlWork("update", "insert into wlzh_PrintsettingTempTb(GID,tname,itype,cname,cvalue,hostname) select '" + GID + "','" + tname.value + "' tname, 'sort' itype,'" + item.field + "' cname," + sortid + " cvalue,'" + SysInfo.value.cUserId + "' hostname"); await SqlWork("update", "insert into wlzh_PrintsettingTempTb(GID,tname,itype,cname,cvalue,hostname) select '" + GID + "','" + tname.value + "' tname, 'HeaderText' itype,'" + item.field + "' cname,'" + item.name + "' cvalue,'" + SysInfo.value.cUserId + "' hostname"); await SqlWork("update", "insert into wlzh_PrintsettingTempTb(GID,tname,itype,cname,cvalue,hostname) select '" + GID + "','" + tname.value + "' tname, 'width' itype,'" + item.field + "' cname," + item.width + " cvalue,'" + SysInfo.value.cUserId + "' hostname"); await SqlWork("update", "insert into wlzh_PrintsettingTempTb(GID,tname,itype,cname,cvalue,hostname) select '" + GID + "','" + tname.value + "' tname, 'visible' itype,'" + item.field + "' cname," + item.sfxs + " cvalue,'" + SysInfo.value.cUserId + "' hostname");
  });
  // 等待所有插入操作完成 
  await Promise.all(promises); // 执行最后的操作 
  await SqlWork("update", "wlzh_PrintsettingDeal '" + GID + "'");
  emit('determine')
};

const SqlWork = async (CommandType: string, SqlsStr: string) => {
  try {
    const res = await axios.post(globalObject.ApiUrl,
      {
        "CommandType": CommandType, "database": SysInfo.value.database,
        "SqlsStr": SqlsStr,
      });
    return res
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div style="padding-bottom: 80px;">
    <el-table :data="headerData" @selection-change="toggleAllSelection" ref="userListRef"
      @select="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column v-for="(item, index) in tableData" :prop="item.name" :key="index" :label="item.label" width="200" >
        <template #default="scope">
          <el-input :disabled="item.name == 'field'" v-model="scope.row[item.name]" />
        </template>
      </el-table-column>
      <el-table-column label="位置">
        <template #default="scope">
          <el-button v-if="scope.$index !== 0" type="danger" size="small" @click="handleUp(scope.$index, scope.row)">
            上移
          </el-button>
          <el-button v-if="scope.$index !== headerData.length - 1" type="danger" size="small"
            @click="handleDown(scope.$index, scope.row)">
            下移
          </el-button>
          <el-button v-if="scope.$index !== 0" type="danger" size="small" @click="handleCrown(scope.$index, scope.row)">
            置顶
          </el-button>
          <el-button v-if="scope.$index !== headerData.length - 1" type="danger" size="small"
            @click="handleBottom(scope.$index, scope.row)">
            置底
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 24px;display: inline-block;float: right;">
      <el-button @click="closeClick">取消</el-button>
      <el-button @click="determineClick" type="primary">确认</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-table--large .cell) {
  padding: 0 8px !important;
}
</style>
