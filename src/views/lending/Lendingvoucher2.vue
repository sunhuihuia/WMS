<template>
  <div style="margin: 10px;">
    <el-form
    :label-position="labelPosition2"
    label-width="auto"
    :model="headerData"
    style="max-width: 100%"
  >
    <el-row class="el-row">
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple" >
      <el-form-item label="ASN单号:">
      <el-input  v-model="headerData.ccode" disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col">
      <div class="grid-content ep-bg-purple-light"  > 
      <el-form-item label="供应商编码:">
      <el-input  v-model="headerData.cvencode" disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple"  >
      <el-form-item label="供应商名称:">
      <el-input   v-model="headerData.cvenname"  disabled />
    </el-form-item>

    </div></el-col>
    
  </el-row>
  <el-row class="el-row">
    <el-select
        v-model="ElSelectValue"           
        placeholder=""
        @visible-change="HandleSelectChange_ElSelect"
        :loading="ElSelectLoading"
        style="width: 240px"
      >
        <el-option
          v-for="item in ElSelectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
  </el-row>
  <el-row class="el-row">
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple" >
      <el-form-item label="单据日期:">
      <el-input   v-model="headerData.ddate" disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col">
      <div class="grid-content ep-bg-purple-light"  > 
      <el-form-item label="到货地址">
      <el-input v-model="headerData.address"  disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple"  >
      <el-form-item label="到货方式:">
      <el-input  v-model="headerData.dhfs"  disabled />
    </el-form-item>
    </div></el-col>    
  </el-row>

  <el-row class="el-row">
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple" >
      <el-form-item label="联系人:">
      <el-input   v-model="headerData.contacts"  disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col">
      <div class="grid-content ep-bg-purple-light"  > 
      <el-form-item label="电话">
      <el-input v-model="headerData.phone"  disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple"  >
      <el-form-item label="备注:">
      <el-input  v-model="headerData.cmemo"    />
    </el-form-item>
    </div></el-col>    
  </el-row>

  <el-row class="el-row">
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple" >
      <el-form-item label="发货日期:">
      <el-input  v-model="headerData.fahuori"  disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col">
      <div class="grid-content ep-bg-purple-light"  > 
      <el-form-item label="预计到货日期:">
      <el-input  v-model="headerData.yujidaohuori"  disabled />
    </el-form-item>
  </div></el-col>       
  </el-row>
  <el-row class="el-row">
    <el-col :span="24" class="el-col">     
    
    <el-button @click="testSqlWork2"><el-icon><Printer style="width: 10em; height: 10em; margin-right: 0px"  /></el-icon><span>打印</span></el-button>
    <el-button @click="dialogVisible = true"><el-icon><Plus style="width: 10em; height: 10em; margin-right: 0px"  /></el-icon><span>增加</span></el-button>
    <el-button @click="delRow"><el-icon><Delete  style="width: 10em; height: 10em; margin-right: 0px"  /></el-icon><span>删行</span></el-button>
    <el-button @click="getTableData"><el-icon><RefreshLeft style="width: 10em; height: 10em; margin-right: 0px"  /></el-icon><span>放弃</span></el-button>
    <el-button @click="save"><el-icon><Memo style="width: 10em; height: 10em; margin-right: 0px"  /></el-icon><span>保存</span></el-button>
    <el-button @click="test1"><el-icon><Memo style="width: 10em; height: 10em; margin-right: 0px"  /></el-icon><span>测试1</span></el-button>
    <el-button @click="test2"><el-icon><Memo style="width: 10em; height: 10em; margin-right: 0px"  /></el-icon><span>测试2</span></el-button> 
    </el-col>
  </el-row>
  <el-row class="el-row">

    <el-table
    :data="bodyData"
    style="width: 100%" @selection-change="bodyhandleSelectionChange"
    :row-class-name="tableRowClassName"
    ref="multipleTableRef"    
    border  
  >
<el-table-column prop="selected"  type="selection" width="55" :sortable="true"/>
<el-table-column prop="cinvcode" label="存货编码" width="180" :sortable="true" />
<el-table-column prop="cinvname" label="存货名称" width="180" />
<el-table-column prop="cinvstd" label="规格型号" width="180" />
<el-table-column prop="cinvm_unit" label="单位" width="60" />
<el-table-column prop="ipoquantity" label="订单数量"  width="120"/>
<el-table-column prop="iarrqty" label="累计到货数量"  width="120"/>
<el-table-column prop="wdh" label="未到货数量"  width="120"/>
<el-table-column prop="dfh" label="待发货数量"  width="120"/>
<el-table-column prop="bqty" label="本次发货数量"  width="120"/>
<el-table-column prop="dArriveDateStr" label="预到货日期"  width="120" :sortable="true"/>
<el-table-column prop="cordercode" label="采购订单号"  width="120" :sortable="true"/>
<el-table-column prop="cdefine28" label="跟单号"  width="120" :sortable="true"/>
<el-table-column prop="ctmemo" label="备注"  width="120"/>
  </el-table>
   
  </el-row>


</el-form>
<el-dialog v-model="dialogVisible" title="采购订单获取"  width="1000px" draggable>
  <!-- <AsnLoadPm   /> -->
    <span>It's a draggable Dialog</span>
    <div style="margin: 10px;">
    
      <el-row class="el-row">

      <el-col :span="7" class="el-col"><div class="grid-content ep-bg-purple" >
        <el-form-item label="采购订单号:">
          <el-input v-model="filters.cpoid"    />
      </el-form-item>
      </div></el-col>
      <el-col :span="7" class="el-col">
        <div class="grid-content ep-bg-purple-light"  > 
        <el-form-item label="跟单号:">
        <el-input v-model="filters.cinvcode"    />
      </el-form-item>
      </div></el-col>
      <el-col :span="10" class="el-col"><div class="grid-content ep-bg-purple"  >
         
      <el-form-item label="预计到货日"  >
		   				<el-date-picker v-model="filters.darridate"  
		   				                            type="daterange"
		   				                            unlink-panels
		   				                            range-separator="To"
		   				                            start-placeholder="开始日期"
		   				                            end-placeholder="结束日期"
		   				                            :shortcuts="shortcuts"
		   				                             />
		   			</el-form-item>
      </div></el-col>

    </el-row>
    
    <el-row class="el-row">

  <el-col :span="7" class="el-col"><div class="grid-content ep-bg-purple" >
      <el-form-item label="存货编码:">
        <el-input v-model="filters.cpoid"    />
    </el-form-item>
    </div>
</el-col>
  <el-col :span="7" class="el-col">
      <div class="grid-content ep-bg-purple-light"  > 
      <el-form-item label="存货名称:">
      <el-input v-model="filters.cinvcode" placeholder="模糊查询"   />
    </el-form-item>
    </div>
  </el-col>
  <el-col :span="10" class="el-col">
      <div class="grid-content ep-bg-purple-light"  > 
      <el-form-item label="规格型号:">
      <el-input v-model="filters.cinvcode"  placeholder="模糊查询"   />
    </el-form-item>
    </div>
  </el-col>
 </el-row>

 <el-row class="el-row">

<el-table
:data="tableData2"
style="width: 100%"
:row-class-name="tableRowClassName"
ref="multipleTableRef"    
border  
>
<el-table-column  prop="selected"  type="selection" width="55" />
<el-table-column prop="date" label="Date" width="180" :sortable="true" />
<el-table-column prop="name" label="Name" width="180" />
<el-table-column prop="address" label="Address" />
</el-table>

</el-row>
    </div>




    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

<script lang="ts" >
import { reactive, ref } from 'vue';
import type { FormProps } from 'element-plus'
import { onMounted, onUnmounted } from 'vue'; 
import axios from "axios"
import { getCurrentInstance } from 'vue';

import { ElMessageBox,ElMessage,ElLoading } from 'element-plus'
import {v4 as uuidv4} from 'uuid' 
import { threadId } from 'worker_threads';
import console from 'console';
// import AsnLoadPm from './AsnLoadPm.vue';


interface TableComponent {
  toggleRowSelection: (item: any, selected: boolean) => void;
}

export default {
  // components:{
  //   AsnLoadPm 
	// 	 },
  setup() {
const instance = getCurrentInstance();
const globalObject = instance?.appContext.config.globalProperties.$myGlobalObject


const labelPosition = ref<FormProps['labelPosition']>('right')
const labelPosition2=ref<FormProps['labelPosition']>('right')
const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
let formLabelAlign2:any =reactive({
  ddate: '111',
  cvencode: '22',
  cvenname: '3',
} )  
 
interface User {
  selected:boolean
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


const tableData: User[] = [
  {
    selected:false,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    selected:false,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    selected:false,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    selected:true,
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

async function testSqlWork() {
  try {
    const res = await axios.post("https://ycjdwocloud.gnway.org:7579/Api/values/Work",{"CommandType":"select","database":"master",
                    "SqlsStr":"select 'aaaa' cvencode,'cccc' cvenname,'dddd' ddate" });
    console.log(res)
    console.log(res.data.dataDetail[0] )
    // formLabelAlign2.cvenname=res.data.dataDetail[0].b;
    formLabelAlign2=res.data.dataDetail[0];
    // formLabelAlign2.cvenname2="33";
    console.log('formLabelAlign2',formLabelAlign2 );
  } catch (error) {
    console.error(error);
  }
}

async function SqlWork(CommandType:string,SqlsStr:string) {
  try {
    console.log(SqlsStr);
    const res = await axios.post(globalObject.ApiUrl,
                    {"CommandType":CommandType,"database":globalObject.database,
                    "SqlsStr":SqlsStr });
   
  } catch (error) {
    console.error(error);
  }
}

async function  testSqlWork3():Promise<any> {
  try {
    const res = await axios.post("https://ycjdwocloud.gnway.org:7579/Api/values/Work",{"CommandType":"select","database":"master",
                    "SqlsStr":"select 'aaaa' cvencode,'cccc' cvenname,'dddd' ddate" });
     return res
  } catch (error) {
    console.error(error);
  }
}

  function  test4()  {
  try {
    formLabelAlign2=reactive({ddate:'122222'})
    console.log(formLabelAlign2);
  } catch (error) {
    console.error(error);
  }
}



return { // 返回组件中可使用的属性和方法
  labelPosition,labelPosition2,formLabelAlign,formLabelAlign2,tableRowClassName,tableData,testSqlWork,  globalObject,testSqlWork3,test4
    };

},


data() {
    return {
      name: 'John', // Option API：使用 data 方法定义数据
      tTable:reactive({}),
      testObj:{ddate:''},
      tableData2:[],      
      dialogVisible:false,
      headerData:{ccode:'',cvencode:'',cvenname:'',ddate:'',address:'',dhfs:'',contacts:'',phone:'',cmemo:'',fahuori:'',yujidaohuori:''},
      bodyData:[],
      bodyDataCopypolist_asn:[],
      filters:{cpoid:'',cinvcode:'',cinvname:'',cinvstd:'',
      darridate:ref(''),
      cdefine28:''
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      multipleSelection:[],
      bodymultipleSelection:[],
      ElSelectLoading:false,
      ElSelectValue:'',
      ElSelectOptions:[{value:'',label:''}],
      SysInfo:
	   				{
	   				cUserId:'demo',
						cVenCode:'0080',
	   				database:'ufdata_002_2019',
						ApiUrl:'',
	   	},
    };
  },
  async mounted(){
    // console.log('mounted')
    // const database=sessionStorage.getItem('cDatabase')
    // if(database!=null)
    // this.SysInfo.database=database 
    // else 
    // this.SysInfo.database=this.globalObject.database

    // console.log('this.SysInfo.database',this.SysInfo.database)

    const loading = ElLoading.service({lock: true,text: 'Loading',background: 'rgba(0, 0, 0, 0.7)',})

     let res=await this.SqlWork("select","wlzh_ly_getAsntemp '"+ this.SysInfo.cUserId+"' ");
     this.bodyData=res.data.dataDetail;
     loading.close();
  },
  methods: {
    async  SqlWork(CommandType:string,SqlsStr:string):Promise<any> {
      try {
        console.log(SqlsStr);       
        const res = await axios.post(this.globalObject.ApiUrl,
                        {"CommandType":CommandType,"database":this.SysInfo.database,
                        "SqlsStr":SqlsStr });
                        //console.log(res); 
//    this.tTable =res.data.dataDetail[0];
//   console.log(this.tTable);
return res
      } catch (error) {
        console.error(error);
      }
  },

  async  loadData() {
  try {
    //let res = await this.testSqlWork4()
    const loading = ElLoading.service({lock: true,text: 'Loading',background: 'rgba(0, 0, 0, 0.7)',})

    var filterStr="  ";

    if(this.SysInfo.cVenCode!=''){
      filterStr+=" and t.cvencode=''"+this.SysInfo.cVenCode+"''";
    }
    if(this.filters.cpoid!=''){
      filterStr+=" and t.cordercode=''"+this.filters.cpoid+"''"
    }
    if(this.filters.cinvcode!=''){
      filterStr+=" and t.cinvcode = ''"+this.filters.cinvcode+"''"
    } 
    if(this.filters.cinvname!=''){
      filterStr+=" and t.cinvname like ''%"+this.filters.cinvname+"%''"
    }
    if(this.filters.cinvstd!=''){
      filterStr+=" and t.cinvstd like ''%"+this.filters.cinvstd+"%''"
    }
    if(this.filters.darridate.length>0){
      filterStr+=" and dArriveDate between ''"+this.filters.darridate[0]+"'' and ''"+this.filters.darridate[1]+"''"
    }
    if(this.filters.cdefine28!=''){
      filterStr+=" and cdefine28=''"+this.filters.cdefine28+"''"
    }
    //console.log (filterStr)


    let res=await this.SqlWork("select","wlzh_ly_getCopypolist_asn '"+filterStr+"','"+ this.SysInfo.cUserId +"' ")
    
    this.bodyDataCopypolist_asn=res.data.dataDetail
    this.total=this.bodyDataCopypolist_asn.length;
    // this.formLabelAlign2={ddate:'3333'}
    // console.log('formLabelAlign2  xxxx',this.formLabelAlign2 );
    loading.close()
  } catch (error) {
    console.error(error);
  }
},
handleSizeChange(val:any){
                //每次切换每页条数要把当前页设置为第一页
                this.pageNum=1;
                this.pageSize=val;
               
                 //this.fiterBodyData();
            },
handleCurrentChange(val:any){
                this.pageNum=val;
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

 async HandleSelectChange_ElSelect(){
  this.ElSelectLoading = true
let res=await this.SqlWork("select","select distinct b.cAcc_Id value, '['+b.cAcc_Id+']'+b.cAcc_Name label from  UFSystem..UA_Account b")
this.ElSelectLoading = false
this.ElSelectOptions = res.data.dataDetail;

      } ,



fiterBodyData() : any{
  
  var b=  this.bodyDataCopypolist_asn.filter((data:any) =>data.selected==false)
  
  var r= b .slice((this.pageNum-1)*this.pageSize,this.pageNum*this.pageSize)

  return r
  },
  // filterxjTableData(): any{
	// 		return this.bodyDataCopypolist_asn.filter((data) =>
	// 		      data.statue==statue
	// 		  )
			   
	// },

  async confirm() {
    try {
      const loading = ElLoading.service({lock: true,text: 'Loading',background: 'rgba(0, 0, 0, 0.7)',})

      this.multipleSelection.forEach(async (item:any) => {
        var newitem=JSON.parse(JSON.stringify(item))
        var index=this.bodyData.findIndex((data:any) =>
          data.iposid == item.iposid
        )
        if(index==-1){
          let res=await this.SqlWork("select","insert into wlzh_asntemp(iposid,cinvcode,cuser_id,cvencode,dtime,bqty,dArriveDate) select id,cinvcode,'"+this.SysInfo.cUserId+"',"+item.cvencode+",getdate(),"+ item.bqty +",dArriveDate from po_podetails pd   where id="+item.iposid+" select @@identity id")
          var id=res.data.dataDetail[0].id
          newitem.id=id
          this.bodyData.push(newitem as never)

        }
       
        var item2:any=this.bodyDataCopypolist_asn.find((data:any) =>
          data.iposid == item.iposid
        )
        item2.selected=true 
      })
      this.dialogVisible = false
      loading.close();
    } catch (error) {
    console.error(error);
   }
  },
  
  async delRow() {
    try {
      const loading = ElLoading.service({lock: true,text: 'Loading',background: 'rgba(0, 0, 0, 0.7)',})

      this.bodymultipleSelection.forEach(async (item:any) => {
        var newitem=JSON.parse(JSON.stringify(item))
        var index=this.bodyData.findIndex((data:any) =>
          data.iposid == item.iposid
        )
        if(index>-1){
          await this.SqlWork("select","delete from wlzh_asntemp where iposid ="+newitem.iposid+"  ")
          this.bodyData.splice(index, 1)
        }
       
        var item2:any=this.bodyDataCopypolist_asn.find((data:any) =>
          data.iposid == item.iposid
        )
        
        console.log(item2)
        item2.selected=false 
        
        console.log(item2)
      })
      loading.close()
    } catch (error) {
    console.error(error);
   }
  },
  save(){
    let that=this
    ElMessageBox.confirm(`确定保存?`)
	    .then(() => {
		 	   that.wlzh_ly_saveasn()
		    
	    })
	    .catch(() => {
	      // catch error
	    })
  },
  async wlzh_ly_saveasn() {
    try {
      const loading = ElLoading.service({lock: true,text: 'Loading',background: 'rgba(0, 0, 0, 0.7)',})

      if(this.bodyData.length==0){
        this.ElMessage({
          message: '没有可保存的数据',
          type: 'warning'
        });
      }
      if(this.bodyData.length>0){
        var GID = uuidv4();
        await this.SqlWork("update","update wlzh_asntemp set GID='"+GID+"' where  cuser_id='"+this.SysInfo.cUserId+"' ")
        let res=await this.SqlWork("select","wlzh_ly_saveasn '"+GID+"' ")
        if (res.data.dataDetail[0].result=='1'){
          this.ElMessage({
          message: '保存成功',
          type: 'success'
        });
        this.bodyData=[]
        }else{
          this.ElMessage({
          message: res.data.dataDetail[0].cmsg,
          type: 'warning'
        });
        }
        
      }
           
      loading.close()
    } catch (error) {
    console.error(error);
   }
  },
  
async  testSqlWork2() {
  try {
    //let res = await this.testSqlWork4()
    let res=await this.SqlWork("select","select 'aaaa' cvencode,'cccc' cvenname,'dddd' ddate")
     console.log(res)
     console.log(res.data.dataDetail[0] )
    // // formLabelAlign2.cvenname=res.data.dataDetail[0].b;
     //this.formLabelAlign2=res.data.dataDetail[0];
    // formLabelAlign2.cvenname2="33";
    
    this.testObj=res.data.dataDetail[0]
    // this.formLabelAlign2={ddate:'3333'}
    // console.log('formLabelAlign2  xxxx',this.formLabelAlign2 );
  } catch (error) {
    console.error(error);
  }
},
async  getTableData() {
  try {
    //let res = await this.testSqlWork4()
    let res=await this.SqlWork("select","select top 15 convert(varchar(50),rd.ddate,23) date,rd.ccode name,rds.cinvcode,rds.iquantity address  from rdrecord01 rd join rdrecords01 rds on rd.id=rds.id where rd.ddate>='2024-01-01'")
    
    this.tableData2=res.data.dataDetail
    let newrow=JSON.parse(JSON.stringify(res.data.dataDetail[0]))
    this.tableData2.push(newrow as never);
    // this.formLabelAlign2={ddate:'3333'}
    // console.log('formLabelAlign2  xxxx',this.formLabelAlign2 );
  } catch (error) {
    console.error(error);
  }
},

async   testSqlWork4():Promise<any> {
  try {
    const res = await axios.post("https://ycjdwocloud.gnway.org:7579/Api/values/Work",{"CommandType":"select","database":"master",
                    "SqlsStr":"select 'aaaa' cvencode,'cccc' cvenname,'dddd' ddate" });
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
      console.log('Hello, ' +this.name); // Option API：使用 methods 定义方法
    },

    sayHello2() {
      this.testSqlWork; // Option API：使用 methods 定义方法
      
      
    },
    // 定义 Last week 的函数
  getLastWeek() {
		      const end = new Date();
		      const start = new Date();
		      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		      return [start, end];
		    },
		
		    // 定义 Last month 的函数
		    getLastMonth() {
		      const end = new Date();
		      const start = new Date();
		      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		      return [start, end];
		    },
		
		    // 定义 Last 3 months 的函数
		    getLast3Months() {
		      const end = new Date();
		      const start = new Date();
		      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		      return [start, end];
		    },
			getThisMonth(){
				const today = new Date();
				  const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
				 return[firstDayOfThisMonth, today];
			},
  shortcuts() {
		      return [
		        {
		          text: '前一周',
		          value: this.getLastWeek
		        },
		        {
		          text: '前一月',
		          value: this.getLastMonth
		        },
		        {
		          text: '前三个月',
		          value: this.getLast3Months
		        },
				{
		          text: '本月',
		          value: this.getThisMonth
		        },
				
				
		      ];
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
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

</style>
