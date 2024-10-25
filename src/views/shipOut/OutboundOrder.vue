<template>
  <div style="margin: 10px;">
    <el-form :label-position="labelPosition2" label-width="auto" :model="headerData" style="max-width: 100%">
      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="单据编号:">
              <el-input v-model="headerData.vouchCode" disabled />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="收发类别:">
              <el-input v-model="headerData.crdname" disabled />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="单据类型:">
              <el-input v-model="headerData.cvouchtype" disabled />
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
            <el-form-item label="仓库">
              <el-input v-model="headerData.cwhname" disabled />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="部门:">
              <el-input v-model="headerData.cdepName" disabled />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="单据ID:">
              <el-input v-model="headerData.autoid " disabled />
            </el-form-item>
          </div>
        </el-col>
      </el-row>


      <el-row class="el-row">
        <el-col :span="22" class="el-col">

          <el-button-group>
            <el-button @click="dialogVisible = true"><el-icon>
                <Plus style="width: 10em; height: 10em; margin-right: 0px" />
              </el-icon><span>增加</span></el-button>
            <el-button @click="dialogVisible = true"><el-icon>
                <Edit style="width: 10em; height: 10em; margin-right: 0px" />
              </el-icon><span>修改</span></el-button>
            <el-button @click="delRow"><el-icon>
                <Delete style="width: 10em; height: 10em; margin-right: 0px" />
              </el-icon><span>删行</span></el-button>
            <el-button @click="clear"><el-icon>
                <RefreshLeft style="width: 10em; height: 10em; margin-right: 0px" />
              </el-icon><span>放弃</span></el-button>
            <el-button @click="save"><el-icon>
                <Memo style="width: 10em; height: 10em; margin-right: 0px" />
              </el-icon><span>保存</span></el-button>
            <el-button @click="print('print')"><el-icon>
                <Printer style="width: 10em; height: 10em; margin-right: 0px" />
              </el-icon><span>打印</span></el-button>
            <el-button @click="print('preview')"><el-icon>
                <View style="width: 10em; height: 10em; margin-right: 0px" />
              </el-icon><span>预览打印</span></el-button>


          </el-button-group>

        </el-col>
        <el-col :span="2" class="el-col">
          <el-button @click="uploadClick" class type='primary'><el-icon>
              <Upload />
            </el-icon>上传附件</el-button>
        </el-col>
      </el-row>
      <el-row class="el-row">

        <el-table :data="bodyData" style="width: 100%" @selection-change="bodyhandleSelectionChange"
          :row-class-name="tableRowClassName" ref="multipleTableRef" border>
          <el-table-column prop="selected" type="selection" width="55" :sortable="true" fixed />
          <el-table-column prop="cinvcode" label="存货编码" width="180" :sortable="true" />
          <el-table-column prop="cinvname" label="存货名称" width="180" />
          <el-table-column prop="cinvstd" label="规格型号" width="180" />
          <el-table-column prop="cinvm_unit" label="计量单位" width="110" />
          <el-table-column prop="ipoquantity" label="批次" width="220" />
          <el-table-column prop="ipoquantity" label="货位编码" width="220" />
          <el-table-column prop="ipoquantity" label="数量" />
          <el-table-column prop="zdr" width="180" label="制单人" />
          <el-table-column prop="zdsj" width="180" label="制单时间" />
          <el-table-column prop="spr" width="180" label="审核人" />
          <el-table-column prop="spsj" width="180" label="审核时间" />


        </el-table>

      </el-row>


    </el-form>
    <el-dialog v-model="dialogVisible" title="采购订单获取" width="70%" :draggable="false">
      <!-- <AsnLoadPm   /> -->
      <span></span>
      <div style="margin: 10px;">
        <el-form :label-position="labelPosition2" label-width="auto" :model="filters" style="max-width: 100%">
          <el-row class="el-row">

            <el-col :span="7" class="el-col">
              <div class="grid-content ep-bg-purple">
                <el-form-item label="采购订单号:">
                  <el-input v-model="filters.cordercode" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" class="el-col">
              <div class="grid-content ep-bg-purple-light">
                <el-form-item label="跟单号:">
                  <el-input v-model="filters.cdefine28" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8" class="el-col">
              <div class="grid-content ep-bg-purple">

                <el-form-item label="预计到货日">
                  <el-date-picker v-model="filters.darridate" type="daterange" unlink-panels range-separator="To"
                    start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" />
                </el-form-item>
              </div>
            </el-col>

          </el-row>

          <el-row class="el-row">

            <el-col :span="7" class="el-col">
              <div class="grid-content ep-bg-purple">
                <el-form-item label="存货编码:">
                  <el-input v-model="filters.cinvcode" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" class="el-col">
              <div class="grid-content ep-bg-purple-light">
                <el-form-item label="存货名称:">
                  <el-input v-model="filters.cinvname" placeholder="模糊查询" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8" class="el-col">
              <div class="grid-content ep-bg-purple-light">
                <el-form-item label="规格型号:">
                  <el-input v-model="filters.cinvstd" placeholder="模糊查询" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="2" class="el-col">
              <el-button type="primary" @click="loadData" v-loading.fullscreen.lock="fullscreenLoading">
                查询
              </el-button>
            </el-col>
          </el-row>

          <el-row class="el-row">

            <el-table :data="fiterBodyData()" style="width: 100%" @selection-change="handleSelectionChange"
              highlight-current-row ref="CopypolistTableRef" border>
              <el-table-column prop="selected" type="selection" width="55" :sortable="true" fixed />
              <el-table-column prop="cordercode" label="订单号" width="120" :sortable="true" />
              <el-table-column prop="cinvcode" label="存货编码" width="180" :sortable="true" />
              <el-table-column prop="cinvname" label="存货名称" width="300" />
              <el-table-column prop="cinvstd" label="规格型号" width="300" />
              <el-table-column prop="cinvm_unit" label="单位" width="60" />
              <el-table-column prop="ipoquantity" label="订单数量" width="120" />
              <el-table-column prop="iarrqty" label="累计到货数量" width="120" />
              <el-table-column prop="wdhsl" label="未到货数量" width="120" />
              <el-table-column prop="dfhsl" label="待发货数量" width="120" />
              <el-table-column prop="darridateb" label="预到货日期" width="120" :sortable="true" />
              <el-table-column prop="cdefine28" label="跟单号" width="120" :sortable="true" />
              <el-table-column prop="cvouchtype" label="供应商" width="250" :sortable="true" />
            </el-table>

          </el-row>

          <el-row class="el-row">
            <div style="padding: 10px 0">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="pageNum" :pager-count="13" :page-sizes="[10, 20, 40, 50]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </el-row>
        </el-form>
      </div>




      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
  <el-dialog v-model="dialogVisible2" title="选择栏目" @close="dialogVisible2 = false" width="70%" :draggable="false">
    <SingleUpload :headerData="headerData"  />
  </el-dialog>
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
import SingleUpload from '@/components/Upload/SingleUpload.vue'

// import AsnLoadPm from './AsnLoadPm.vue';
import { webapp_ws_ajax_run, webapp_urlprotocol_run, urlAddRandomNo } from "@/utils/grwebapp";

export default {
  components: {
    SingleUpload
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
    let formLabelAlign2: any = reactive({
      ddate: '111',
      crdname: '22',
      cvouchtype: '3',
    })

    interface User {
      selected: boolean
      date: string
      name: string
      cwhname: string
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



    const tableData: User[] = [
      {
        selected: false,
        date: '2016-05-03',
        name: 'Tom',
        cwhname: 'No. 189, Grove St, Los Angeles',
      },
      {
        selected: false,
        date: '2016-05-02',
        name: 'Tom',
        cwhname: 'No. 189, Grove St, Los Angeles',
      },
      {
        selected: false,
        date: '2016-05-04',
        name: 'Tom',
        cwhname: 'No. 189, Grove St, Los Angeles',
      },
      {
        selected: true,
        date: '2016-05-01',
        name: 'Tom',
        cwhname: 'No. 189, Grove St, Los Angeles',
      },
    ]
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
      labelPosition, labelPosition2, formLabelAlign, formLabelAlign2, tableRowClassName, tableData, globalObject, shortcuts
    };

  },


  data() {
    return {

      name: 'John', // Option API：使用 data 方法定义数据
      tTable: reactive({}),
      testObj: { ddate: '' },
      tableData2: [],
      dialogVisible: false,
      dialogVisible2: false,
      headerData: { vouchCode: '', crdname: '', cvouchtype: '', ddate: '', cwhname: '仓库', cdepName: '部门',autoid:"", contacts: '供货商', phone: 'ID号', cheadmemo: '', fahuori: '', yujidaohuori: '' },
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

      SysInfo:
      {
        cUserId: 'demo',
        cVenCode: '0080',
        database: 'ufdata_002_2019',
        ApiUrl: '',
      },

    };
  },
  // async mounted(){
  //   console.log('mounted')
  //   const res = await this.SqlWork("select","select null a,2 b" );

  // },
  onMounted() {
    try {
      console.log('AsnAddonMounted')

    } catch (error) {
      console.log('error', error)
    }

  },
  async mounted() {
    console.log('AsnAddmounted')

    const database = sessionStorage.getItem('cDatabase')
    const cUserId = sessionStorage.getItem('username')
    const cVenCode = sessionStorage.getItem('cVenCode')


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



    let res = await this.SqlWork("select", "wlzh_Dz_posDetail '" + this.SysInfo.cUserId + "' ");
    this.bodyData = res.data.dataDetail;

    if (res.data.dataDetail.length > 0) {
      this.headerData.crdname = res.data.dataDetail[0].crdname;
      this.headerData.cvouchtype = res.data.dataDetail[0].cvouchtype;
      this.headerData.ddate = moment(new Date()).format('YYYY-MM-DD');
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
    uploadClick() {
      this.dialogVisible2 = true
    },
    async print(DealType: string) {
      var ModlePath = "src/views/Asn/Asn1.grf"
      if (this.headerData.vouchCode == '') {
        ElMessage({
          type: 'error',
          message: '没有保存的单据不能打印!',
          showClose: true,
        })
      } else {
        let res = await this.SqlWork("select", "wlzh_ly_getAsnData  null,'" + this.headerData.vouchCode + "' ");
        if (res.data.dataDetail.length == 0) {
          ElMessage({
            type: 'error',
            message: '没有找到已保存的单据数据!',
            showClose: true,
          })
        } else {
          var PrintData = res.data.dataDetail
          this.goPrint(DealType, PrintData, ModlePath)
        }

      }

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
    async loadData() {
      try {
        //let res = await this.testSqlWork4()
        // const loading = ElLoading.service({lock: true,text: 'Loading',background: 'rgba(0, 0, 0, 0.7)',})
        //   const loading = ElLoading.service({
        //   lock: true,
        //   text: 'Loading',
        //   background: 'rgba(0, 0, 0, 0.7)',
        // })

        //this.fullscreenLoading = true;
        const loading = ElLoading.service({ lock: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.7)', })

        var filterStr = "  ";

        if (this.SysInfo.cVenCode != '' && this.SysInfo.cVenCode != 'null') {
          filterStr += " and t.crdname=''" + this.SysInfo.cVenCode + "''";
        }
        if (this.filters.cordercode != '') {
          filterStr += " and t.cordercode=''" + this.filters.cordercode + "''"
        }
        if (this.filters.cinvcode != '') {
          filterStr += " and t.cinvcode = ''" + this.filters.cinvcode + "''"
        }
        if (this.filters.cinvname != '') {
          filterStr += " and t.cinvname like ''%" + this.filters.cinvname + "%''"
        }
        if (this.filters.cinvstd != '') {
          filterStr += " and t.cinvstd like ''%" + this.filters.cinvstd + "%''"
        }
        if (this.filters.darridate.length > 0) {
          filterStr += " and t.dArriveDate between ''" + moment(this.filters.darridate[0]).format('YYYY-MM-DD') + "'' and ''" + moment(this.filters.darridate[1]).format('YYYY-MM-DD') + "''"
        }
        if (this.filters.cdefine28 != '') {
          filterStr += " and cdefine28=''" + this.filters.cdefine28 + "''"
        }

        //console.log (filterStr)


        let res = await this.SqlWork("select", "wlzh_ly_getCopypolist_asn '" + filterStr + "','" + this.SysInfo.cUserId + "' ")

        console.log(res.data)
        this.bodyDataCopypolist_asn = res.data.dataDetail
        this.total = this.bodyDataCopypolist_asn.length;
        // this.formLabelAlign2={ddate:'3333'}
        // console.log('formLabelAlign2  xxxx',this.formLabelAlign2 );
        loading.close()
        //this.fullscreenLoading = false;
      } catch (error) {
        console.error(error);
      }
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



    fiterBodyData(): any {

      var b = this.bodyDataCopypolist_asn.filter((data: any) => data.selected == false)

      var r = b.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize)

      return r
    },
    // filterxjTableData(): any{
    // 		return this.bodyDataCopypolist_asn.filter((data) =>
    // 		      data.statue==statue
    // 		  )

    // },

    async confirm() {

      const loading = ElLoading.service({ lock: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.7)', })
      try {
        var cvencode0 = ''

        if (cvencode0 == '' && this.bodyData.length > 0) cvencode0 = (this.bodyData[0] as any).crdname
        if (cvencode0 == '' && this.multipleSelection.length > 0) cvencode0 = (this.multipleSelection[0] as any).crdname

        if (cvencode0 != '' && this.multipleSelection.length > 0) {

          var k = this.multipleSelection.findIndex((data: any) =>
            data.crdname != cvencode0
          )

          if (k != -1) {
            ElMessage({
              type: 'error',
              message: '请选择同一供应商的订单',
              showClose: true,
            })
            loading.close()
            return
          } else {
            this.headerData.crdname = (this.multipleSelection[0] as any).crdname
            this.headerData.cvouchtype = (this.multipleSelection[0] as any).cvouchtype
            this.headerData.ddate = moment(new Date()).format('YYYY-MM-DD')

            this.multipleSelection.forEach(async (item: any) => {
              var newitem = JSON.parse(JSON.stringify(item))
              var index = this.bodyData.findIndex((data: any) =>
                data.iposid == item.iposid
              )
              if (this.headerData.vouchCode != '') {
                this.bodyData = []
                this.headerData.vouchCode = ''
              }
              if (index == -1) {
                let res = await this.SqlWork("select", "insert into wlzh_asntemp(iposid,cinvcode,cuser_id,crdname,dtime,bqty,dArriveDate) select id,cinvcode,'" + this.SysInfo.cUserId + "','" + item.crdname + "',getdate()," + item.iquantity + ",dArriveDate from po_podetails pd   where id=" + item.iposid + " select @@identity id")
                var id = res.data.dataDetail[0].id
                newitem.id = id
                this.bodyData.push(newitem as never)

              }

              var item2: any = this.bodyDataCopypolist_asn.find((data: any) =>
                data.iposid == item.iposid
              )
              item2.selected = true
            })
            this.dialogVisible = false
          }
        }

        loading.close();
      } catch (error) {
        console.error(error);
      }
    },

    async delRow() {
      const loading = ElLoading.service({ lock: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.7)', })
      try {

        const list: any = []
        this.bodymultipleSelection.forEach(async (item: any) => {
          var newitem = JSON.parse(JSON.stringify(item))
          var index = this.bodyData.findIndex((data: any) =>
            data.iposid == item.iposid
          )
          list.push(index)
          if (index > -1) {
            await this.SqlWork("select", "delete from wlzh_asntemp where iposid =" + newitem.iposid + "  ")

          }

          var item2: any = this.bodyDataCopypolist_asn.find((data: any) =>
            data.iposid == item.iposid
          )

          if (item2) {
            console.log(item2)
            item2.selected = false
          }


          console.log(item2)
        })
        list.sort((a: any, b: any) => Number(a) - Number(b)).reverse();
        list.forEach((item: any) => { this.bodyData.splice(item, 1) })
      } catch (error) {
        console.error(error);

      } finally {
        loading.close()
      }
    },
    isNumeric(char: any): boolean {
      // 正则表达式匹配数字，包括整数、浮点数以及正负号
      const numericPattern = /^[0-9]+(\.[0-9]*)?$/;
      // 如果是单个字符，先转换为字符串，然后匹配
      const charStr = String(char);
      // 判断是否匹配
      return numericPattern.test(charStr);
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
            that.wlzh_ly_saveasn()

          })
          .catch(() => {
            // catch error
          })
      }

    },
    async wlzh_ly_saveasn() {
      const loading = ElLoading.service({ lock: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.7)', })

      try {

        // this.bodyData.forEach(async (item: any) => {
        //   await this.SqlWork("update", "update wlzh_asntemp set bqty=" + item.iquantity + ",ctmemo='" + item.cmemo + "' where  id=" + item.id + " ")
        // });
        const promises = this.bodyData.map(async (item: any) => {
          await this.SqlWork("update", "update wlzh_asntemp set bqty=" + item.iquantity + ",ctmemo='" + item.cmemo + "' where  id=" + item.id + " ")
        });
        // 等待所有循环操作完成 
        await Promise.all(promises); // 执行最后的操作 


        var GID = uuidv4();
        GID = GID.replace(/-/g, '').replace(":", '');
        await this.SqlWork("update", "update wlzh_asntemp set GID='" + GID + "',cHeadMemo='" + this.headerData.cheadmemo + "'" + (this.headerData.fahuori && this.headerData.fahuori != '' ? ",fahuori='" + this.headerData.fahuori + "'" : "") + (this.headerData.yujidaohuori && this.headerData.yujidaohuori != '' ? ",yujidaohuori='" + this.headerData.yujidaohuori + "'" : "") + "     where  cuser_id='" + this.SysInfo.cUserId + "' ")

        let res = await this.SqlWork("select", "wlzh_ly_saveasn '" + GID + "' ")
        console.log(res)
        if (res.data.dataDetail[0].result == '1') {


          ElMessage({
            type: 'success',
            message: '保存成功!',
            showClose: true,
          })
          this.headerData.vouchCode = res.data.dataDetail[0].Vcode

        } else {
          ElMessage({
            type: 'warning',
            message: res.data.dataDetail[0].cmsg,
            showClose: true,
          })


        }



        loading.close()
      } catch (error) {
        console.error(error);
        loading.close()
        ElMessage({
          type: 'warning',
          message: '保存失败!',
          showClose: true,
        })

      }
    },
    clear() {
      let that = this
      ElMessageBox.confirm(`确定放弃所选数据?`)
        .then(() => {
          that.SqlWork("update", "delete from wlzh_asntemp where cuser_id='" + this.SysInfo.cUserId + "'  ")
          this.bodyData = []
          that.headerData.vouchCode = ''
          that.headerData.crdname = ''
          that.headerData.cvouchtype = ''
          that.headerData.ddate = ''
          that.headerData.cheadmemo = ''
          that.headerData.yujidaohuori = ''
          that.headerData.fahuori = ''


        })
        .catch(() => {
          // catch error
        })
    },
    async testSqlWork2() {
      try {
        //let res = await this.testSqlWork4()
        let res = await this.SqlWork("select", "select 'aaaa' crdname,'cccc' cvouchtype,'dddd' ddate")
        console.log(res)
        console.log(res.data.dataDetail[0])
        // // formLabelAlign2.cvouchtype=res.data.dataDetail[0].b;
        //this.formLabelAlign2=res.data.dataDetail[0];
        // formLabelAlign2.cvenabbname2="33";

        this.testObj = res.data.dataDetail[0]
        // this.formLabelAlign2={ddate:'3333'}
        // console.log('formLabelAlign2  xxxx',this.formLabelAlign2 );
      } catch (error) {
        console.error(error);
      }
    },
    async getTableData() {
      try {
        //let res = await this.testSqlWork4()
        let res = await this.SqlWork("select", "select top 15 convert(varchar(50),rd.ddate,23) date,rd.vouchCode name,rds.cinvcode,rds.iquantity cwhname  from rdrecord01 rd join rdrecords01 rds on rd.id=rds.id where rd.ddate>='2024-01-01'")

        this.tableData2 = res.data.dataDetail
        let newrow = JSON.parse(JSON.stringify(res.data.dataDetail[0]))
        this.tableData2.push(newrow as never);
        // this.formLabelAlign2={ddate:'3333'}
        // console.log('formLabelAlign2  xxxx',this.formLabelAlign2 );
      } catch (error) {
        console.error(error);
      }
    },

    async testSqlWork4(): Promise<any> {
      try {
        const res = await axios.post("https://ycjdwocloud.gnway.org:7579/Api/values/Work", {
          "CommandType": "select", "database": "master",
          "SqlsStr": "select 'aaaa' crdname,'cccc' cvouchtype,'dddd' ddate"
        });
        return res
      } catch (error) {
        console.error(error);
      }
    },

    test1() {
      console.log(this.bodyData)
    },
    test2() {
      console.log(this.bodyDataCopypolist_asn)
    },
    sayHello() {
      console.log('Hello, ' + this.name); // Option API：使用 methods 定义方法
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
