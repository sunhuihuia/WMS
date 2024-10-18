<template>
  <div style="margin: 10px;">
    <el-form :label-position="labelPosition2" label-width="auto" :model="headerData" style="max-width: 100%">
      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="ASN单号:">
              <el-input v-model="headerData.ccode" disabled />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="供应商编码:">
              <el-input v-model="headerData.cvencode" disabled />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="供应商名称:">
              <el-input v-model="headerData.cvenabbname" disabled />
            </el-form-item>

          </div>
        </el-col>

      </el-row>


      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="单据日期:">
              <el-input v-model="headerData.ddate" disabled />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="到货地址">
              <el-input v-model="headerData.address" disabled />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="到货方式:">
              <el-input v-model="headerData.dhfs" disabled />
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="联系人:">
              <el-input v-model="headerData.contacts" disabled />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="电话">
              <el-input v-model="headerData.phone" disabled />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="备注:">
              <el-input v-model="headerData.cheadmemo" disabled />
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="发货日期:">
              <el-date-picker v-model="headerData.fahuori" style="width: 100%" type="date" placeholder="发货日期"
                disabled />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="预计到货日期:">
              <el-date-picker v-model="headerData.yujidaohuori" style="width: 100%" type="date" placeholder="预计到货日期"
                disabled />
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
            <el-button @click="delAll"><el-icon>
                <Delete style="width: 10em; height: 10em; margin-right: 0px" />
              </el-icon><span>整单删除</span></el-button>
            <el-button @click="delRow"><el-icon>
                <Delete style="width: 10em; height: 10em; margin-right: 0px" />
              </el-icon><span>删行</span></el-button>
            <el-button @click="save"><el-icon>
                <Memo style="width: 10em; height: 10em; margin-right: 0px" />
              </el-icon><span>保存</span></el-button>
          </el-button-group>

        </el-col>
      </el-row>
      <el-row class="el-row">

        <el-table :data="fiterBodyData()" @selection-change="handleSelectionChange" ref="multipleTableRef"
          style="width: 100%" border>
          <el-table-column type="selection" width="55" />
          <el-table-column prop="cinvcode" label="存货编码" width="180" :sortable="true" />
          <el-table-column prop="cinvname" label="存货名称" width="180" />
          <el-table-column prop="cinvstd" label="规格型号" width="180" />
          <el-table-column prop="cinvm_unit" label="单位" width="60" />
          <el-table-column prop="ipoquantity" label="订单数量" width="120" />
          <el-table-column prop="iarrqty" label="累计到货数量" width="120" />
          <el-table-column prop="wdh" label="未到货数量" width="120" />
          <el-table-column prop="dfhsl" label="待发货数量" width="120" />
          <el-table-column prop="iquantity" label="本次发货数量" width="120">
            <template #default="scope">
              <el-input v-model="scope.row.iquantity" @change="handleInputChange" style="width: 100%" />
            </template>
          </el-table-column>
          <el-table-column prop="darridateb" label="预到货日期" width="120" :sortable="true" />
          <el-table-column prop="cordercode" label="采购订单号" width="120" :sortable="true" />
          <el-table-column prop="cdefine28" label="跟单号" width="120" :sortable="true" />
          <el-table-column prop="cmemo" label="备注" width="120">
          </el-table-column>
          <el-table-column prop="cvenabbname" label="供应商" width="250" :sortable="true" />
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
      headerData: { ccode: '', cvencode: '', cvenabbname: '', ddate: '', address: '到货地址', dhfs: '到货方式', contacts: '联系人', phone: '电话', cheadmemo: '', fahuori: '', yujidaohuori: '' },
      bodyData: [] ,
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


    // this.VouchID=1

    if (this.pVouchID) {

      this.VouchID = this.pVouchID;
      const loading = ElLoading.service({ lock: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.7)', })

      let res = await this.SqlWork("select", "wlzh_ly_getAsnData " + this.VouchID + " ");
      console.log(res);
      this.bodyData = res.data.dataDetail;

      if (res.data.dataDetail.length > 0) {
        this.headerData.cvencode = res.data.dataDetail[0].cvencode;
        this.headerData.cvenabbname = res.data.dataDetail[0].cvenabbname;
        this.headerData.ddate = res.data.dataDetail[0].ddate;
        this.headerData.ccode = res.data.dataDetail[0].ccode;
        this.headerData.cheadmemo = res.data.dataDetail[0].cheadmemo;

      }


      loading.close();

        //webapp_urlprotocol_startup();
    }


    webapp_urlprotocol_run(); 
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
    delRow() {
      const list: any = []
        this.multipleSelection.forEach((val: any) => {
          let index = this.bodyData.findIndex((data: any) =>
            data.cinvcode == val.cinvcode
          )
          list.push(index)
        })
        list.sort((a: any, b: any) => Number(a) - Number(b)).reverse();
        list.forEach((item: any) => { this.bodyData.splice(item, 1) })
    },
    print(DealType: string) {
      var ModlePath = "src/views/Asn/Asn1.grf"
      this.goPrint(DealType, this.bodyData, ModlePath)
    },
    goPrint(DealType: string, PrintData: any, ModlePath: string) {
      webapp_urlprotocol_run();
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


    handleSizeChange(val: any) {
      //每次切换每页条数要把当前页设置为第一页
      this.pageNum = 1;
      this.pageSize = val;

      //this.fiterBodyData();
    },
    handleCurrentChange(val: any) {
      this.pageNum = val;
      //this.fiterBodyData();
    },

    bodyhandleSelectionChange(newSelection: never[]) {
      // this.multipleSelection = val;
      this.bodymultipleSelection = newSelection;

    },
    handleSelectionChange(newSelection: never[]) {
      // this.multipleSelection = val;
      this.multipleSelection = newSelection;

    },

    async HandleSelectChange_ElSelect() {
      this.ElSelectLoading = true
      let res = await this.SqlWork("select", "select distinct b.cAcc_Id value, '['+b.cAcc_Id+']'+b.cAcc_Name label from  UFSystem..UA_Account b")
      this.ElSelectLoading = false
      this.ElSelectOptions = res.data.dataDetail;

    },

    save() {
      var b = true
      if (this.bodyData.length == 0) {
        ElMessageBox.confirm(
          '没有可保存的数据，请先点增加，然后选择所需要的数据',
          '错误！',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
        b = false
      }
      if (this.bodyData.length > 0 && b == true) {
        this.bodyData.forEach(async (item: any) => {
          var index = this.bodyData.indexOf(item as never);

          if (!this.isNumeric(item.iquantity)) {

            ElMessageBox.confirm(
              '第' + (index + 1) + '行数量必须为正的数字',
              '错误！',
              {
                confirmButtonText: '确定',
                //cancelButtonText: '取消',
                type: 'warning',
              }
            )
            b = false;
            return;
          }
          if (item.bqty <= 0) {
            ElMessageBox.confirm(
              '第' + (index + 1) + '行数量必须大于0',
              '错误！',
              {
                confirmButtonText: '确定',
                //cancelButtonText: '取消',
                type: 'warning',
              }
            )
            b = false;
            return;
          }
        });
      }
      if (b == true) {
        let that = this
        ElMessageBox.confirm(`确定保存?`)
          .then(() => {
            that.wlzh_ly_UpdateAsn()

          })
          .catch(() => {
            // catch error
          })
      }

    },
    async wlzh_ly_UpdateAsn() {
      try {
        var GID = uuidv4();
        const promises = this.bodyData.map(async (item: any) => {
          await this.SqlWork("update", "insert into wlzh_AsnModifyTemp(GID,Autoid,id,iquantity,cuser_id)  select '" + GID + "'," + item.autoid + "," + item.id + "," + (item.iquantity == "" ? "0" : item.iquantity) + ",'" + this.SysInfo.cUserId + "'  ")
        });
        // 等待所有循环操作完成 
        await Promise.all(promises); // 执行最后的操作 

        let res = await this.SqlWork("select", "wlzh_ly_UpdateAsn '" + GID + "' ")
        if (res.data.dataDetail[0].result == '1') {
          ElMessage({
            type: 'success',
            message: '保存成功!',
            showClose: true,
          })
          this.$emit('determine')
        } else {
          ElMessage({
            type: 'warning',
            message: '保存失败!' + res.data.dataDetail[0].cmsg,
            showClose: true,
          })


        }


      } catch (error) {
        console.log(error);
      }
    },
    delAll() {
      let that = this
      ElMessageBox.confirm(`确定删除当前单据?`)
        .then(() => {
          that.wlzh_ly_DellAsn()
          this.$emit('determine')

        })
        .catch(() => {
          // catch error
        })
    },
    async wlzh_ly_DellAsn() {
      try {


        let res = await this.SqlWork("select", "wlzh_ly_DellAsn " + this.VouchID + " ")
        if (res.data.dataDetail[0].result == '1') {
          ElMessage({
            type: 'success',
            message: '删除成功!',
            showClose: true,
          })

        } else {
          ElMessage({
            type: 'warning',
            message: '保存失败!' + res.data.dataDetail[0].cmsg,
            showClose: true,
          })


        }


      } catch (error) {
        console.log(error);
      }
    },
    fiterBodyData(): any {

      var b = this.bodyData.filter((data: any) => data.selected == false)

      var r = b.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize)

      return r
    },
    // filterxjTableData(): any{
    // 		return this.bodyDataCopypolist_asn.filter((data) =>
    // 		      data.statue==statue
    // 		  )

    // },



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
