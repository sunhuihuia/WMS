<template>
  <el-form :label-position="labelPosition2" label-width="auto" :model="filters" style="max-width: 100%">
    <el-row class="el-row">
      <el-col :span="8" class="el-col">
        <div class="grid-content ep-bg-purple">
          <el-form-item label="供应商:">
            <el-input v-model="filters.cVenName" placeholder="请输入供应商" />
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8" class="el-col">
        <div class="grid-content ep-bg-purple">
          <el-form-item label="查阅状态:">
            <el-select v-model="filters.cyzt" placeholder="选择状态" :loading="ElSelectLoading" style="width: 100%"
              name="caccid">
              <el-option v-for="item in guanbiList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8" class="el-col">
        <div class="grid-content ep-bg-purple">
          <el-form-item label="确认状态:">
            <el-select v-model="filters.qrzy" placeholder="选择状态" :loading="ElSelectLoading" style="width: 100%"
              name="caccid">
              <el-option v-for="item in zhuangtaiList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8" class="el-col">
        <div class="grid-content ep-bg-purple-light">
          <el-form-item label="查阅日期:">
            <el-date-picker v-model="filters.dReadTime" format="YYYY/MM/DD" value-format="YYYY-MM-DD" placeholder="选择日期"
              type="date" unlink-panels range-separator="To" />
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8" class="el-col">
        <div class="grid-content ep-bg-purple">
          <el-form-item label="确认日期:">

            <el-date-picker v-model="filters.dConfirmTime" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
              placeholder="选择日期" type="date" unlink-panels range-separator="To" />
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="订单号:">
              <el-input v-model="filters.cPOID" placeholder="请输入订单号" />
            </el-form-item>
          </div>
        </el-col>
    </el-row>
    <el-row class="el-row" style="display: flex;justify-content: space-between;">
      <el-col :span="16" class="el-col">

        <el-button @click="loadData" type="primary"> <span>查询</span></el-button>
        <el-button type="info"> <span>重置</span></el-button>

      </el-col>
      <el-col :span="2" class="el-col">
        <el-button @click="dialogVisibleClick" class  type='success'>选择栏目</el-button>
      </el-col>
    </el-row>
    <el-row class="el-row">

      <el-table style="width: 100%" height="500" v-loading="loading" :data="bodyDataCopypolist_asn"
        @selection-change="handleSelectionChange" ref="multipleTableRef">
        <el-table-column type="selection" width="55" />
        <el-table-column width="55" prop="xh" label="序号">
        </el-table-column>
        <el-table-column v-for="(item, index) in headerData" :prop="item.defaultname" :key="index" :width="item.width"
          :label="item.name">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span v-if="scope.column.property !== 'cPOID'" style="margin-left: 10px">{{ !moment(scope.row[`${scope.column.property}`], 'YYYY-MM-DDTHH:mm:ss',true).isValid() ? scope.row[`${scope.column.property}`] : moment(scope.row.dDate).format('YYYY-MM-DD')
                 }}</span>
              <el-button v-else-if="scope.column.property === 'cPOID'" @click="scopeclick(scope)" class text
                type='primary' bg>{{
                  scope.row[`${scope.column.property}`] }}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

    </el-row>
    <el-row class="el-row">
      <div style="padding: 10px 0">
        <el-pagination @size-change="handleSizeChange_List" @current-change="handleCurrentChange_List"
          :current-page="pageNum_List" :pager-count="13" :page-sizes="[10, 20, 40, 50, 100]" :page-size="pageSize_List"
          layout="total, sizes, prev, pager, next, jumper" :total="total_List">
        </el-pagination>
      </div>
    </el-row>
  </el-form>
  <div style="margin: 10px;">


    <el-dialog v-model="dialogVisible" title="选择栏目" @close="dialogVisible = false" width="70%" :draggable="false">
      <orderTable @determine="determine" @close="dialogVisible = false" :headerData="headerData" :tame="tname"
        :SysInfo="SysInfo" />
    </el-dialog>
    <el-dialog v-model="dialogVisible1" title="订单确认" @close="dialogVisible = false" width="70%" :draggable="false">
      <confirmDY @close="dialogVisible1 = false" :pVouchID="pVouchID" :filtersData="filters" :headerList="headerData"
        :SysInfo="SysInfo" :cCode="cCode" @determine="dialogVisible1 = false" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import type { FormProps } from 'element-plus'
import axios from "axios"
import { getCurrentInstance } from 'vue';
import type { HeaderItem } from './query'
import orderTable from './orderTable.vue'
import confirmDY from './confirmDY.vue'
import router from "@/router";
import moment from "moment"

export default {
  components: {
    orderTable,
    confirmDY
  },
  setup() {
    const instance = getCurrentInstance();
    const globalObject = instance?.appContext.config.globalProperties.$myGlobalObject
    const labelPosition = ref<FormProps['labelPosition']>('right')
    const labelPosition2 = ref<FormProps['labelPosition']>('right')
    const formLabelAlign = reactive({
      name: '',
      region: '',
      type: '',
    })


    interface User {
      selected: boolean
      date: string
      name: string
      address: string
    }


    interface ShortcutItem {
      text: string;
      value: () => Date[]; // 假设 getLastWeek 等方法返回 Date 数组
    }
    return { // 返回组件中可使用的属性和方法
      labelPosition, labelPosition2, formLabelAlign, globalObject,moment
    };

  },


  data() {
    return {
      name: 'John', // Option API：使用 data 方法定义数据
      tTable: reactive({}),
      testObj: { ddate: '' },
      tableData2: [],
      dialogVisible: false,
      dialogVisible1: false,
      pVouchID: '',
      filters: { cyzt: '',cPOID:"" ,cVenName: '', dConfirmTime: '', qrzy: '', dPODate: '', dReadTime: '' },
      bodyData: [],
      bodyDataCopypolist_asn: [],
      headerData: [] as HeaderItem[],
      headerData1: [] as HeaderItem[],
      tname: "orderConfirm",
      pageNum_List: 1,
      pageSize_List: 10,
      loading: false,
      total_List: 0,
      multipleSelection_List: [],
      bodymultipleSelection: [],
      ElSelectLoading: false,
      ElSelectValue: '',
      ElSelectOptions: [{ value: '', label: '' }],
      fullscreenLoading: false,
      zhuangtaiList: [{ value: '1', label: '已确认' }, { value: '0', label: '未确认' }, { value: '', label: '全部' }],
      guanbiList: [{ value: '1', label: '已查阅' }, { value: '0', label: '未查阅' }],
      VouchID: '',
      SysInfo:
      {
        cUserId: 'demo',
        cVenCode: '-1',
        database: 'UFDATA_905_2021',
        ApiUrl: '',
      },
      cCode: ""

    };
  },


  mounted() {
    this.handle()
    if (this.$route.query.cCode) {
      this.cCode = this.$route.query.cCode ? this.$route.query.cCode.toString() : '';
      this.loadData()
    }
    // console.log(mount,123123123);
  },

  methods: {
    scopeclick(data: any) {

      this.pVouchID = data.row.POID + ""
      this.dialogVisible1 = true

    },
    async SqlWork(CommandType: string, SqlsStr: string): Promise<any> {
      try {
        console.log(SqlsStr);
        const res = await axios.post(this.globalObject.ApiUrl,
          {
            "CommandType": CommandType, "database": this.SysInfo.database,
            "SqlsStr": SqlsStr,
          });
        //console.log(res); 
        //    this.tTable =res.data.dataDetail[0];
        //   console.log(this.tTable);
        return res
      } catch (error) {
        console.error(error);
      }
    },

    handleDaochu() {
      // const data = [
      //   // 表格数据
      //   ['姓名', '年龄', '职业'],
      //   ['Alice', 28, '前端开发'],
      //   ['Bob', 22, '后端开发']
      // ];
      // const excel = new Excel();
      // excel.exportExcel({
      //   name: '订单',
      //   // title: '表格标题',加入这个标题会导致导出的表格再次导入时数据key值获取不正确
      //   data: data,
      //   header: [],
      //   customHeader: []
      // })

    },
    handleSelectionChange() {

    },
    async handle() {
      try {
        const database = sessionStorage.getItem('cDatabase')
        const cUserId = sessionStorage.getItem('username')
        const cVenCode = sessionStorage.getItem('cVenCode')
        var roles = sessionStorage.getItem('roles')
        console.log('database', database)
        console.log('cUserId', cUserId)
        if (database != null)
          this.SysInfo.database = database
        else
          this.SysInfo.database = this.globalObject.database


        if (cUserId != null)
          this.SysInfo.cUserId = cUserId

        if (cVenCode != null)
          this.SysInfo.cVenCode = cVenCode

        if (roles == null) roles = ''
        if (roles.includes('admin'))
          this.SysInfo.cVenCode = ''


        let res = await this.SqlWork('select', "wlzh_PrintsettingLoad  '" + this.tname + "', '" + this.SysInfo.cUserId + "'")
        console.log(res.data.dataDetail);
        const list: any[] = []
        res.data.dataDetail.forEach((element: any) => {
          if (element.sfxs == 1) {
            list.push(element)
          }
        })
        this.headerData = list.sort((a: any, b: any) => Number(a.sortid) - Number(b.sortid));
        console.log(this.headerData);

      } catch (error) {

      }
    },
    async loadData() {
      try {
        this.loading = true;
        let hangshu = await this.SqlWork("select", `select count(*) total from wlzh_pu_po_cgqr where  userId='${this.SysInfo.cUserId}' ${this.SysInfo.cVenCode == '' ? '' : " and cVenCode='" + this.SysInfo.cVenCode + "'"} ${!this.filters.cyzt ? '' : `and cyzt='${this.filters.cyzt}'`}${!this.filters.cVenName ? '' : `and cVenCode like '%${this.filters.cVenName}%'`}${!this.filters.dConfirmTime ? '' : `and dConfirmTime='${this.filters.dConfirmTime}'`}${!this.cCode ? '' : `and cPOID='${this.cCode}'`}
        ${!this.filters.cPOID ? '' : `and cPOID='${this.filters.cPOID}'`}${!this.filters.qrzy ? '' : `and qrzy='${this.filters.qrzy}'`}${!this.filters.dPODate ? '' : `and dPODate='${this.filters.dPODate}'`}${!this.filters.dPODate ? '' : `and dPODate='${this.filters.dPODate}'`}${!this.filters.dReadTime ? '' : `and dReadTime='${this.filters.dReadTime}'`}`)
        this.total_List = hangshu.data.dataDetail[0].total
        let res = await this.SqlWork("select", `exec wlzh_pu_cgddqr_list '${!this.SysInfo.cUserId ? '' : 'and '} userId=''${this.SysInfo.cUserId}'' ${this.SysInfo.cVenCode == '' ? '' : " and cVenCode=''" + this.SysInfo.cVenCode + "''"} ${!this.filters.cyzt ? '' : `and cyzt=''${this.filters.cyzt}''`}${!this.filters.cVenName ? '' : `and cVenCode like ''%${this.filters.cVenName}%''`}${!this.filters.dConfirmTime ? '' : `and dConfirmTime=''${this.filters.dConfirmTime}''`}${!this.filters.qrzy ? '' : `and qrzy=''${this.filters.qrzy}''`}${!this.filters.dPODate ? '' : `and dPODate=''${this.filters.dPODate}''`}${!this.filters.dPODate ? '' : `and dPODate=''${this.filters.dPODate}''`}${!this.filters.dReadTime ? '' : `and dReadTime=''${this.filters.dReadTime}''`}${!this.cCode ? '' : `and cPOID=''${this.cCode}''`}' ,${this.pageSize_List},${this.pageNum_List}`)
        this.bodyDataCopypolist_asn = res.data.dataDetail
        this.loading = false;
        this.cCode = ''
      } catch (error) {
      }
    },
    handleSizeChange_List(val: any) {
      //每次切换每页条数要把当前页设置为第一页
      this.pageNum_List = 1;
      this.pageSize_List = val;

      this.loadData();
    },
    handleCurrentChange_List(val: any) {
      this.pageNum_List = val;
      this.loadData();
    },
    async dialogVisibleClick() {
      let res = await this.SqlWork('select', "wlzh_PrintsettingLoad  '" + this.tname + "', '" + this.SysInfo.cUserId + "'")
      this.headerData1 = res.data.dataDetail.sort((a: any, b: any) => Number(a.sortid) - Number(b.sortid));
      this.dialogVisible = true;
    },
    async determine() {
      this.handle()
      this.loadData()
      this.dialogVisible = false;
    },
    resetClick() {
      this.filters = { cyzt: '', cVenName: '', dConfirmTime: '', qrzy: '', dPODate: '', dReadTime: '' ,cPOID:''}
      this.handle()
      this.loadData()
    }
  },
}
</script>




<style lang="scss" scoped>
.el-row {
  margin-bottom: 5px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-right: 20px
}



.squantity-input {
  border: 1px solid #ccc;
  /* 这里可以定义边框的颜色和宽度 */
  padding: 0px;
  /* 内边距 */
  margin: 0px;
  border-radius: 4px;
  /* 圆角 */
  outline: none;
  /* 去除点击input时的默认边框 */
  font-size: 18px;
  width: 90%;
  position: absolute;
}
</style>
