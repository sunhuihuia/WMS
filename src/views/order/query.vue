<template>
  <div style="margin: 10px;">
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
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="订单号:">
              <el-input v-model="filters.cPOID" placeholder="请输入订单号" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="存货编码:">
              <el-input v-model="filters.cVenInvCode" placeholder="请输入存货编码" />
            </el-form-item>

          </div>
        </el-col>

      </el-row>


      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="存货名称:">

              <el-input v-model="filters.cVenInvName" placeholder="请输入存货名称" />

            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="确认状态:">
              <el-select v-model="filters.cState" placeholder="选择状态" :loading="ElSelectLoading" style="width: 100%"
                name="caccid">
                <el-option v-for="item in zhuangtaiList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="订货日期:">
              <el-date-picker v-model="filters.dPODate" format="YYYY/MM/DD" value-format="YYYY-MM-DD" placeholder="选择日期"
                type="date" unlink-panels range-separator="To" />
            </el-form-item>
          </div>
        </el-col>

      </el-row>

      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="交付日期:">

              <el-date-picker v-model="filters.dArriveDate" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
                placeholder="选择日期" type="date" unlink-panels range-separator="To" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="订单状态:">
              <el-select v-model="filters.isconfirmtime" placeholder="选择状态" :loading="ElSelectLoading"
                style="width: 100%" name="caccid">
                <el-option v-for="item in dindanList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="关闭状态:">
              <el-select v-model="filters.guanbi" placeholder="选择状态" :loading="ElSelectLoading" style="width: 100%"
                name="caccid">
                <el-option v-for="item in guanbiList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>



      <el-row class="el-row" style="display: flex;justify-content: space-between;">
        <el-col :span="16" class="el-col">

          <el-button @click="loadData" type="primary"> <span>查询</span></el-button>
          <el-button @click="resetClick" type="info"> <span>重置</span></el-button>
          <el-button type="danger" @click="handleDaochu"> <span>导出</span></el-button>
        </el-col>
        <el-col :span="2" class="el-col">
          <el-button @click="dialogVisibleClick" class text type='primary'>选择栏目</el-button>
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
          </el-table-column>
        </el-table>

      </el-row>
      <el-row class="el-row">
        <div style="padding: 10px 0">
          <el-pagination @size-change="handleSizeChange_List" @current-change="handleCurrentChange_List"
            :current-page="pageNum_List" :pager-count="13" :page-sizes="[10, 20, 40, 50, 100]"
            :page-size="pageSize_List" layout="total, sizes, prev, pager, next, jumper" :total="total_List">
          </el-pagination>
        </div>
      </el-row>


    </el-form>

    <el-dialog v-model="dialogVisible" title="选择栏目" @close="dialogVisible = false" width="70%" :draggable="false">
      <orderTable @determine="determine" @close="dialogVisible = false" :headerData="headerData1" :tame="tname" :SysInfo="SysInfo"/>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import type { FormProps } from 'element-plus'
import axios from "axios"
import { getCurrentInstance } from 'vue';
import type { HeaderItem } from './query'
import { ElMessage, ElLoading } from 'element-plus'
import { fa } from 'element-plus/es/locale';
import { stringify } from 'querystring';
import orderTable from './orderTable.vue'
import { Excel } from '@/utils/exportExcel';
import { List } from 'echarts';

export default {
  components: {
    orderTable
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
      labelPosition, labelPosition2, formLabelAlign, globalObject
    };

  },


  data() {
    return {
      name: 'John', // Option API：使用 data 方法定义数据
      tTable: reactive({}),
      testObj: { ddate: '' },
      tableData2: [],
      dialogVisible: false,
      filters: { cPOID: '', cVenName: '', cVenInvCode: '', cVenInvName: '', cState: '', dPODate: '', dArriveDate: '', isconfirmtime: '', guanbi: '' },
      bodyData: [],
      bodyDataCopypolist_asn: [],
      headerData: [] as HeaderItem[],
      tname: "orderQuery",
      pageNum_List: 1,
      pageSize_List: 10,
      loading: false,
      total_List: 0,
      multipleSelection_List: [],
      bodymultipleSelection: [],
      ElSelectLoading: false,
      ElSelectValue: '',
      headerData1: [] as HeaderItem[],
      ElSelectOptions: [{ value: '', label: '' }],
      fullscreenLoading: false,
      zhuangtaiList: [{ value: '1', label: '已确认' }, { value: '0', label: '未确认' }, { value: '', label: '全部' }],
      dindanList: [{ value: '1', label: '已完成' }, { value: '0', label: '未完成' }, { value: '', label: '全部' }],
      guanbiList: [{ value: '1', label: '已关闭' }, { value: '0', label: '未关闭' }, { value: '', label: '全部' }],
      VouchID: '',
      SysInfo:
      {
        cUserId: 'demo',
        cVenCode: '0080',
        database: 'UFDATA_905_2021',
        ApiUrl: '',
      },

    };
  },


  mounted() {
    this.handle()
  },

  methods: {

    async SqlWork(CommandType: string, SqlsStr: string): Promise<any> {
      try {
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
      if (this.bodyDataCopypolist_asn.length) {
        const customHeader: any = []
        const header: any = []
        this.headerData.forEach(element => {
          header.push(element.defaultname)
          customHeader.push(element.name)
        });

        const excel = new Excel();
        excel.exportExcel({
          name: '订单',
          // title: '表格标题',加入这个标题会导致导出的表格再次导入时数据key值获取不正确
          data: this.bodyDataCopypolist_asn,
          header,
          customHeader
        })
      }
    },
    handleSelectionChange() {

    },
    async handle() {
      try {
        const database = sessionStorage.getItem('cDatabase')
    const cUserId = sessionStorage.getItem('username')    
    const cVenCode = sessionStorage.getItem('cVenCode')
    console.log('database',database)
    console.log('cUserId',cUserId)
    if (database != null)
      this.SysInfo.database = database
    else
      this.SysInfo.database = this.globalObject.database


    if (cUserId != null)
      this.SysInfo.cUserId = cUserId

      if (cVenCode != null)
      this.SysInfo.cVenCode = cVenCode

        let res = await this.SqlWork('select', "wlzh_PrintsettingLoad  '" + this.tname + "', '" + this.SysInfo.cUserId + "'")
        const list: any[] = []
        res.data.dataDetail.forEach((element: any) => {
          if (element.sfxs == 1) {
            list.push(element)
          }
        })
        this.headerData = list.sort((a: any, b: any) => Number(a.sortid) - Number(b.sortid));
      } catch (error) {

      }
    },
    async loadData() {
      try {
        this.loading = true;
        let hangshu = await this.SqlWork("select", "select count(*) total from wlzh_pu_cgqr where userId='" + this.SysInfo.cUserId + "'")
        this.total_List = hangshu.data.dataDetail[0].total
        // this.total_List = hangshu.dataDetail[0]

        let res = await this.SqlWork("select", `exec wlzh_pu_cgddxs '${!this.SysInfo.cUserId ? '' : 'and '} userId=''${this.SysInfo.cUserId}'' ${!this.filters.cPOID ? '' : `and cPOID=''${this.filters.cPOID}''`}${!this.filters.cVenName ? '' : `and cVenCode=''${this.filters.cVenName}''`}${!this.filters.cVenInvCode ? '' : `and cVenInvCode=''${this.filters.cVenInvCode}''`}${!this.filters.cVenInvName ? '' : `and cVenInvName=''${this.filters.cVenInvName}''`}${!this.filters.cState ? '' : `and cState=''${this.filters.cState}''`}${!this.filters.dPODate ? '' : `and dPODate=''${this.filters.dPODate}''`}${!this.filters.dArriveDate ? '' : `and dArriveDate=''${this.filters.dArriveDate}''`}${!this.filters.isconfirmtime ? '' : `and isconfirmtime=''${this.filters.isconfirmtime}''`}${!this.filters.guanbi ? '' : `and isclose=''${this.filters.guanbi}''`}' ,${this.pageSize_List},${this.pageNum_List}`)
        this.bodyDataCopypolist_asn = res.data.dataDetail
        this.loading = false;
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
      this.filters = { cPOID: '', cVenName: '', cVenInvCode: '', cVenInvName: '', cState: '', dPODate: '', dArriveDate: '', isconfirmtime: '', guanbi: '' }
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
