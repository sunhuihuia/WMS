<template>
  <div style="margin: 10px;">
    <el-form :label-position="labelPosition2" label-width="auto" :model="filters" style="max-width: 100%">
      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="ASN单号:">
              <el-input v-model="filters.ccode" placeholder="请输入ASN单号" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="存货编码:">
              <el-input v-model="filters.cinvcode" placeholder="请输入存货编码" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="存货名称:">
              <el-input v-model="filters.cinvname" placeholder="请输入存货名称" />
            </el-form-item>

          </div>
        </el-col>

      </el-row>


      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="ASN单日期:">

              <el-date-picker v-model="filters.ddate" type="daterange" unlink-panels range-separator="To"
                start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="订单号:">
              <el-input v-model="filters.cordercode" placeholder="请输入订单号" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="ASN状态:">
              <el-select v-model="filters.zhuangtai" placeholder="选择状态" :loading="ElSelectLoading" style="width: 100%"
                name="caccid">
                <el-option v-for="item in zhuangtaiList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="订单日期:">

              <el-date-picker v-model="filters.dpodate" type="daterange" unlink-panels range-separator="To"
                start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="供应商编码:">
              <el-input v-model="filters.cvencode" placeholder="请输入供应商编码" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="供应商名称:">
              <el-input v-model="filters.cvenabbname" placeholder="模糊查询" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>



      <el-row class="el-row">
        <el-col :span="24" class="el-col">

          <el-button @click="loadData" type="danger"> <span>查询</span></el-button>
          <!-- <el-tooltip
        class="box-item"
        effect="dark"
        content="勾选列表项可一次性批量打印多张单据"
        placement="bottom-start"
      >
      <el-button @click="loadData" type="default" plain> <span>批量打印</span></el-button>    
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="预览所勾选的第一张单据"
        placement="bottom-start"
      >
      <el-button @click="loadData" type="default" plain> <span>单张预览</span></el-button>   
      </el-tooltip> -->

          <el-dropdown @command="handleDaochu" trigger="click"><el-button type="default" style="margin-left: 10px;">
              <span>导出</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="全部">全部</el-dropdown-item>
                <el-dropdown-item command="选中">选中</el-dropdown-item>
                <el-dropdown-item command="本页">本页</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>


        </el-col>
      </el-row>
      <el-row class="el-row">

        <el-table :data="fiterBodyData_List()" @row-dblclick="handleTbRowDbClick" style="width: 100%"
          highlight-current-row :row-class-name="tableRowClassName" ref="multipleTableRef" border>

          <!-- <el-table-column  prop="selected"  type="selection" width="55" :sortable="true" fixed/> -->
          <el-table-column prop="cCode" label="单据编号" width="180" :sortable="true">
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top" width="auto">
                <template #default>
                  <div>双击打开单据</div>
                </template>
                <template #reference>
                  <el-tag>{{ scope.row.cCode }}</el-tag>
                </template>
              </el-popover>
            </template>
          </el-table-column>


          <el-table-column prop="zhuangtai" label="生单状态" width="180" :sortable="true" />
          <el-table-column prop="cordercode" label="订单号" width="180" :sortable="true" />
          <el-table-column prop="cinvcode" label="物料编码" width="180" :sortable="true" />
          <el-table-column prop="cinvname" label="物料名称" width="180" />
          <el-table-column prop="cinvstd" label="规格型号" width="180" />
          <el-table-column prop="cinvm_unit" label="主计量单位" width="60" />
          <el-table-column prop="ipoquantity" label="订单数量" width="120" />
          <el-table-column prop="iarrqty" label="累计到货数量" width="120" />
          <el-table-column prop="wdh" label="未到货数量" width="120" />
          <el-table-column prop="iquantity" label="本次发货数量" width="120">
          </el-table-column>
          <el-table-column prop="frealquantity" label="实收数量" width="120" :sortable="true" />
          <el-table-column prop="cmemo" label="备注" width="120" :sortable="true" />
          <el-table-column prop="cdefine28" label="跟单号" width="120" :sortable="true" />
          <el-table-column prop="dDate" label="日期" width="120">
          </el-table-column>
          <el-table-column prop="cvenabbname" label="供应商" width="250" :sortable="true" />
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

    <el-dialog v-model="dialogVisible" title="Asn单维护" @close="closeAsnvoucher" width="70%" :draggable="false">
      <Asnvoucher  @determine="determine" :pVouchID="VouchID" v-if="dialogVisible" ref="refAsnvoucher">
      </Asnvoucher>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="closeAsnvoucher">确定</el-button>
        </div>
      </template>
    </el-dialog>
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
import Asnvoucher from './Asnvoucher.vue';

export default {
  components: {
    Asnvoucher
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
      labelPosition, labelPosition2, formLabelAlign, tableRowClassName, globalObject, shortcuts
    };

  },


  data() {
    return {

      name: 'John', // Option API：使用 data 方法定义数据
      tTable: reactive({}),
      testObj: { ddate: '' },
      tableData2: [],
      dialogVisible: false,
      headerData: { ccode: '', cvencode: '', cinvcode: '', cinvname: '', ddate: '', dpodate: '', zhuangtai: '', dhfs: '', contacts: '', phone: '', cheadmemo: '', fahuori: '', yujidaohuori: '' },
      bodyData: [],
      bodyDataCopypolist_asn: [],
      filters: { ccode: '', cordercode: '', cinvstd: '', ddate: ref(''), cvencode: '', cinvcode: '', cinvname: '', dpodate: ref(''), zhuangtai: '', cvenabbname: '' },
      pageNum_List: 1,
      pageSize_List: 10,
      total_List: 0,
      multipleSelection_List: [],
      bodymultipleSelection: [],
      ElSelectLoading: false,
      ElSelectValue: '',
      ElSelectOptions: [{ value: '', label: '' }],
      fullscreenLoading: false,
      zhuangtaiList: [{ value: '1', label: '已生单' }, { value: '0', label: '未生单' }],
      VouchID: '',
      SysInfo:
      {
        cUserId: 'demo',
        cVenCode: '-1',
        database: 'ufdata_002_2019',
        ApiUrl: '',
        roles:''
      },

    };
  },
  // async mounted(){
  //   console.log('mounted')
  //   const res = await this.SqlWork("select","select null a,2 b" );

  // },
  async mounted() {
    console.log('mounted')

    const database = sessionStorage.getItem('cDatabase')
    const cUserId = sessionStorage.getItem('username')    
    const cVenCode = sessionStorage.getItem('cVenCode')
    var roles = sessionStorage.getItem('roles')

    if (database != null)
      this.SysInfo.database = database
    else
      this.SysInfo.database = this.globalObject.database


    if (cUserId != null)
      this.SysInfo.cUserId = cUserId

      if (cVenCode != null)
      this.SysInfo.cVenCode = cVenCode

      if (roles==null) roles=''

    console.log('this.SysInfo.database', this.SysInfo.database)
    console.log('this.SysInfo.cUserId', this.SysInfo.cUserId)
    console.log('this.SysInfo.cVenCode', this.SysInfo.cVenCode)
    console.log('roles', roles)

    if(  roles.includes('admin')  ) 
    this.SysInfo.cVenCode=''

    // const loading = ElLoading.service({lock: true,text: 'Loading',background: 'rgba(0, 0, 0, 0.7)',})

    // let res=await this.SqlWork("select","wlzh_ly_getAsntemp '"+ this.SysInfo.cUserId+"' ");
    // this.bodyData=res.data.dataDetail;
    // console.log(res)
    // loading.close();
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
    determine() {
      this.loadData()
      this.dialogVisible = false;
    },
    handleDaochu(command: string) {
      ElMessage(`click on item ${command}`)
    },
    async loadData() {
      try {
        console.log('this.filters.ddate', this.filters.ddate)
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

        if (this.SysInfo.cVenCode != '') {
          filterStr += " and a.cvencode=''" + this.SysInfo.cVenCode + "''";
        }
        if (this.filters.cvenabbname != '') {
          filterStr += " and v.cvenabbname like ''%" + this.filters.cvenabbname + "%''"
        }
        if (this.filters.zhuangtai != '') {
          filterStr += " and (case when b.fRealQuantity is null then ''未生单'' else ''已生单'' end)=''" + this.filters.zhuangtai + "''"
        }
        if (this.filters.cinvcode != '') {
          filterStr += " and b.cinvcode = ''" + this.filters.cinvcode + "''"
        }

        if (this.filters.cinvname != '') {
          filterStr += " and i.cinvname like ''%" + this.filters.cinvname + "%''"
        }

        if (this.filters.cinvstd != '') {
          filterStr += " and i.cinvstd like ''%" + this.filters.cinvstd + "%''"
        }
        if (this.filters.ddate && this.filters.ddate.length > 0) {
          filterStr += " and a.ddate between ''" + moment(this.filters.ddate[0]).format('YYYY-MM-DD') + "'' and ''" + moment(this.filters.ddate[1]).format('YYYY-MM-DD') + "''"
        }

        if (this.filters.dpodate && this.filters.dpodate.length > 0) {
          filterStr += " and pm.cpodate between ''" + moment(this.filters.dpodate[0]).format('YYYY-MM-DD') + "'' and ''" + moment(this.filters.dpodate[1]).format('YYYY-MM-DD') + "''"
        }
        if (this.filters.cordercode != '') {
          filterStr += " and pm.cpoid=''" + this.filters.cordercode + "''"
        }
        if (this.filters.ccode != '') {
          filterStr += " and a.ccode=''" + this.filters.ccode + "''"
        }
        //console.log (filterStr)


        let res = await this.SqlWork("select", "wlzh_ly_getAsnlist  '" + filterStr + "','" + this.SysInfo.cUserId + "' ")

        console.log(res.data)
        this.bodyData = res.data.dataDetail
        this.total_List = this.bodyData.length;
        // this.formLabelAlign2={ddate:'3333'}
        // console.log('formLabelAlign2  xxxx',this.formLabelAlign2 );
        loading.close()
        //this.fullscreenLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    handleSizeChange_List(val: any) {
      //每次切换每页条数要把当前页设置为第一页
      this.pageNum_List = 1;
      this.pageSize_List = val;

      //this.fiterBodyData();
    },
    handleCurrentChange_List(val: any) {
      this.pageNum_List = val;
      //this.fiterBodyData();
    },

    bodyhandleSelectionChange(newSelection: never[]) {
      // this.multipleSelection = val;
      this.bodymultipleSelection = newSelection;

    },
    handleSelectionChange_List(newSelection: never[]) {
      // this.multipleSelection = val;
      this.multipleSelection_List = newSelection;

    },





    fiterBodyData_List(): any {

      //   if(this.bodyData)
      //   return   this.bodyData .slice((this.pageNum_List-1)*this.pageSize_List,this.pageNum_List*this.pageSize_List)
      // else 
      var b = this.bodyData.filter((data) =>
        1 == 1
      )
      var r = b.slice((this.pageNum_List - 1) * this.pageSize_List, this.pageNum_List * this.pageSize_List)

      return r


    },
    // filterxjTableData(): any{
    // 		return this.bodyDataCopypolist_asn.filter((data) =>
    // 		      data.statue==statue
    // 		  )

    // },
    closeAsnvoucher() {
      this.dialogVisible = false
    },
    async confirm() {
      try {
        const loading = ElLoading.service({ lock: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.7)', })

        this.multipleSelection_List.forEach(async (item: any) => {
          var newitem = JSON.parse(JSON.stringify(item))
          var index = this.bodyData.findIndex((data: any) =>
            data.iposid == item.iposid
          )
          if (index == -1) {
            let res = await this.SqlWork("select", "insert into wlzh_asntemp(iposid,cinvcode,cuser_id,cvencode,dtime,bqty,dArriveDate) select id,cinvcode,'" + this.SysInfo.cUserId + "'," + item.cvencode + ",getdate()," + item.bqty + ",dArriveDate from po_podetails pd   where id=" + item.iposid + " select @@identity id")
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
        loading.close();
      } catch (error) {
        console.error(error);
      }
    },
    handleTbRowDbClick(row: any) {
      console.log(row)
      this.VouchID = row.id

      this.dialogVisible = true
    },

    isNumeric(char: any): boolean {
      // 正则表达式匹配数字，包括整数、浮点数以及正负号
      const numericPattern = /^[0-9]+(\.[0-9]*)?$/;
      // 如果是单个字符，先转换为字符串，然后匹配
      const charStr = String(char);
      // 判断是否匹配
      return numericPattern.test(charStr);
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
  margin-right: 20px
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
