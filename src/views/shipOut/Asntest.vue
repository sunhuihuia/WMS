<template>
  <div style="margin: 10px;">
    <el-form
    :label-position="labelPosition2"
    label-width="auto"
    :model="formLabelAlign"
    style="max-width: 100%"
  >
    <el-row class="el-row">
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple" >
      <el-form-item label="ASN单号:">
      <el-input  disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col">
      <div class="grid-content ep-bg-purple-light"  > 
      <el-form-item label="供应商编码:">
      <el-input  disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple"  >
      <el-form-item label="供应商名称:">
      <el-input    disabled />
    </el-form-item>

    </div></el-col>
    
  </el-row>


  <el-row class="el-row">
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple" >
      <el-form-item label="单据日期:">
      <el-input   disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col">
      <div class="grid-content ep-bg-purple-light"  > 
      <el-form-item label="到货地址">
      <el-input   disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple"  >
      <el-form-item label="到货方式:">
      <el-input    disabled />
    </el-form-item>
    </div></el-col>    
  </el-row>

  <el-row class="el-row">
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple" >
      <el-form-item label="联系人:">
      <el-input    disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col">
      <div class="grid-content ep-bg-purple-light"  > 
      <el-form-item label="电话">
      <el-input v-model="formLabelAlign2.cvencode"  disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple"  >
      <el-form-item label="备注:">
      <el-input v-model="formLabelAlign2.cvenname2"    />
    </el-form-item>
    </div></el-col>    
  </el-row>

  <el-row class="el-row">
    <el-col :span="8" class="el-col"><div class="grid-content ep-bg-purple" >
      <el-form-item label="发货日期:">
      <el-input v-model="testObj.ddate"  disabled />
    </el-form-item>
  </div></el-col>
    <el-col :span="8" class="el-col">
      <div class="grid-content ep-bg-purple-light"  > 
      <el-form-item label="预计到货日期:">
      <el-input v-model="formLabelAlign2.cvencode"  disabled />
    </el-form-item>
  </div></el-col>       
  </el-row>
  <el-row class="el-row">
    <el-col :span="24" class="el-col">     
    
    <el-button @click="testSqlWork2"><el-icon><Printer style="width: 10em; height: 10em; margin-right: 0px"  /></el-icon><span>打印</span></el-button>
    <el-button @click="dialogVisible = true"><el-icon><Plus style="width: 10em; height: 10em; margin-right: 0px"  /></el-icon><span>增加</span></el-button>
    <el-button ><el-icon><Delete  style="width: 10em; height: 10em; margin-right: 0px"  /></el-icon><span>删行</span></el-button>
    <el-button @click="getTableData"><el-icon><RefreshLeft style="width: 10em; height: 10em; margin-right: 0px"  /></el-icon><span>放弃</span></el-button>
    <el-button @click="sayHello"><el-icon><Memo style="width: 10em; height: 10em; margin-right: 0px"  /></el-icon><span>保存</span></el-button>
     
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


</el-form>
<el-dialog v-model="dialogVisible" title="采购订单获取"  width="1000px" draggable>
  <!-- <AsnLoadPm   /> -->
    <span>It's a draggable Dialog</span>
    <div style="margin: 10px;">
    
      <el-row class="el-row">

      <el-col :span="7" class="el-col"><div class="grid-content ep-bg-purple" >
        <el-form-item label="采购订单号:">
          <el-input v-model="guolv.cpoid"    />
      </el-form-item>
      </div></el-col>
      <el-col :span="7" class="el-col">
        <div class="grid-content ep-bg-purple-light"  > 
        <el-form-item label="跟单号:">
        <el-input v-model="guolv.cinvcode"    />
      </el-form-item>
      </div></el-col>
      <el-col :span="10" class="el-col"><div class="grid-content ep-bg-purple"  >
         
      <el-form-item label="预计到货日"  >
		   				<el-date-picker v-model="guolv.darridate"  
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
        <el-input v-model="guolv.cpoid"    />
    </el-form-item>
    </div>
</el-col>
  <el-col :span="7" class="el-col">
      <div class="grid-content ep-bg-purple-light"  > 
      <el-form-item label="存货名称:">
      <el-input v-model="guolv.cinvcode" placeholder="模糊查询"   />
    </el-form-item>
    </div>
  </el-col>
  <el-col :span="10" class="el-col">
      <div class="grid-content ep-bg-purple-light"  > 
      <el-form-item label="规格型号:">
      <el-input v-model="guolv.cinvcode"  placeholder="模糊查询"   />
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

// import AsnLoadPm from './AsnLoadPm.vue';

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

onMounted(() => {
  console.log('onMounted')

  // 组件挂载完成后的操作
  //formLabelAlign2.ddate='222';

  formLabelAlign2.cvencode='001';
  // formLabelAlign2.cvenname='aaaa';


    testSqlWork();
});

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
      guolv:{cpoid:'',cinvcode:'',
      darridate:ref('')
    },
      
    };
  },
  // async mounted(){
  //   console.log('mounted')
  //   const res = await this.SqlWork("select","select null a,2 b" );
    
  // },
  mounted() {
    console.log('mounted')  },
    
  methods: {
    async  SqlWork(CommandType:string,SqlsStr:string):Promise<any> {
      try {
        console.log(SqlsStr);       
        const res = await axios.post(this.globalObject.ApiUrl,
                        {"CommandType":CommandType,"database":this.globalObject.database,
                        "SqlsStr":SqlsStr });
                        //console.log(res); 
//    this.tTable =res.data.dataDetail[0];
//   console.log(this.tTable);
return res
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
