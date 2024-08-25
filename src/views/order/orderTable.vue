<script setup lang="ts">
import axios from "axios";
import { v4 as uuidv4, validate } from 'uuid';

interface HeaderItem {
  defaultname: string;
  name: string;
}
const tableData = ref([
  {
    label: "栏目",
    name: 'name'
  },
  {
    label: "宽度",
    name: 'width'
  },
])
const props = defineProps<{ headerData: HeaderItem[] }>();
const headerData = ref(JSON.parse(JSON.stringify(props.headerData)))
const userListRef = ref()
const instance = getCurrentInstance();
const globalObject =
  instance?.appContext.config.globalProperties.$myGlobalObject;
const SysInfo = ref({
  cUserId: 'demo',
  cVenCode: '0080',
  database: 'ufdata_002_2008',
  ApiUrl: '',
})
const emit = defineEmits(['close']);

const selectedRows: Ref<never[]> = ref([]);
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
const closeClick = () => {
  emit('close')
}
const determineClick =async () => {
  var GID=uuidv4();
  await headerData.value.forEach( 
  (item:any)=>{
    var sortid=(headerData.value.indexOf(item)+1);//重新计算序号

    SqlWork("update","insert into wlzh_PrintsettingTempTb(GID,tname,itype,cname,cvalue,hostname)  select '" +GID+ "','"+item.tname+"' tname, 'sort' itype,'"+item.field+"' cname,"+sortid+" cvalue,'"+SysInfo.value.cUserId+"'  hostname")
    SqlWork("update","insert into wlzh_PrintsettingTempTb(GID,tname,itype,cname,cvalue,hostname)  select '" +GID+ "','"+item.tname+"' tname, 'HeaderText' itype,'"+item.field+"' cname,'"+item.name+"' cvalue,'"+SysInfo.value.cUserId+"'  hostname")
    SqlWork("update","insert into wlzh_PrintsettingTempTb(GID,tname,itype,cname,cvalue,hostname)  select '" +GID+ "','"+item.tname+"' tname, 'width' itype,'"+item.field+"' cname,"+item.width+" cvalue,'"+SysInfo.value.cUserId+"'  hostname")
    SqlWork("update","insert into wlzh_PrintsettingTempTb(GID,tname,itype,cname,cvalue,hostname)  select '" +GID+ "','"+item.tname+"' tname, 'visible' itype,'"+item.field+"' cname,"+item.sfxs+" cvalue,'"+SysInfo.value.cUserId+"'  hostname")

  }
  )
  SqlWork("update","wlzh_PrintsettingDeal '"+GID+"'")


}

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
    <el-table :data="headerData" ref="userListRef" @select="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column sortable="custom" v-for="(item, index) in tableData" :prop="item.name" :key="index"
        :label="item.label">
        <template #default="scope">
          <el-input v-model="scope.row[item.name]" />
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

<style lang="scss" scoped></style>
