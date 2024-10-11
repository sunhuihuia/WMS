<template>
  <div style="margin: 10px;">
    <el-form :label-position="labelPosition2" label-width="auto" :model="filters" style="max-width: 100%">
      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="单据编号:">
              <el-input v-model="filters.vouchCode" placeholder="请输入单据编号" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="单据类型::">
              <el-input v-model="filters.cvouchtype" placeholder="请输入单据类型" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="仓库名称:">
              <el-input v-model="filters.cwhname" placeholder="请输入仓库名称" />
            </el-form-item>

          </div>
        </el-col>

      </el-row>


      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="起始日期:">

              <el-date-picker v-model="filters.vouchDate" type="daterange" unlink-panels range-separator="To"
                start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="部门名称:">
              <el-input v-model="filters.cdepName" placeholder="请输入部门名称" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="表头备注:">
              <el-input v-model="filters.cMemo" placeholder="请输入表头备注" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="表体备注:">
              <el-input v-model="filters.cbmemo" placeholder="请输入表体备注" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="存货编码:">
              <el-input v-model="filters.cinvcode" placeholder="请输入存货编码" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple">
            <el-form-item label="客户:">
              <el-input v-model="filters.ccusname" placeholder="客户" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>


      <el-row class="el-row">
        <el-col :span="8" class="el-col">
          <div class="grid-content ep-bg-purple-light">
            <el-form-item label="收发类别:">
              <el-input v-model="filters.crdname" placeholder="请输入收发类别" />
            </el-form-item>
          </div>
        </el-col>

      </el-row>

      <el-row class="el-row">
        <el-col :span="22" class="el-col">

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


7

        </el-col>
        <el-col :span="2" class="el-col">
          <el-button @click="dialogVisibleClick" class type='success'>选择栏目</el-button>
        </el-col>
      </el-row>
      <el-row class="el-row">

        <el-table :data="fiterBodyData_List()" @row-dblclick="handleTbRowDbClick" style="width: 100%"
          highlight-current-row :row-class-name="tableRowClassName" ref="multipleTableRef" border>

          <!-- <el-table-column  prop="selected"  type="selection" width="55" :sortable="true" fixed/> -->
          <el-table-column prop="vouchCode" label="单据编号" width="180" :sortable="true">
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top" width="auto">
                <template #default>
                  <div>双击打开单据</div>
                </template>
                <template #reference>
                  <el-tag>{{ scope.row.vouchCode }}</el-tag>
                </template>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column prop="vouchDate" label="单据日期" width="180" :sortable="true" />
          <el-table-column prop="crdname" label="收发类别" width="180" :sortable="true" />
          <el-table-column prop="ccusname" label="客户" width="180" />
          <el-table-column prop="cwhname" label="仓库" width="180" />
          <el-table-column prop="cwhcode" label="货位编码" width="60" />
          <el-table-column prop="cinvcode" label="存货编码" width="120" />
          <el-table-column prop="cinvname" label="存货名称" width="120" />
          <el-table-column prop="cinvstd" label="规格型号" width="120" />
          <el-table-column prop="cComunitName" label="计量单位" width="120">
          </el-table-column>
          <el-table-column prop="cbatch" label="批次" width="120" :sortable="true" />
          <el-table-column prop="inqty" label="入库数量" width="120" :sortable="true" />
          <el-table-column prop="cMemo" label="表头备注" width="120" :sortable="true" />
          <el-table-column prop="cbmemo" label="表体备注" width="120">
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

    <el-dialog v-model="dialogVisible" title="Asn单维护" @close="closeAsnvoucher" width="70%" :draggable="false">
      <Asnvoucher @determine="determine" :pVouchID="VouchID" v-if="dialogVisible" ref="refAsnvoucher">
      </Asnvoucher>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="closeAsnvoucher">确定</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogVisible1" title="选择栏目" @close="dialogVisible1 = false" width="70%" :draggable="false">
      <orderTable @determine="determine" @close="dialogVisible1 = false" :destroy-on-close="true"
        :headerData="headerData" :tame="tname" :SysInfo="SysInfo" />
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
import orderTable from "@/components/titleBar/orderTable.vue";

export default {
  components: {
    Asnvoucher,
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
      testObj: { vouchDate: '' },
      tableData2: [],
      dialogVisible: false,
      dialogVisible1: false,
      headerData: { vouchCode: '', cinvcode: '', cvouchtype: '', cwhname: '', vouchDate: '', dpodate: '', zhuangtai: '', dhfs: '', contacts: '', phone: '', cheadmemo: '', fahuori: '', yujidaohuori: '', cMemo: '', cbmemo: '', crdname: "" },
      bodyData: [],
      bodyDataCopypolist_asn: [],
      filters: { vouchCode: '', cdepName: '', cinvstd: '', vouchDate: ref(''), cinvcode: '', cvouchtype: '', cwhname: '', dpodate: ref(''), zhuangtai: '', ccusname: '', cMemo: '', cbmemo: "", crdname: '' },
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
        database: 'ufsystm',
        ApiUrl: '',
        roles: ''
      },
      tname: "",
    };
  },
  // async mounted(){
  //   console.log('mounted')
  //   const res = await this.SqlWork("select","select null a,2 b" );

  // },
  async mounted() {
    console.log('mounted')

    const database = null
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

    if (roles == null) roles = ''

    console.log('this.SysInfo.database', this.SysInfo.database)
    console.log('this.SysInfo.cUserId', this.SysInfo.cUserId)
    console.log('this.SysInfo.cVenCode', this.SysInfo.cVenCode)
    console.log('roles', roles)

    if (roles.includes('admin'))
      this.SysInfo.cVenCode = ''

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
        console.log('this.filters.vouchDate', this.filters.vouchDate)
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

        if (this.filters.ccusname != '') {
          filterStr += (filterStr !== "  " ? 'and ' : "where ") + " ccusname like '%" + this.filters.ccusname + "%'"
        }
        if (this.filters.cvouchtype != '') {
          filterStr += (filterStr !== "  " ? 'and ' : "where ") + "  cvouchtype = '" + this.filters.cvouchtype + "'"
        }

        if (this.filters.cwhname != '') {
          filterStr += (filterStr !== "  " ? 'and ' : "where ") + "  cwhname like '%" + this.filters.cwhname + "%'"
        }

        if (this.filters.cinvstd != '') {
          filterStr += (filterStr !== "  " ? 'and ' : "where ") + "  cinvstd like '%" + this.filters.cinvstd + "%'"
        }
        if (this.filters.vouchDate && this.filters.vouchDate.length > 0) {
          filterStr += (filterStr !== "  " ? 'and ' : "where ") + "  vouchDate between '" + moment(this.filters.vouchDate[0]).format('YYYY-MM-DD') + "' and '" + moment(this.filters.vouchDate[1]).format('YYYY-MM-DD') + "'"
        }

        if (this.filters.dpodate && this.filters.dpodate.length > 0) {
          filterStr += (filterStr !== "  " ? 'and ' : "where ") + "  cpodate between '" + moment(this.filters.dpodate[0]).format('YYYY-MM-DD') + "' and '" + moment(this.filters.dpodate[1]).format('YYYY-MM-DD') + "'"
        }

        if (this.filters.vouchCode != '') {
          filterStr += (filterStr !== "  " ? 'and ' : "where ") + "  vouchCode='" + this.filters.vouchCode + "'"
        }
        if (this.filters.crdname != '') {
          filterStr += (filterStr !== "  " ? 'and ' : "where ") + "  crdname='" + this.filters.crdname + "'"
        }
        if (this.filters.cbmemo != '') {
          filterStr += (filterStr !== "  " ? 'and ' : "where ") + "  cbmemo='" + this.filters.cbmemo + "'"
        }
        if (this.filters.cMemo != '') {
          filterStr += (filterStr !== "  " ? 'and ' : "where ") + "  cMemo=''" + this.filters.cMemo + "'"
        }
        console.log(filterStr, 12312312312)
        let sql = filterStr !== "  " ? " select * from wlzh_Dz_posDetail " + filterStr : "select * from wlzh_Dz_posDetail"

        let res = await this.SqlWork("select", sql)

        console.log(res.data)
        this.bodyData = res.data.dataDetail
        this.total_List = this.bodyData.length;
        // this.formLabelAlign2={vouchDate:'3333'}
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
            let res = await this.SqlWork("select", "insert into wlzh_asntemp(iposid,cvouchtype,cuser_id,cinvcode,dtime,bqty,dArriveDate) select id,cvouchtype,'" + this.SysInfo.cUserId + "'," + item.cinvcode + ",getdate()," + item.bqty + ",dArriveDate from po_podetails pd   where id=" + item.iposid + " select @@identity id")
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
