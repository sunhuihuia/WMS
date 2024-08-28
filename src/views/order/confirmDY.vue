<template>
  <div style="margin: 10px;">
    <el-form :label-position="labelPosition2" label-width="auto" :model="filters"
      style="max-width: 100%;padding-bottom: 80px">
      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="供应商:">
              <el-input :disabled="true" v-model="filters.cVenName" placeholder="请输入供应商" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="查阅状态:">
              <el-select :disabled="true" v-model="filters.cyzt" placeholder="选择状态" :loading="ElSelectLoading"
                style="width: 100%" name="caccid">
                <el-option v-for="item in guanbiList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="确认状态:">
              <el-select :disabled="true" v-model="filters.qrzy" placeholder="选择状态" :loading="ElSelectLoading"
                style="width: 100%" name="caccid">
                <el-option v-for="item in zhuangtaiList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="查阅日期:">
              <el-date-picker :disabled="true" v-model="filters.dReadTime" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
                placeholder="选择日期" type="date" unlink-panels range-separator="To" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="确认日期:">

              <el-date-picker :disabled="true" v-model="filters.dConfirmTime" format="YYYY/MM/DD"
                value-format="YYYY-MM-DD" placeholder="选择日期" type="date" unlink-panels range-separator="To" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="24" class="el-col">

          <el-button-group>
            <el-button @click="print('print')"><el-icon>
                <Printer style="width: 10em; height: 10em; margin-right: 0px" />
              </el-icon><span>打印</span></el-button>
            <el-button @click="print('preview')"><el-icon>
                <View style="width: 10em; height: 10em; margin-right: 0px" />
              </el-icon><span>预览打印</span></el-button>
          </el-button-group>

        </el-col>
      </el-row>
      <el-row class="el-row">

        <el-table style="width: 100%" v-loading="loading" :data="bodyDataCopypolist_asn" ref="multipleTableRef">
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
            :current-page="pageNum_List" :pager-count="5" :page-sizes="[10, 20, 40, 50, 100]" :page-size="pageSize_List"
            layout="total, sizes, prev, pager, next, jumper" :total="total_List">
          </el-pagination>
        </div>
      </el-row>
      <div style="margin-top: 24px;display: inline-block;float: right;">
        <el-button @click="closeClick">取消</el-button>
        <el-button @click="determineClick" type="primary">确认</el-button>
      </div>
    </el-form>


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
import type { HeaderItem } from './query'

// import AsnLoadPm from './AsnLoadPm.vue';
import { webapp_ws_ajax_run, webapp_urlprotocol_startup, urlAddRandomNo } from "@/utils/grwebapp";

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

    const tableRowClassName = ({
      row,
      rowIndex,
    }: {
      row: User
      rowIndex: number
    }) => {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
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

    return { // 返回组件中可使用的属性和方法
      labelPosition, labelPosition2, formLabelAlign, formLabelAlign2, tableRowClassName, globalObject, shortcuts
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
      PrintList: {},
      filters: { cyzt: '', cVenName: '', dConfirmTime: '', qrzy: '', dPODate: '', dReadTime: '' },
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
    };
  },
  props: {
    // Option API：使用 props 定义属性
    pVouchID: String,
    filtersData: Object,
    headerList: Array,
    cCode: String,
    SysInfo: Object,
  },


  // async mounted(){
  //   console.log('mounted')
  //   const res = await this.SqlWork("select","select null a,2 b" );

  // },
  async mounted() {
    console.log(this.pVouchID, this.filtersData, this.headerList, 123123);
    this.filtersData || {
      cyzt: '',
      cVenName: '',
      dConfirmTime: '',
      qrzy: '',
      dPODate: '',
      dReadTime: ''
    };
    this.headerData = this.headerList as HeaderItem[];
    this.loadData()
  },

  methods: {
    async loadData() {
      try {
        console.log(this.SysInfo);

        this.loading = true;
        let hangshu = await this.SqlWork("select", `select count(*) total from wlzh_pu_po_cgqr where userId='${this.SysInfo?.cUserId}' and POID='${this.pVouchID}'`)
        this.total_List = hangshu.data.dataDetail[0].total
        let res = await this.SqlWork("select", `exec wlzh_pu_cgddqr_list 'and userId=''${this.SysInfo?.cUserId}'' and POID=''${this.pVouchID}''' ,${this.pageSize_List},${this.pageNum_List}`)
        this.bodyDataCopypolist_asn = res.data.dataDetail
        this.loading = false;
      } catch (error) {
      }
    },
    async SqlWork(CommandType: string, SqlsStr: string): Promise<any> {
      try {
        console.log(SqlsStr);
        const res = await axios.post(this.globalObject.ApiUrl,
          {
            "CommandType": CommandType, "database": this.SysInfo?.database,
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
    print(DealType: string) {
      var ModlePath = "src/views/order/ddcx.grf"
      this.goPrint(DealType, this.bodyDataCopypolist_asn, ModlePath)
    },
    goPrint(DealType: string, PrintData: any, ModlePath: string) {
      var json_data = { recordset: [] }
      var recordset = PrintData;
      json_data.recordset = recordset
      //参数具体说明请参考帮助文档中的“WEB报表(B/S报表)->WEB报表客户端->启动参数说明”部分
      var args = {
        type: DealType,//"preview", //设置不同的属性可以执行不同的任务，如：preview print pdf xls csv txt rtf img grd
        report: urlAddRandomNo(ModlePath),
        data: json_data
      };
      webapp_ws_ajax_run(args);
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
    bodyhandleSelectionChange(newSelection: never[]) {
      // this.multipleSelection = val;
      this.bodymultipleSelection = newSelection;

    },

    closeClick() {
      this.$emit('close')
    },
    async determineClick() {
      await this.SqlWork("update", `wlzh_pu_order_qr ${this.pVouchID} ,${this.SysInfo?.cUserId}`);

      this.$emit('determine')
    },
    async HandleSelectChange_ElSelect() {
      this.ElSelectLoading = true
      let res = await this.SqlWork("select", "select distinct b.cAcc_Id value, '['+b.cAcc_Id+']'+b.cAcc_Name label from  UFSystem..UA_Account b")
      this.ElSelectLoading = false
      this.ElSelectOptions = res.data.dataDetail;

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
