<template>
  <div style="margin: 10px;">
    <el-form :label-position="labelPosition2" label-width="auto" :model="headerData" style="max-width: 100%">
      <el-row class="el-row">
        <el-col :span="7" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="存货信息:">
              <el-input v-model="headerData.cinvcode" />
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="3" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-button @click="loadData" type="danger"> <span>查询</span></el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="el-row">

        <el-table :data="bodyData" highlight-current-row @current-change="handleChange" ref="multipleTableRef"
          style="width: 100%" border>
          <el-table-column prop="cinvcode" label="存货编码" :sortable="true" />
          <el-table-column prop="cinvname" label="存货名称" />
          <el-table-column prop="cinvstd" label="规格型号" />
          <el-table-column prop="cinvaddcode" label="存货代码" />
          <el-table-column prop="cinvcname" label="存货分类" />

        </el-table>

      </el-row>

      <el-row class="el-row">
        <div style="padding: 10px 0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
            :pager-count="13" :page-sizes="[10, 20, 40, 50]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-row>

    </el-form>

    <div class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="closeAsnvoucher">确定</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import type { FormProps } from 'element-plus'
import { onMounted, onUnmounted } from 'vue';
import axios from "axios"
import { getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'
import moment from "moment"
import { fa } from 'element-plus/es/locale';
// import AsnLoadPm from './AsnLoadPm.vue';
import { webapp_ws_ajax_run, webapp_urlprotocol_run, urlAddRandomNo } from "@/utils/grwebapp";

export default {
  // components:{
  //   AsnLoadPm 
  // 	 },
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
    let formLabelAlign2: any = reactive({
      ddate: '111',
      cvencode: '22',
      cvenabbname: '3',
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
    // 定义 Last week 的函数
    const getLastWeek = () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
    // 定义 Last month 的函数
    const getLastMonth = () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    }

    // 定义 Last 3 months 的函数
    const getLast3Months = () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    }

    const getThisMonth = () => {
      const today = new Date();
      const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return [firstDayOfThisMonth, today];
    }
    const shortcuts: ShortcutItem[] = [
      {
        text: '前一周',
        value: getLastWeek
      },
      {
        text: '前一月',
        value: getLastMonth
      },
      {
        text: '前三个月',
        value: getLast3Months
      },
      {
        text: '本月',
        value: getThisMonth
      },


    ]


    // const props={
    //   pVouchID: String,
    //   pSysInfo:{
    //     cUserId: String,
    //     cVenCode: String,
    //     database: String,
    //     ApiUrl: String
    //   }
    // }

    // let pVouchID2=''
    // let pSysInfo2={
    //     cUserId: '',
    //     cVenCode: '',
    //     database: '',
    //     ApiUrl: ''
    //   }
    //   onMounted(()=>{
    //     console.log('onMounted')
    //     pVouchID2=props.pVouchID
    //     pSysInfo2=props.pSysInfo
    //     console.log('pVouchID2',pVouchID2)
    //   })
    return { // 返回组件中可使用的属性和方法
      labelPosition, labelPosition2, formLabelAlign, formLabelAlign2, globalObject, shortcuts
    };

  },


  data() {
    return {

      name: 'John', // Option API：使用 data 方法定义数据
      tTable: reactive({}),
      testObj: { ddate: '' },
      dialogVisible: false,
      headerData: { cinvcode: "", cinvname: '', cinvstd: "" },
      bodyData: [],
      bodyDataCopypolist_asn: [],
      filters: {
        cordercode: '', cinvcode: '', cinvname: '', cinvstd: '',
        darridate: ref(''),
        cdefine28: '',
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      multipleSelection: [],
      bodymultipleSelection: [],
      ElSelectLoading: false,
      ElSelectValue: '',
      ElSelectOptions: [{ value: '', label: '' }],
      fullscreenLoading: false,
      VouchID: '',
      SysInfo:
      {
        cUserId: 'demo',
        cVenCode: '0080',
        database: 'ufdata_002_2019',
        ApiUrl: '',
      },

    };
  },
  props: {
    // Option API：使用 props 定义属性
    pVouchID: String,

  },


  // async mounted(){
  //   console.log('mounted')
  //   const res = await this.SqlWork("select","select null a,2 b" );

  // },
  async mounted() {
    console.log('mounted')

    console.log('this.pVouchID', this.pVouchID)


    // this.VouchID=this.pVouchID;
    const database = sessionStorage.getItem('cDatabase')
    const cUserId = sessionStorage.getItem('username')
    const cVenCode = sessionStorage.getItem('cVenCode')

    if (database != null)
      this.SysInfo.database = database
    else
      this.SysInfo.database = this.globalObject.database


    if (cUserId != null)
      this.SysInfo.cUserId = cUserId

    if (cVenCode != null)
      this.SysInfo.cVenCode = cVenCode



  },

  methods: {
    async SqlWork(CommandType: string, SqlsStr: string): Promise<any> {
      try {
        console.log(SqlsStr);
        const res = await axios.post(this.globalObject.ApiUrl,
          {
            "CommandType": CommandType, "database": this.SysInfo.database,
            "SqlsStr": SqlsStr
          });
        //console.log(res); 
        //    this.tTable =res.data.dataDetail[0];
        //   console.log(this.tTable);
        return res
      } catch (error) {
        console.error(error);
      }
    },
    handleInputChange() {

    },
    async loadData() {
      const isum = await this.SqlWork('select', `exec GetPagedResults_sum ${this.headerData.cinvcode}`)
      const res = await this.SqlWork('select', `exec GetPagedResults ${this.pageNum}, ${this.pageSize},'${this.headerData.cinvcode}'`)
      console.log(res);
      this.bodyData = res.data
      this.total = isum.data[0].isum
    },
    handleSizeChange(val: any) {
      //每次切换每页条数要把当前页设置为第一页
      this.pageNum = 1;
      this.pageSize = val;
      this.loadData()
      //this.fiterBodyData();
    },
    handleCurrentChange(val: any) {
      this.pageNum = val;
      this.loadData()

      //this.fiterBodyData();
    },

    handleChange(newSelection: never[]) {
      // this.multipleSelection = val;
      console.log(newSelection, 12312);

      this.multipleSelection = newSelection;

    },

    closeAsnvoucher() {
      this.$emit('recognize',this.multipleSelection)
    },
    close() {
      this.$emit('close');

    },

    isNumeric(char: any): boolean {
      // 正则表达式匹配数字，包括整数、浮点数以及正负号
      const numericPattern = /^[0-9]+(\.[0-9]*)?$/;
      // 如果是单个字符，先转换为字符串，然后匹配
      const charStr = String(char);
      // 判断是否匹配
      return numericPattern.test(charStr);
    },



    squantityInput(row: any) {

      console.log(row)
      const id = row.id

      //this.SqlWork("update","update wlzh_asntemp set bqty="+val+" where id="+id+"")
    },







  },


}




</script>




<style lang="scss" scoped>
.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-left: 10px
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
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
}
</style>
